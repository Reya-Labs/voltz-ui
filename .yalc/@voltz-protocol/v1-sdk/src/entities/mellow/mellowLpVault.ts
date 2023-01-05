/* eslint-disable no-console */

import {
  Signer,
  providers,
  ethers,
  BigNumberish,
  BigNumber,
  ContractReceipt,
  Contract,
} from 'ethers';
import { isUndefined } from 'lodash';
import { toBn } from 'evm-bn';

import { getTokenInfo } from '../../services/getTokenInfo';
import { getGasBuffer, MaxUint256Bn, TresholdApprovalBn } from '../../constants';

import { abi as Erc20RootVaultABI } from '../../ABIs/Erc20RootVault.json';
import { abi as Erc20RootVaultGovernanceABI } from '../../ABIs/Erc20RootVaultGovernance.json';
import { abi as IERC20MinimalABI } from '../../ABIs/IERC20Minimal.json';
import { abi as MellowDepositWrapperABI } from '../../ABIs/MellowDepositWrapper.json';
import { sentryTracker } from '../../utils/sentry';
import { MellowProductMetadata } from './config/types';
import { closeOrPastMaturity } from './config';

export type MellowLpVaultArgs = {
  id: string;
  ethWrapperAddress: string;
  erc20RootVaultAddress: string;
  provider: providers.Provider;
  metadata: MellowProductMetadata & {
    underlyingPools: string[];
  };
};

class MellowLpVault {
  public readonly id: string;
  public readonly provider: providers.Provider;
  metadata: MellowProductMetadata & {
    underlyingPools: string[];
  };

  public readonly ethWrapperAddress: string;
  public readonly erc20RootVaultAddress: string;

  public readOnlyContracts?: {
    token: Contract;
    erc20RootVault: Contract[];
    erc20RootVaultGovernance: Contract[];
  };

  public writeContracts?: {
    token: Contract;
    erc20RootVault: Contract[];
    ethWrapper: Contract;
  };

  public signer?: Signer;

  public vaultCumulative?: number;
  public vaultCap?: number;

  public userIndividualCommittedDeposits: number[] = [];
  public userIndividualPendingDeposit: number[] = [];

  public userWalletBalance?: number;

  public userAddress?: string;

  public vaultInitialized = false;
  public userInitialized = false;

  public vaultsCount = 1;

  public constructor({
    id,
    ethWrapperAddress,
    erc20RootVaultAddress,
    provider,
    metadata,
  }: MellowLpVaultArgs) {
    this.id = id;
    this.ethWrapperAddress = ethWrapperAddress;
    this.erc20RootVaultAddress = erc20RootVaultAddress;
    this.provider = provider;
    this.metadata = metadata;

    if (!(this.metadata.vaults.length === 1)) {
      throw Error('This should be used for only one vault');
    }

    this.userIndividualCommittedDeposits = [0];
    this.userIndividualPendingDeposit = [0];
  }

  descale = (amount: BigNumberish, decimals: number): number => {
    return Number(ethers.utils.formatUnits(amount, decimals));
  };

  scale = (amount: number): BigNumber => {
    return ethers.utils.parseUnits(amount.toString(), this.tokenDecimals);
  };

  // NEXT: to offload this to subgraph
  vaultInit = async (): Promise<void> => {
    if (this.vaultInitialized) {
      return;
    }

    if (isUndefined(this.provider)) {
      return;
    }

    const erc20RootVaultContract = new ethers.Contract(
      this.erc20RootVaultAddress,
      Erc20RootVaultABI,
      this.provider,
    );

    const tokenAddress = (await erc20RootVaultContract.vaultTokens())[0];
    const tokenContract = new Contract(tokenAddress, IERC20MinimalABI, this.provider);

    const erc20RootVaultGovernanceAddress = await erc20RootVaultContract.vaultGovernance();
    const erc20RootVaultGovernanceContract = new ethers.Contract(
      erc20RootVaultGovernanceAddress,
      Erc20RootVaultGovernanceABI,
      this.provider,
    );

    this.readOnlyContracts = {
      token: tokenContract,
      erc20RootVault: [erc20RootVaultContract],
      erc20RootVaultGovernance: [erc20RootVaultGovernanceContract],
    };

    await this.refreshVaultCumulative();

    this.vaultInitialized = true;
  };

