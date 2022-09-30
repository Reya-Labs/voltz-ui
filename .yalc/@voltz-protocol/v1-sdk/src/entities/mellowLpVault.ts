/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable lines-between-class-members */
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
import { getProtocolPrefix, getTokenInfo } from '../services/getTokenInfo';
import timestampWadToDateTime from '../utils/timestampWadToDateTime';
import { getGasBuffer, MaxUint256Bn, TresholdApprovalBn } from '../constants';

import { abi as VoltzVaultABI } from '../ABIs/VoltzVault.json';
import { abi as Erc20RootVaultABI } from '../ABIs/Erc20RootVault.json';
import { abi as Erc20RootVaultGovernanceABI } from '../ABIs/Erc20RootVaultGovernance.json';
import { abi as MarginEngineABI } from '../ABIs/MarginEngine.json';
import { abi as BaseRateOracleABI } from '../ABIs/BaseRateOracle.json';
import { abi as IERC20MinimalABI } from '../ABIs/IERC20Minimal.json';

export type MellowLpVaultArgs = {
  voltzVaultAddress: string;
  erc20RootVaultAddress: string;
  erc20RootVaultGovernanceAddress: string;
  provider?: providers.Provider;
};

class MellowLpVault {
  public readonly voltzVaultAddress: string;
  public readonly erc20RootVaultAddress: string;
  public readonly erc20RootVaultGovernanceAddress: string;
  public readonly provider?: providers.Provider;

  public readOnlyContracts?: {
    marginEngine: Contract;
    token: Contract;
    rateOracle: Contract;
    voltzVault: Contract;
    erc20RootVault: Contract;
    erc20RootVaultGovernance: Contract;
  };

  public writeContracts?: {
    token: Contract;
    voltzVault: Contract;
    erc20RootVault: Contract;
  };

  public signer?: Signer;
  public maturity?: string;
  public protocolId?: number;

  public vaultAccumulative?: number;
  public vaultCap?: number;
  public vaultExpectedApy?: number;

  public userDeposit?: number;
  public userExpectedCashflow?: number;
  public userWalletBalance?: number;

  public userAddress?: string;

  public vaultInitialized = false;
  public userInitialized = false;

  public constructor({
    erc20RootVaultAddress,
    erc20RootVaultGovernanceAddress,
    voltzVaultAddress,
    provider,
  }: MellowLpVaultArgs) {
    this.erc20RootVaultAddress = erc20RootVaultAddress;
    this.erc20RootVaultGovernanceAddress = erc20RootVaultGovernanceAddress;
    this.voltzVaultAddress = voltzVaultAddress;
    this.provider = provider;
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
      console.log('The vault is already initialized');
      return;
    }

    if (isUndefined(this.provider)) {
      console.log('Stop here... No provider provided');
      return;
    }

    const voltzVaultContract = new ethers.Contract(
      this.voltzVaultAddress,
      VoltzVaultABI,
      this.provider,
    );
    console.log('voltz vault address:', this.voltzVaultAddress);

    const marginEngineAddress = await voltzVaultContract.marginEngine();
    const marginEngineContract = new ethers.Contract(
      marginEngineAddress,
      MarginEngineABI,
      this.provider,
    );

    console.log('margin engine address:', marginEngineAddress);

    const tokenAddress = await marginEngineContract.underlyingToken();
    const tokenContract = new Contract(tokenAddress, IERC20MinimalABI, this.provider);

    console.log('token address:', tokenAddress);

    const rateOracleAddress = await marginEngineContract.rateOracle();
    const rateOracleContract = new Contract(rateOracleAddress, BaseRateOracleABI, this.provider);

    console.log('rate oracle:', rateOracleAddress);

    this.readOnlyContracts = {
      marginEngine: marginEngineContract,
      token: tokenContract,
      rateOracle: rateOracleContract,
      voltzVault: voltzVaultContract,
      erc20RootVault: new ethers.Contract(
        this.erc20RootVaultAddress,
        Erc20RootVaultABI,
        this.provider,
      ),
      erc20RootVaultGovernance: new ethers.Contract(
        this.erc20RootVaultGovernanceAddress,
        Erc20RootVaultGovernanceABI,
        this.provider,
      ),
    };

