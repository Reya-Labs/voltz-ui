/* eslint-disable camelcase */
/* eslint-disable lines-between-class-members */
import { Signer, providers, ethers, BigNumberish, BigNumber, ContractReceipt } from 'ethers';
import { isNull, isUndefined } from 'lodash';
import { getProtocolPrefix, getTokenInfo } from '../services/getTokenInfo';
import timestampWadToDateTime from '../utils/timestampWadToDateTime';
import {
  BaseRateOracle,
  BaseRateOracle__factory,
  IERC20Minimal,
  IERC20Minimal__factory,
  MarginEngine,
  MarginEngine__factory,
} from '../typechain';
import { getGasBuffer } from '../constants';

export type MellowLpVaultArgs = {
  id: string;
  provider?: providers.Provider;
};

class MellowLpVault {
  public readonly id: string;
  public readonly provider?: providers.Provider;

  public readOnlyContracts?: {
    marginEngine: MarginEngine;
    token: IERC20Minimal;
    rateOracle: BaseRateOracle;
    // TODO: change type
    erc20Vault: any;
  };

  public writeContracts?: {
    token: IERC20Minimal;
    // TODO: change type
    erc20Vault: any;
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

  public constructor({ id, provider }: MellowLpVaultArgs) {
    this.id = id;
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

    // TODO: retrieve margin engine address from voltzVault
    const marginEngineAddress = '0x0BC09825Ce9433B2cDF60891e1B50a300b069Dd2';
    const marginEngineContract = MarginEngine__factory.connect(marginEngineAddress, this.provider);

    const tokenAddress = await marginEngineContract.underlyingToken();
    const tokenContract = IERC20Minimal__factory.connect(tokenAddress, this.provider);

    console.log('token address:', tokenAddress);

    const rateOracleAddress = await marginEngineContract.rateOracle();
    const rateOracleContract = BaseRateOracle__factory.connect(rateOracleAddress, this.provider);

    console.log('rate oracle:', rateOracleAddress);

    this.readOnlyContracts = {
      marginEngine: marginEngineContract,
      token: tokenContract,
      rateOracle: rateOracleContract,
      // TODO: build erc20Vault
      erc20Vault: null,
    };

    console.log('read-only contracts ready');

    this.protocolId = await rateOracleContract.UNDERLYING_YIELD_BEARING_PROTOCOL_ID();

    console.log('protocol ID:', this.protocolId);

    const maturityWad = await marginEngineContract.termEndTimestampWad();
    const date = timestampWadToDateTime(maturityWad);

    this.maturity = `${date.day} ${date.monthShort} ${date.year % 100}`;

    console.log('maturity:', this.maturity);

    await this.refreshVaultCap();
    console.log('vault cap refreshed', this.vaultCap);

    await this.refreshVaultAccumulative();
    console.log('vault accumulative refreshed', this.vaultAccumulative);

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
      token: IERC20Minimal__factory.connect(this.readOnlyContracts.token.address, this.signer),
      // TODO: build erc20Vault
      erc20Vault: null,
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

  refreshVaultCap = async (): Promise<void> => {
    this.vaultCap = 20000;
  };

  refreshVaultAccumulative = async (): Promise<void> => {
    this.vaultAccumulative = 10000;
  };

  refreshVaultExpectedApy = async (): Promise<void> => {
    this.vaultExpectedApy = 7;
  };

  refreshUserDeposit = async (): Promise<void> => {
    this.userDeposit = 1999;
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

  getTokenApproval = async (): Promise<number> => {
    if (
      isUndefined(this.userAddress) ||
      isUndefined(this.readOnlyContracts) ||
      isUndefined(this.tokenDecimals)
    ) {
      return 0;
    }

    console.log(`Querying allowance...`);
    return 123456;

    // const tokenApproval = await this.readOnlyContracts.token.allowance(
    //   this.userAddress,
    //   this.readOnlyContracts.erc20Vault.address,
    // );

    // return this.descale(tokenApproval, this.tokenDecimals);
  };

  approveToken = async (amount: number): Promise<ContractReceipt> => {
    if (isUndefined(this.readOnlyContracts) || isUndefined(this.writeContracts)) {
      throw new Error('Uninitialized contracts.');
    }

    const scaledAmount = this.scale(amount);

    console.log(`Calling approve(${scaledAmount})...`);
    throw new Error(`Calling approve(${scaledAmount})...`);

    // try {
    //   await this.writeContracts.token.callStatic.approve(
    //     this.readOnlyContracts.erc20Vault.address,
    //     scaledAmount,
    //   );
    // } catch (_) {
    //   throw new Error('Unsuccessful approval.');
    // }

    // const gasLimit = await this.writeContracts.token.estimateGas.approve(
    //   this.readOnlyContracts.erc20Vault.address,
    //   scaledAmount,
    // );

    // const tx = await this.writeContracts.token.approve(
    //   this.readOnlyContracts.erc20Vault.address,
    //   scaledAmount,
    //   {
    //     gasLimit: getGasBuffer(gasLimit),
    //   },
    // );

    // try {
    //   const receipt = await tx.wait();
    //   return receipt;
    // } catch (_) {
    //   throw new Error('Unsucessful confirmation.');
    // }
  };

  deposit = async (amount: number): Promise<ContractReceipt> => {
    if (isUndefined(this.readOnlyContracts) || isUndefined(this.writeContracts)) {
      throw new Error('Uninitialized contracts.');
    }

    const scaledAmount = this.scale(amount);

    console.log(`Calling deposit(${scaledAmount})...`);
    throw new Error(`Calling deposit(${scaledAmount})...`);

    // try {
    //   await this.writeContracts.erc20Vault.callStatic.deposit([scaledAmount], 0, '');
    // } catch (_) {
    //   throw new Error('Unsuccessful approval.');
    // }

    // const gasLimit = await this.writeContracts.erc20Vault.estimatedGas.deposit(
    //   [scaledAmount],
    //   0,
    //   '',
    // );

    // const tx = await this.writeContracts.erc20Vault.deposit([scaledAmount], 0, '', {
    //   gasLimit: getGasBuffer(gasLimit),
    // });

    // try {
    //   const receipt = await tx.wait();
    //   return receipt;
    // } catch (_) {
    //   throw new Error('Unsucessful confirmation.');
    // }
  };
}

export default MellowLpVault;
