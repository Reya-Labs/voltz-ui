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
import { getGasBuffer, MaxUint256Bn, TresholdApprovalBn } from '../constants';

import { abi as VoltzVaultABI } from '../ABIs/VoltzVault.json';
import { abi as Erc20RootVaultABI } from '../ABIs/Erc20RootVault.json';

export type MellowLpVaultArgs = {
  voltzVaultAddress: string;
  erc20RootVaultAddress: string;
  provider?: providers.Provider;
};

class MellowLpVault {
  public readonly voltzVaultAddress: string;
  public readonly erc20RootVaultAddress: string;
  public readonly provider?: providers.Provider;

  public readOnlyContracts?: {
    marginEngine: MarginEngine;
    token: IERC20Minimal;
    rateOracle: BaseRateOracle;
    voltzVault: Contract;
    erc20RootVault: Contract;
  };

  public writeContracts?: {
    token: IERC20Minimal;
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

  public constructor({ erc20RootVaultAddress, voltzVaultAddress, provider }: MellowLpVaultArgs) {
    this.erc20RootVaultAddress = erc20RootVaultAddress;
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

    const erc20RootVaultContract = new ethers.Contract(
      this.erc20RootVaultAddress,
      Erc20RootVaultABI,
      this.provider,
    );

    const marginEngineAddress = await voltzVaultContract.marginEngine();
    const marginEngineContract = MarginEngine__factory.connect(marginEngineAddress, this.provider);

    console.log('margin engine address:', marginEngineAddress);

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
      voltzVault: voltzVaultContract,
      erc20RootVault: erc20RootVaultContract,
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

    const updatedTvl = await this.readOnlyContracts.voltzVault.callStatic.updateTvl();
    console.log('voltz updated tvl', updatedTvl.toString());

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