  userInit = async (signer: Signer): Promise<void> => {
    this.signer = signer;

    if (this.userInitialized) {
      return;
    }

    if (!this.vaultInitialized) {
      return;
    }

    if (isUndefined(this.readOnlyContracts)) {
      throw new Error('Uninitialized contracts.');
    }

    this.userAddress = await this.signer.getAddress();

    this.writeContracts = {
      token: new ethers.Contract(
        this.readOnlyContracts.token.address,
        IERC20MinimalABI,
        this.signer,
      ),
      erc20RootVault: this.readOnlyContracts.erc20RootVault.map(
        (contract) => new ethers.Contract(contract.address, Erc20RootVaultABI, this.signer),
      ),
      ethWrapper: new ethers.Contract(this.ethWrapperAddress, MellowDepositWrapperABI, this.signer),
    };

    await this.refreshUserDeposit();
    await this.refreshWalletBalance();

    this.userInitialized = true;
  };

  public get tokenName(): string {
    if (isUndefined(this.readOnlyContracts)) {
      return '-';
    }

    return getTokenInfo(this.readOnlyContracts.token.address).name;
  }

  public get isETH(): boolean {
    return this.tokenName === 'ETH';
  }

  public get tokenDecimals(): number {
    if (isUndefined(this.readOnlyContracts)) {
      return 18;
    }

    return getTokenInfo(this.readOnlyContracts.token.address).decimals;
  }

  public get expired(): boolean {
    const latestMaturity = Math.max(...this.metadata.vaults.map((v) => v.maturityTimestampMS));
    return closeOrPastMaturity(latestMaturity);
  }

  public get depositable(): boolean {
    return !this.metadata.deprecated && !this.expired;
  }

