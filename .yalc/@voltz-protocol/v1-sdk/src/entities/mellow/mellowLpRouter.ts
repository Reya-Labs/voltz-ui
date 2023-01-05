/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
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
import { abi as MellowMultiVaultRouterABI } from '../../ABIs/MellowMultiVaultRouterABI.json';
import { sentryTracker } from '../../utils/sentry';
import { closeOrPastMaturity, MellowProductMetadata } from './config';
import { convertGasUnitsToUSD } from '../../utils/mellowHelpers/convertGasUnitsToUSD';

export type MellowLpRouterArgs = {
  id: string;
  mellowRouterAddress: string; // live in env variable per router contract
  provider: providers.Provider;
  metadata: MellowProductMetadata & {
    underlyingPools: string[];
  };
};

type BatchedDeposit = {
  author: string;
  amount: BigNumber;
};

class MellowLpRouter {
  public readonly id: string;
  public readonly mellowRouterAddress: string;
  public readonly provider: providers.Provider;
  metadata: MellowProductMetadata & {
    underlyingPools: string[];
  };

  public readOnlyContracts?: {
    token: Contract;
    mellowRouterContract: Contract;
    erc20RootVault: Contract[];
    erc20RootVaultGovernance: Contract[];
  };

  public writeContracts?: {
    token: Contract;
    erc20RootVault: Contract[];
    mellowRouter: Contract;
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

  public vaultsCount = 0;

  public constructor({ mellowRouterAddress, id, provider, metadata }: MellowLpRouterArgs) {
    this.mellowRouterAddress = mellowRouterAddress;
    this.id = id;
    this.provider = provider;
    this.metadata = metadata;
  }

  descale = (amount: BigNumberish, decimals: number): number => {
    return Number(ethers.utils.formatUnits(amount, decimals));
  };

  scale = (amount: number): BigNumber => {
    return ethers.utils.parseUnits(amount.toString(), this.tokenDecimals);
  };

  validateWeights = (weights: number[]): boolean => {
    if (!weights.every((value) => Number.isInteger(value))) {
      // All values of default weights must be integer
      return false;
    }

    if (weights.length !== this.vaultsCount) {
      // Lengths of vault indices and default weights array do not match
      return false;
    }

    return true;
  };

  // NEXT: to offload this to subgraph
  vaultInit = async (): Promise<void> => {
    if (this.vaultInitialized) {
      return;
    }

    if (isUndefined(this.provider)) {
      return;
    }

    // Instantiate the mellowRouterContract
    const mellowRouterContract = new ethers.Contract(
      this.mellowRouterAddress,
      MellowMultiVaultRouterABI,
      this.provider,
    );

    // Get the token from mellowRouter.token() here
    const tokenAddress = await mellowRouterContract.token();
    const tokenContract = new Contract(tokenAddress, IERC20MinimalABI, this.provider);

    // erc20rootvault addresses
    const ERC20RootVaultAddresses: string[] = await mellowRouterContract.getVaults();
    this.vaultsCount = ERC20RootVaultAddresses.length;

    // Map the addresses so that each of them is instantiated into a contract
    const erc20RootVaultContracts = ERC20RootVaultAddresses.map(
      (address: string) => new ethers.Contract(address, Erc20RootVaultABI, this.provider),
    );

    // Instantiate an empty array of addresses
    const erc20RootVaultGovernanceAddresses = [];
    for (const erc20RootVaultContract of erc20RootVaultContracts) {
      erc20RootVaultGovernanceAddresses.push(await erc20RootVaultContract.vaultGovernance());
    }

    // ERC20RootVaultGovernanceContracts stores every governance contract associated with this router
    const erc20RootVaultGovernanceContracts = erc20RootVaultGovernanceAddresses.map(
      (address: string) => new ethers.Contract(address, Erc20RootVaultGovernanceABI, this.provider),
    );

    this.readOnlyContracts = {
      token: tokenContract,
      erc20RootVault: erc20RootVaultContracts,
      erc20RootVaultGovernance: erc20RootVaultGovernanceContracts,
      mellowRouterContract,
    };

    await this.refreshVaultCumulative();

    this.userIndividualCommittedDeposits = new Array(this.vaultsCount).fill(0x0);
    this.userIndividualPendingDeposit = new Array(this.vaultsCount).fill(0x0);

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
      token: new Contract(this.readOnlyContracts.token.address, IERC20MinimalABI, this.signer),
      erc20RootVault: this.readOnlyContracts.erc20RootVault.map(
        (contract) => new ethers.Contract(contract.address, Erc20RootVaultABI, this.signer),
      ),
      mellowRouter: new ethers.Contract(
        this.mellowRouterAddress,
        MellowMultiVaultRouterABI,
        this.signer,
      ),
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

  public withdrawable(vaultIndex: number): boolean {
    return (
      this.metadata.vaults[vaultIndex].withdrawable &&
      Date.now().valueOf() > this.metadata.vaults[vaultIndex].maturityTimestampMS
    );
  }

  public rolloverable(vaultIndex: number): boolean {
    return this.withdrawable(vaultIndex);
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
    this.vaultCumulative = 0;
    this.vaultCap = 0;

    if (isUndefined(this.readOnlyContracts)) {
      return;
    }

    for (const erc20RootVaultContract of this.readOnlyContracts.erc20RootVault) {
      const totalLpTokens = await erc20RootVaultContract.totalSupply();
      const tvl = await erc20RootVaultContract.tvl();

      const nft = await erc20RootVaultContract.nft();

      for (const erc20RootVaultGovernanceContract of this.readOnlyContracts
        .erc20RootVaultGovernance) {
        const strategyParams = await erc20RootVaultGovernanceContract.strategyParams(nft);

        const vaultCumulative = this.descale(tvl.minTokenAmounts[0], this.tokenDecimals);
        const vaultCap = this.descale(
          totalLpTokens.mul(toBn('1', 18)).div(strategyParams.tokenLimit),
          16,
        );

        this.vaultCumulative += vaultCumulative;
        this.vaultCap += vaultCap;
      }
    }
  };

  refreshUserComittedDeposit = async (): Promise<void> => {
    this.userIndividualCommittedDeposits = this.userIndividualCommittedDeposits.map(() => 0);

    if (
      isUndefined(this.userAddress) ||
      isUndefined(this.readOnlyContracts) ||
      isUndefined(this.tokenDecimals)
    ) {
      return;
    }

    const lpTokensBalances: BigNumber[] =
      await this.readOnlyContracts.mellowRouterContract.getLPTokenBalances(this.userAddress);

    for (let i = 0; i < this.readOnlyContracts.erc20RootVault.length; i += 1) {
      const erc20RootVaultContract = this.readOnlyContracts.erc20RootVault[i];
      const lpTokensBalance = lpTokensBalances[i];

      const totalLpTokens = await erc20RootVaultContract.totalSupply();

      const tvl = await erc20RootVaultContract.tvl();

      if (totalLpTokens.gt(0)) {
        const userFunds = lpTokensBalance.mul(tvl[0][0]).div(totalLpTokens);
        this.userIndividualCommittedDeposits[i] = this.descale(userFunds, this.tokenDecimals);
      }
    }
  };

  refreshUserPendingDeposit = async (): Promise<void> => {
    this.userIndividualPendingDeposit = this.userIndividualPendingDeposit.map(() => 0);

    if (
      isUndefined(this.userAddress) ||
      isUndefined(this.readOnlyContracts) ||
      isUndefined(this.tokenDecimals)
    ) {
      return;
    }

    for (let i = 0; i < this.vaultsCount; i += 1) {
      const batchedDeposits: BatchedDeposit[] =
        await this.readOnlyContracts.mellowRouterContract.getBatchedDeposits(i);

      const userBatchedDeposits: BatchedDeposit[] = batchedDeposits.filter(
        (batchedDeposit) => batchedDeposit.author.toLowerCase() === this.userAddress?.toLowerCase(),
      );

      const userPendingFunds = userBatchedDeposits.reduce(
        (sum, batchedDeposit) => sum.add(batchedDeposit.amount),
        BigNumber.from(0),
      );

      const userPendingDeposit = this.descale(userPendingFunds, this.tokenDecimals);
      this.userIndividualPendingDeposit[i] += userPendingDeposit;
    }
  };

  refreshUserDeposit = async (): Promise<void> => {
    await this.refreshUserComittedDeposit();
    await this.refreshUserPendingDeposit();
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
      this.writeContracts?.mellowRouter.address,
    );

    return tokenApproval.gte(TresholdApprovalBn);
  };

  approveToken = async (): Promise<ContractReceipt> => {
    if (isUndefined(this.readOnlyContracts) || isUndefined(this.writeContracts)) {
      throw new Error('Uninitialized contracts.');
    }

    const gasLimit = await this.writeContracts.token.estimateGas.approve(
      this.writeContracts.mellowRouter.address,
      MaxUint256Bn,
    );

    const tx = await this.writeContracts.token.approve(
      this.writeContracts.mellowRouter.address,
      MaxUint256Bn,
      {
        gasLimit: getGasBuffer(gasLimit),
      },
    );

    try {
      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      sentryTracker.captureException(error);
      sentryTracker.captureMessage('Unsuccessful approval confirmation.');
      throw new Error('Unsuccessful approval confirmation.');
    }
  };

  deposit = async (
    amount: number,
    _weights: number[],
    registration?: boolean | undefined,
  ): Promise<ContractReceipt> => {
    if (
      isUndefined(this.readOnlyContracts) ||
      isUndefined(this.writeContracts) ||
      isUndefined(this.userAddress)
    ) {
      throw new Error('Uninitialized contracts.');
    }

    const weights = _weights;
    while (weights.length < this.vaultsCount) {
      weights.push(0);
    }

    if (!this.validateWeights(weights)) {
      throw new Error('Weights are invalid');
    }

    const scaledAmount = this.scale(amount);
    const tempOverrides: { value?: BigNumber; gasLimit?: BigNumber } = {};

    if (this.isETH) {
      tempOverrides.value = scaledAmount;
    }

    if (registration !== undefined) {
      try {
        if (this.isETH) {
          this.writeContracts.mellowRouter.callStatic.depositEthAndRegisterForAutoRollover(
            weights,
            registration,
            tempOverrides,
          );
        } else {
          await this.writeContracts.mellowRouter.callStatic.depositErc20AndRegisterForAutoRollover(
            scaledAmount,
            weights,
            registration,
          );
        }
      } catch (error) {
        console.error('Error when simulating depositAndRegisterForAutoRollover.', error);
        sentryTracker.captureException(error);
        sentryTracker.captureMessage('Unsuccessful depositAndRegisterForAutoRollover simulation.');
        throw new Error('Unsuccessful depositAndRegisterForAutoRollover simulation.');
      }

      if (this.isETH) {
        const gasLimit =
          await this.writeContracts.mellowRouter.estimateGas.depositEthAndRegisterForAutoRollover(
            weights,
            registration,
            tempOverrides,
          );
        tempOverrides.gasLimit = getGasBuffer(gasLimit);
      } else {
        const gasLimit =
          await this.writeContracts.mellowRouter.estimateGas.depositErc20AndRegisterForAutoRollover(
            scaledAmount,
            weights,
            registration,
            tempOverrides,
          );
        tempOverrides.gasLimit = getGasBuffer(gasLimit);
      }

      const tx = this.isETH
        ? await this.writeContracts.mellowRouter.depositEthAndRegisterForAutoRollover(
            weights,
            registration,
            tempOverrides,
          )
        : await this.writeContracts.mellowRouter.depositErc20AndRegisterForAutoRollover(
            scaledAmount,
            weights,
            registration,
            tempOverrides,
          );

      try {
        const receipt = await tx.wait();

        try {
          await this.refreshUserDeposit();
        } catch (error) {
          sentryTracker.captureException(error);
          sentryTracker.captureMessage(
            'User deposit failed to refresh after depositAndRegisterForAutoRollover',
          );
          console.error(
            'User deposit failed to refresh after depositAndRegisterForAutoRollover.',
            error,
          );
        }

        try {
          await this.refreshWalletBalance();
        } catch (error) {
          sentryTracker.captureException(error);
          sentryTracker.captureMessage(
            'Wallet user balance failed to refresh after depositAndRegisterForAutoRollover',
          );
          console.error(
            'Wallet user balance failed to refresh after depositAndRegisterForAutoRollover.',
            error,
          );
        }

        return receipt;
      } catch (error) {
        console.error('Unsuccessful depositAndRegisterForAutoRollover confirmation.', error);
        sentryTracker.captureException(error);
        sentryTracker.captureMessage(
          'Unsuccessful depositAndRegisterForAutoRollover confirmation.',
        );
        throw new Error('Unsuccessful depositAndRegisterForAutoRollover confirmation.');
      }
    } else {
      try {
        if (this.isETH) {
          this.writeContracts.mellowRouter.callStatic.depositEth(weights, tempOverrides);
        } else {
          await this.writeContracts.mellowRouter.callStatic.depositErc20(scaledAmount, weights);
        }
      } catch (error) {
        console.error('Error when simulating deposit.', error);
        sentryTracker.captureException(error);
        sentryTracker.captureMessage('Unsuccessful deposit simulation.');
        throw new Error('Unsuccessful deposit simulation.');
      }

      if (this.isETH) {
        const gasLimit = await this.writeContracts.mellowRouter.estimateGas.depositEth(
          weights,
          tempOverrides,
        );
        tempOverrides.gasLimit = getGasBuffer(gasLimit);
      } else {
        const gasLimit = await this.writeContracts.mellowRouter.estimateGas.depositErc20(
          scaledAmount,
          weights,
          tempOverrides,
        );
        tempOverrides.gasLimit = getGasBuffer(gasLimit);
      }

      const tx = this.isETH
        ? await this.writeContracts.mellowRouter.depositEth(weights, tempOverrides)
        : await this.writeContracts.mellowRouter.depositErc20(scaledAmount, weights, tempOverrides);

      try {
        const receipt = await tx.wait();

        try {
          await this.refreshUserDeposit();
        } catch (error) {
          sentryTracker.captureException(error);
          sentryTracker.captureMessage('User deposit failed to refresh after deposit');
          console.error('User deposit failed to refresh after deposit.', error);
        }

        try {
          await this.refreshWalletBalance();
        } catch (error) {
          sentryTracker.captureException(error);
          sentryTracker.captureMessage('Wallet user balance failed to refresh after deposit');
          console.error('Wallet user balance failed to refresh after deposit.', error);
        }

        return receipt;
      } catch (error) {
        console.error('Unsuccessful deposit confirmation.', error);
        sentryTracker.captureException(error);
        sentryTracker.captureMessage('Unsuccessful deposit confirmation.');
        throw new Error('Unsuccessful deposit confirmation.');
      }
    }
  };

  withdraw = async (vaultIndex: number): Promise<ContractReceipt> => {
    if (
      isUndefined(this.readOnlyContracts) ||
      isUndefined(this.writeContracts) ||
      isUndefined(this.userAddress)
    ) {
      throw new Error('Uninitialized contracts.');
    }

    const subvaultsCount: number = (
      await this.readOnlyContracts.erc20RootVault[vaultIndex].subvaultNfts()
    ).length;

    const minTokenAmounts = BigNumber.from(0);
    const vaultsOptions = new Array(subvaultsCount).fill(0x0);

    console.log(`Calling claimLPTokens(${vaultIndex}, ${[minTokenAmounts]}, [${vaultsOptions}])`);

    try {
      await this.writeContracts.mellowRouter.callStatic.claimLPTokens(
        vaultIndex,
        [minTokenAmounts],
        vaultsOptions,
      );
    } catch (err) {
      console.error('Error during claimLPTokens:', err);
      sentryTracker.captureException(err);
      sentryTracker.captureMessage('Unsuccessful claimLPTokens simulation.');
      throw new Error('Unsuccessful claimLPTokens simulation.');
    }

    const gasLimit = await this.writeContracts.mellowRouter.estimateGas.claimLPTokens(
      vaultIndex,
      [minTokenAmounts],
      vaultsOptions,
    );

    const tx = await this.writeContracts.mellowRouter.claimLPTokens(
      vaultIndex,
      [minTokenAmounts],
      vaultsOptions,
      {
        gasLimit: getGasBuffer(gasLimit),
      },
    );

    try {
      const receipt = await tx.wait();

      try {
        await this.refreshWalletBalance();
      } catch (err) {
        sentryTracker.captureException(err);
        sentryTracker.captureMessage('Wallet user balance failed to refresh after withdrawal');
        console.error('Wallet user balance failed to refresh after withdraw');
      }

      try {
        await this.refreshUserDeposit();
      } catch (err) {
        sentryTracker.captureException(err);
        sentryTracker.captureMessage('User deposit failed to refresh after withdrawal');
        console.error('User deposit failed to refresh after withdraw');
      }

      return receipt;
    } catch (err) {
      sentryTracker.captureException(err);
      sentryTracker.captureMessage('Unsucessful withdrawal confirmation.');
      throw new Error('Unsucessful withdraw confirmation.');
    }
  };

  rollover = async (vaultIndex: number, _weights: number[]): Promise<ContractReceipt> => {
    if (
      isUndefined(this.readOnlyContracts) ||
      isUndefined(this.writeContracts) ||
      isUndefined(this.userAddress)
    ) {
      throw new Error('Uninitialized contracts.');
    }

    const weights = _weights;
    while (weights.length < this.vaultsCount) {
      weights.push(0);
    }

    if (!this.validateWeights(weights)) {
      throw new Error('Weights are invalid');
    }

    const subvaultsCount: number = (
      await this.readOnlyContracts.erc20RootVault[vaultIndex].subvaultNfts()
    ).length;

    const minTokenAmounts = BigNumber.from(0);
    const vaultsOptions = new Array(subvaultsCount).fill(0x0);

    console.log(
      `Calling rolloverLPTokens(${vaultIndex}, ${[
        minTokenAmounts,
      ]}, [${vaultsOptions}], ${weights})`,
    );

    try {
      await this.writeContracts.mellowRouter.callStatic.rolloverLPTokens(
        vaultIndex,
        [minTokenAmounts],
        vaultsOptions,
        weights,
      );
    } catch (err) {
      console.error('Error during rolloverLPTokens', err);
      throw new Error('Unsuccessful rolloverLPTokens simulation.');
    }

    const gasLimit = await this.writeContracts.mellowRouter.estimateGas.rolloverLPTokens(
      vaultIndex,
      [minTokenAmounts],
      vaultsOptions,
      weights,
    );

    const tx = await this.writeContracts.mellowRouter.rolloverLPTokens(
      vaultIndex,
      [minTokenAmounts],
      vaultsOptions,
      weights,
      {
        gasLimit: getGasBuffer(gasLimit),
      },
    );

    try {
      const receipt = await tx.wait();

      try {
        await this.refreshWalletBalance();
      } catch (err) {
        sentryTracker.captureException(err);
        sentryTracker.captureMessage('Wallet user balance failed to refresh after rollover');
        console.error('Wallet user balance failed to refresh after rollover');
      }

      try {
        await this.refreshUserDeposit();
      } catch (err) {
        sentryTracker.captureException(err);
        sentryTracker.captureMessage('User deposit failed to refresh after rollover');
        console.error('User deposit failed to refresh after rollover');
      }

      return receipt;
    } catch (err) {
      sentryTracker.captureException(err);
      sentryTracker.captureMessage('Unsucessful rollover confirmation.');
      throw new Error('Unsucessful rollover confirmation.');
    }
  };

  registerForAutoRollover = async (registration: boolean): Promise<ContractReceipt> => {
    if (isUndefined(this.writeContracts) || isUndefined(this.userAddress)) {
      throw new Error('Uninitialized contracts.');
    }

    try {
      await this.writeContracts.mellowRouter.callStatic.registerForAutoRollover(registration);
    } catch (err) {
      sentryTracker.captureException(err);
      sentryTracker.captureMessage('Unsuccessful auto-rollover registration simulation');
      console.error('Error during registration for auto-rollover', err);
      throw new Error('Unsuccessful auto-rollover registration simulation');
    }

    const gasLimit = await this.writeContracts.mellowRouter.estimateGas.registerForAutoRollover(
      registration,
    );

    const tx = await this.writeContracts.mellowRouter.registerForAutoRollover(registration, {
      gasLimit: getGasBuffer(gasLimit),
    });

    try {
      const receipt = await tx.wait();

      return receipt;
    } catch (err) {
      sentryTracker.captureException(err);
      sentryTracker.captureMessage('Unsucessful auto-rollover registration confirmation.');
      throw new Error('Unsucessful auto-rollover registration confirmation.');
    }
  };

  gasRegisterForAutoRollover = async (registration: boolean): Promise<number> => {
    if (isUndefined(this.writeContracts) || isUndefined(this.userAddress)) {
      throw new Error('Uninitialized contracts.');
    }

    try {
      await this.writeContracts.mellowRouter.callStatic.registerForAutoRollover(registration);
    } catch (err) {
      sentryTracker.captureException(err);
      sentryTracker.captureMessage('Unsuccessful auto-rollover registration simulation');
      console.error('Error during registration for auto-rollover', err);
      throw new Error('Unsuccessful auto-rollover registration simulation');
    }

    // returns gas estimate in gas units
    const gasUnitsEstimate =
      await this.writeContracts.mellowRouter.estimateGas.registerForAutoRollover(registration);

    // convert gas estimate from gas units into usd
    const gasPriceUSD = await convertGasUnitsToUSD(gasUnitsEstimate);
    return gasPriceUSD;
  };

  getAutorolloverRegistrationFlag = async (): Promise<boolean> => {
    if (isUndefined(this.readOnlyContracts) || isUndefined(this.userAddress)) {
      throw new Error('Uninitialized contracts.');
    }

    try {
      const isWalletAutorolloverRegistered =
        await this.readOnlyContracts.mellowRouterContract.isRegisteredForAutoRollover(
          this.userAddress,
        );
      return isWalletAutorolloverRegistered;
    } catch (err) {
      sentryTracker.captureException(err);
      sentryTracker.captureMessage(
        'Unsuccessful auto-rollover registration verificaiton simulation',
      );
      console.error('Error during auto-rollover registration verificaiton simulation', err);
      throw new Error('Unsuccessful auto-rollover registration verificaiton simulation');
    }
  };
}

export default MellowLpRouter;