    console.log('read-only contracts ready');

    this.protocolId = await rateOracleContract.UNDERLYING_YIELD_BEARING_PROTOCOL_ID();

    console.log('protocol ID:', this.protocolId);

    const maturityWad = await marginEngineContract.termEndTimestampWad();
    const date = timestampWadToDateTime(maturityWad);

    this.maturity = `${date.day} ${date.monthShort} ${date.year % 100}`;

    console.log('maturity:', this.maturity);

    await this.refreshVaultAccumulative();
    console.log('vault accumulative refreshed', this.vaultAccumulative);
    console.log('vault cap refreshed', this.vaultCap);

    await this.refreshVaultExpectedApy();
    console.log('vault expected apy refreshed', this.vaultExpectedApy);

    this.vaultInitialized = true;
  };

  userInit = async (signer: Signer): Promise<void> => {
    this.signer = signer;

    if (this.userInitialized) {
      console.log('The user is already initialized');
      return;
    }

    if (!this.vaultInitialized) {
      console.log('The vault should be initialized first');
      return;
    }

    if (isUndefined(this.readOnlyContracts)) {
      throw new Error('Uninitialized contracts.');
    }

    this.userAddress = await this.signer.getAddress();
    console.log('user address', this.userAddress);

    this.writeContracts = {
      token: new ethers.Contract(
        this.readOnlyContracts.token.address,
        IERC20MinimalABI,
        this.signer,
      ),
      voltzVault: new ethers.Contract(this.voltzVaultAddress, VoltzVaultABI, this.signer),
      erc20RootVault: new ethers.Contract(
        this.erc20RootVaultAddress,
        Erc20RootVaultABI,
        this.signer,
      ),
    };

    console.log('write contracts ready');

    await this.refreshUserDeposit();
    console.log('user deposit refreshed', this.userDeposit);
    await this.refreshUserExpectedCashflow();
    console.log('user expected cashflow refreshed', this.userExpectedCashflow);
    await this.refreshWalletBalance();
    console.log('user wallet balance refreshed', this.userWalletBalance);

    this.userInitialized = true;
  };

  public get tokenName(): string {
    if (isUndefined(this.readOnlyContracts)) {
      return '-';
    }

    return getTokenInfo(this.readOnlyContracts.token.address).name;
  }

  public get tokenDecimals(): number {
    if (isUndefined(this.readOnlyContracts)) {
      return 18;
    }

    return getTokenInfo(this.readOnlyContracts.token.address).decimals;
  }

  public get protocol(): string {
    if (isUndefined(this.protocolId)) {
      return '-';
    }

    const prefix = getProtocolPrefix(this.protocolId);

    return `${prefix}${this.tokenName}`;
  }

  refreshVaultAccumulative = async (): Promise<void> => {
    if (isUndefined(this.readOnlyContracts)) {
      this.vaultAccumulative = 0;
      this.vaultCap = 0;
      return;
    }

    const totalLpTokens = await this.readOnlyContracts.erc20RootVault.totalSupply();

    if (totalLpTokens.eq(0)) {
      this.vaultAccumulative = 0;
      this.vaultCap = 0;
      return;
    }

    const tvl = await this.readOnlyContracts.erc20RootVault.tvl();
    console.log('accumulated (tvl):', tvl.minTokenAmounts[0].toString());

    const nft = await this.readOnlyContracts.erc20RootVault.nft();
    const strategyParams = await this.readOnlyContracts.erc20RootVaultGovernance.strategyParams(
      nft,
    );
    console.log('strategy params:', strategyParams);
    console.log('token limit', strategyParams.tokenLimit.toString());

    this.vaultAccumulative = this.descale(tvl.minTokenAmounts[0], this.tokenDecimals);
    this.vaultCap = this.descale(
      totalLpTokens.mul(toBn('1', 18)).div(strategyParams.tokenLimit),
      16,
    );
  };

  refreshVaultExpectedApy = async (): Promise<void> => {
    this.vaultExpectedApy = 7;
  };

  refreshUserDeposit = async (): Promise<void> => {
    if (
      isUndefined(this.userAddress) ||
      isUndefined(this.readOnlyContracts) ||
      isUndefined(this.tokenDecimals)
    ) {
      this.userDeposit = 0;
      return;
    }

    const lpTokens = await this.readOnlyContracts.erc20RootVault.balanceOf(this.userAddress);
    const totalLpTokens = await this.readOnlyContracts.erc20RootVault.totalSupply();

    console.log('lp tokens', lpTokens.toString());
    console.log('total lp tokens:', totalLpTokens);
    const tvl = await this.readOnlyContracts.erc20RootVault.tvl();
    console.log('tvl', tvl.toString());

    if (totalLpTokens.gt(0)) {
      const userFunds = lpTokens.mul(tvl[0][0]).div(totalLpTokens);
      console.log('user funds:', userFunds.toString());
      this.userDeposit = this.descale(userFunds, this.tokenDecimals);
    } else {
      this.userDeposit = 0;
    }
  };

  refreshUserExpectedCashflow = async (): Promise<void> => {
    this.userExpectedCashflow = 299;
  };

  refreshWalletBalance = async (): Promise<void> => {
    if (
      isUndefined(this.userAddress) ||
      isUndefined(this.readOnlyContracts) ||
      isUndefined(this.tokenDecimals)
    ) {
      this.userWalletBalance = 0;
      return;
    }

    const walletBalance = await this.readOnlyContracts.token.balanceOf(this.userAddress);
    this.userWalletBalance = this.descale(walletBalance, this.tokenDecimals);
  };

  isTokenApproved = async (): Promise<boolean> => {
    if (
      isUndefined(this.userAddress) ||
      isUndefined(this.readOnlyContracts) ||
      isUndefined(this.tokenDecimals)
    ) {
      return false;
    }

    const tokenApproval = await this.readOnlyContracts.token.allowance(
      this.userAddress,
      this.readOnlyContracts.erc20RootVault.address,
    );

    return tokenApproval.gte(TresholdApprovalBn);
  };

  approveToken = async (): Promise<ContractReceipt> => {
    if (isUndefined(this.readOnlyContracts) || isUndefined(this.writeContracts)) {
      throw new Error('Uninitialized contracts.');
    }

    try {
      await this.writeContracts.token.callStatic.approve(
        this.readOnlyContracts.erc20RootVault.address,
        MaxUint256Bn,
      );
    } catch (_) {
      throw new Error('Unsuccessful approval simulation.');
    }

    const gasLimit = await this.writeContracts.token.estimateGas.approve(
      this.readOnlyContracts.erc20RootVault.address,
      MaxUint256Bn,
    );

    const tx = await this.writeContracts.token.approve(
      this.readOnlyContracts.erc20RootVault.address,
      MaxUint256Bn,
      {
        gasLimit: getGasBuffer(gasLimit),
      },
    );

    try {
      const receipt = await tx.wait();
      return receipt;
    } catch (_) {
      throw new Error('Unsucessful approval confirmation.');
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

    console.log(`Calling deposit(${scaledAmount})...`);

    const minLPTokens = BigNumber.from(0);

    console.log(`args of deposit: (${[scaledAmount]}, ${minLPTokens.toString()}, ${[]}`);

    try {
      await this.writeContracts.erc20RootVault.callStatic.deposit([scaledAmount], minLPTokens, []);
    } catch (err) {
      console.log('ERROR', err);
      throw new Error('Unsuccessful deposit simulation.');
    }

    const gasLimit = await this.writeContracts.erc20RootVault.estimateGas.deposit(
      [scaledAmount],
      minLPTokens,
      [],
    );

    const tx = await this.writeContracts.erc20RootVault.deposit([scaledAmount], minLPTokens, [], {
      gasLimit: getGasBuffer(gasLimit),
    });

    try {
      const receipt = await tx.wait();

      try {
        await this.refreshWalletBalance();
      } catch (_) {
        console.error('Wallet user balance failed to refresh after deposit');
      }

      try {
        await this.refreshUserDeposit();
      } catch (_) {
        console.error('User deposit failed to refresh after deposit');
      }

      try {
        await this.refreshVaultAccumulative();
      } catch (_) {
        console.error('Vault accumulative failed to refresh after deposit');
      }

      return receipt;
    } catch (err) {
      console.log('ERROR', err);
      throw new Error('Unsucessful deposit confirmation.');
    }
  };
}

export default MellowLpVault;