  public withdrawable(): boolean {
    return (
      this.metadata.vaults[0].withdrawable &&
      Date.now().valueOf() > this.metadata.vaults[0].maturityTimestampMS
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public rolloverable(): boolean {
    return false;
  }

  public get userComittedDeposit(): number {
    return this.userIndividualCommittedDeposits.reduce((total, deposit) => total + deposit, 0);
  }

  public get userPendingDeposit(): number {
    return this.userIndividualPendingDeposit.reduce((total, deposit) => total + deposit, 0);
  }

  public get userIndividualDeposits(): number[] {
    if (
      !(this.userIndividualPendingDeposit.length === this.userIndividualCommittedDeposits.length)
    ) {
      return [];
    }

    return this.userIndividualPendingDeposit.map(
      (pendingDeposit, index) => pendingDeposit + this.userIndividualCommittedDeposits[index],
    );
  }

  public get userDeposit(): number {
    return this.userIndividualDeposits.reduce((total, deposit) => total + deposit, 0);
  }

  refreshVaultCumulative = async (): Promise<void> => {
    if (isUndefined(this.readOnlyContracts)) {
      this.vaultCumulative = 0;
      this.vaultCap = 0;
      return;
    }

    const totalLpTokens = await this.readOnlyContracts.erc20RootVault[0].totalSupply();

    if (totalLpTokens.eq(0)) {
      this.vaultCumulative = 0;
      this.vaultCap = 0;
      return;
    }

    const tvl = await this.readOnlyContracts.erc20RootVault[0].tvl();

    const nft = await this.readOnlyContracts.erc20RootVault[0].nft();
    const strategyParams = await this.readOnlyContracts.erc20RootVaultGovernance[0].strategyParams(
      nft,
    );

    this.vaultCumulative = this.descale(tvl.minTokenAmounts[0], this.tokenDecimals);
    this.vaultCap = this.descale(
      totalLpTokens.mul(toBn('1', 18)).div(strategyParams.tokenLimit),
      16,
    );
  };

  refreshUserDeposit = async (): Promise<void> => {
    this.userIndividualCommittedDeposits = [0];
    if (
      isUndefined(this.userAddress) ||
      isUndefined(this.readOnlyContracts) ||
      isUndefined(this.tokenDecimals)
    ) {
      return;
    }

    const lpTokens = await this.readOnlyContracts.erc20RootVault[0].balanceOf(this.userAddress);
    const totalLpTokens = await this.readOnlyContracts.erc20RootVault[0].totalSupply();

    const tvl = await this.readOnlyContracts.erc20RootVault[0].tvl();

    if (totalLpTokens.gt(0)) {
      const userFunds = lpTokens.mul(tvl[0][0]).div(totalLpTokens);
      this.userIndividualCommittedDeposits[0] = this.descale(userFunds, this.tokenDecimals);
    } else {
      this.userIndividualCommittedDeposits[0] = 0;
    }
  };

  refreshWalletBalance = async (): Promise<void> => {
    if (
      isUndefined(this.userAddress) ||
      isUndefined(this.readOnlyContracts) ||
      isUndefined(this.provider) ||
      isUndefined(this.tokenDecimals)
    ) {
      this.userWalletBalance = 0;
      return;
    }

    const walletBalance = this.isETH
      ? await this.provider.getBalance(this.userAddress)
      : await this.readOnlyContracts.token.balanceOf(this.userAddress);

    this.userWalletBalance = this.descale(walletBalance, this.tokenDecimals);
  };

  isTokenApproved = async (): Promise<boolean> => {
    if (this.isETH) {
      return true;
    }

    if (
      isUndefined(this.userAddress) ||
      isUndefined(this.readOnlyContracts) ||
      isUndefined(this.tokenDecimals)
    ) {
      return false;
    }

    const tokenApproval = await this.readOnlyContracts.token.allowance(
      this.userAddress,
      this.readOnlyContracts.erc20RootVault[0].address,
    );

    return tokenApproval.gte(TresholdApprovalBn);
  };

  approveToken = async (): Promise<ContractReceipt> => {
    if (isUndefined(this.readOnlyContracts) || isUndefined(this.writeContracts)) {
      throw new Error('Uninitialized contracts.');
    }

    const gasLimit = await this.writeContracts.token.estimateGas.approve(
      this.readOnlyContracts.erc20RootVault[0].address,
      MaxUint256Bn,
    );

    const tx = await this.writeContracts.token.approve(
      this.readOnlyContracts.erc20RootVault[0].address,
      MaxUint256Bn,
      {
        gasLimit: getGasBuffer(gasLimit),
      },
    );

    try {
      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      console.error('Unsuccessful approval confirmation.', error);
      sentryTracker.captureException(error);
      sentryTracker.captureMessage('Unsuccessful approval confirmation.');
      throw new Error('Unsuccessful approval confirmation.');
    }
  };

  deposit = async (amount: number): Promise<ContractReceipt> => {
    if (
      isUndefined(this.readOnlyContracts) ||
      isUndefined(this.writeContracts) ||
      isUndefined(this.userAddress)
    ) {
      throw new Error('Uninitialized contracts.');
    }

    const scaledAmount = this.scale(amount);
    const minLPTokens = BigNumber.from(0);

    const tempOverrides: { value?: BigNumber; gasLimit?: BigNumber } = {};

    if (this.isETH) {
      tempOverrides.value = scaledAmount;
    }

    try {
      if (this.isETH) {
        this.writeContracts.ethWrapper.callStatic.deposit(
          this.readOnlyContracts.erc20RootVault[0].address,
          minLPTokens,
          [],
          tempOverrides,
        );
      } else {
        await this.writeContracts.erc20RootVault[0].callStatic.deposit(
          [scaledAmount],
          minLPTokens,
          [],
        );
      }
    } catch (error) {
      console.error('Unsuccessful deposit simulation.', error);
      sentryTracker.captureException(error);
      sentryTracker.captureMessage('Unsuccessful deposit simulation.');
      throw new Error('Unsuccessful deposit simulation.');
    }

    if (this.isETH) {
      const gasLimit = await this.writeContracts.ethWrapper.estimateGas.deposit(
        this.readOnlyContracts.erc20RootVault[0].address,
        minLPTokens,
        [],
        tempOverrides,
      );
      tempOverrides.gasLimit = getGasBuffer(gasLimit);
    } else {
      const gasLimit = await this.writeContracts.erc20RootVault[0].estimateGas.deposit(
        [scaledAmount],
        minLPTokens,
        [],
      );
      tempOverrides.gasLimit = getGasBuffer(gasLimit);
    }

    const tx = this.isETH
      ? await this.writeContracts.ethWrapper.deposit(
          this.readOnlyContracts.erc20RootVault[0].address,
          minLPTokens,
          [],
          tempOverrides,
        )
      : await this.writeContracts.erc20RootVault[0].deposit(
          [scaledAmount],
          minLPTokens,
          [],
          tempOverrides,
        );

    try {
      const receipt = await tx.wait();

      try {
        await this.refreshWalletBalance();
      } catch (error) {
        sentryTracker.captureException(error);
        sentryTracker.captureMessage('Wallet user balance failed to refresh after deposit');
        console.error('Wallet user balance failed to refresh after deposit.', error);
      }

      try {
        await this.refreshUserDeposit();
      } catch (error) {
        sentryTracker.captureException(error);
        sentryTracker.captureMessage('User deposit failed to refresh after deposit');
        console.error('User deposit failed to refresh after deposit.', error);
      }

      try {
        await this.refreshVaultCumulative();
      } catch (error) {
        sentryTracker.captureException(error);
        sentryTracker.captureMessage('Vault accumulative failed to refresh after deposit');
        console.error('Vault accumulative failed to refresh after deposit.', error);
      }

      return receipt;
    } catch (err) {
      console.error('Unsucessful deposit confirmation.', err);
      sentryTracker.captureException(err);
      sentryTracker.captureMessage('Unsucessful deposit confirmation.');
      throw new Error('Unsucessful deposit confirmation.');
    }
  };

  withdraw = async (): Promise<ContractReceipt> => {
    if (
      isUndefined(this.readOnlyContracts) ||
      isUndefined(this.writeContracts) ||
      isUndefined(this.userAddress)
    ) {
      throw new Error('Uninitialized contracts.');
    }

    // Get the balance of LP tokens
    const lpTokens = await this.readOnlyContracts.erc20RootVault[0].balanceOf(this.userAddress);

    // Get the number of subvaults to input the correct vault options
    const subvaultsCount: number = (await this.readOnlyContracts.erc20RootVault[0].subvaultNfts())
      .length;

    // Default arguments for withdraw
    const minTokenAmounts = BigNumber.from(0);
    const vaultsOptions = new Array(subvaultsCount).fill(0x0);
    console.log(
      `Calling withdraw(${this.userAddress}, ${lpTokens.toString()}, ${[
        minTokenAmounts.toString(),
      ]}, ${vaultsOptions})`,
    );

    // Simulate the withdrawal
    try {
      await this.writeContracts.erc20RootVault[0].callStatic.withdraw(
        this.userAddress,
        lpTokens,
        [minTokenAmounts],
        vaultsOptions,
      );
    } catch (error) {
      console.error('Error in withdrawal simulation:', error);
      sentryTracker.captureException(error);
      sentryTracker.captureMessage('Unsuccessful withdrawal simulation.');
      throw new Error('Unsuccessful withdrawal simulation.');
    }

    // Estimate the gas for this transaction
    const gasLimit = await this.writeContracts.erc20RootVault[0].estimateGas.withdraw(
      this.userAddress,
      lpTokens,
      [minTokenAmounts],
      vaultsOptions,
    );

    // Send the transaction
    const tx = await this.writeContracts.erc20RootVault[0].withdraw(
      this.userAddress,
      lpTokens,
      [minTokenAmounts],
      vaultsOptions,
      {
        gasLimit: getGasBuffer(gasLimit),
      },
    );

    // Wait for the confirmation and update the state post-operation
    try {
      const receipt = await tx.wait();

      try {
        await this.refreshWalletBalance();
      } catch (err) {
        sentryTracker.captureException(err);
        sentryTracker.captureMessage('Wallet user balance failed to refresh after withdrawal');
        console.error('Wallet user balance failed to refresh after withdrawal.', err);
      }

      try {
        await this.refreshUserDeposit();
      } catch (err) {
        sentryTracker.captureException(err);
        sentryTracker.captureMessage('User deposit failed to refresh after withdrawal');
        console.error('User deposit failed to refresh after withdrawal.', err);
      }

      return receipt;
    } catch (err) {
      sentryTracker.captureException(err);
      sentryTracker.captureMessage('Unsucessful withdrawal confirmation.');
      throw new Error('Unsucessful withdraw confirmation.');
    }
  };

  rollover = async (): Promise<ContractReceipt> => {
    throw new Error('This is not supported.');
  };

  registerForAutoRollover = async (): Promise<ContractReceipt> => {
    throw new Error('This is not supported');
  };

  gasRegisterForAutoRollover = async (): Promise<number> => {
    return 0;
  };

  getAutorolloverRegistrationFlag = async (): Promise<boolean> => {
    return false;
  };
}

export default MellowLpVault;
