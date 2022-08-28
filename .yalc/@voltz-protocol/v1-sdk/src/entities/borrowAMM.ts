import JSBI from 'jsbi';
import {providers } from 'ethers';
import { BigNumber, Signer } from 'ethers';
import {
  ONE_YEAR_IN_SECONDS,
} from '../constants';
import {
  BaseRateOracle__factory,
  ICToken__factory as cTokenFactory,
  ICompoundRateOracle__factory,
  IAaveRateOracle__factory,
  IAaveV2LendingPool__factory,
  IERC20Minimal__factory,
  ICToken,
  IERC20Minimal,
  CompoundBorrowRateOracle__factory,
  AaveBorrowRateOracle__factory,
} from '../typechain';
import RateOracle from './rateOracle';
import Token from './token';
import { Price } from './fractions/price';
import { TokenAmount } from './fractions/tokenAmount';
import Position from './position';
import AMM from './amm';

import axios from 'axios';

var geckoEthToUsd = async () => {
  for (let attempt = 0; attempt < 5; attempt++) {
    try{
      let data = await axios.get('https://pro-api.coingecko.com/api/v3/simple/price?x_cg_pro_api_key='+process.env.REACT_APP_COINGECKO_API_KEY+'&ids=ethereum&vs_currencies=usd');
      return data.data.ethereum.usd;
    } catch (error) {
    }
  }
  return 0;
};


// dynamic information about position

export type BorrowAMMConstructorArgs = {
  id: string;
  amm: AMM;
};

class BorrowAMM {
  public readonly id: string;
  public readonly signer: Signer | null;
  public readonly provider?: providers.Provider;
  public readonly environment: string;
  public readonly rateOracle: RateOracle;
  public readonly termStartTimestamp: JSBI;
  public readonly termEndTimestamp: JSBI;
  public readonly underlyingToken: Token;
  public readonly amm: AMM;

  public cToken: ICToken | undefined;
  public aaveVariableDebtToken: IERC20Minimal | undefined;

  public underlyingDebt: number = 0;
  public variableDebt: number = 0;
  public fixedDebt: number = 0;
  public aggregatedDebt: number = 0;

  public constructor({
    id,
    amm
  }: BorrowAMMConstructorArgs) {
    this.id = id;
    this.signer = amm.signer;
    this.provider = amm.provider || amm.signer?.provider;
    this.environment = amm.environment;
    this.rateOracle = amm.rateOracle;
    this.termStartTimestamp = amm.termStartTimestamp;
    this.termEndTimestamp = amm.termEndTimestamp;
    this.underlyingToken = amm.underlyingToken;
    this.amm = amm;

    const protocolId = this.rateOracle.protocolId;
    if ( protocolId !== 6 && protocolId !== 5 ) {
        throw new Error("Not a borrow market");
    }

  }

  // scale/descale according to underlying token

  public descale(value: BigNumber): number {
    if (this.underlyingToken.decimals <= 3) {
      return value.toNumber() / (10 ** this.underlyingToken.decimals);
    }
    else {
      return value.div(BigNumber.from(10).pow(this.underlyingToken.decimals - 3)).toNumber() / 1000;
    }
  }

  public scale(value: number): string {
    const price = Price.fromNumber(value);
    const tokenAmount = TokenAmount.fromFractionalAmount(
      this.underlyingToken,
      price.numerator,
      price.denominator,
    );
    const scaledValue = tokenAmount.scale();

    return scaledValue;
  }

  public getAllSwaps(position: Position) {
    const allSwaps: {
      fDelta: BigNumber,
      vDelta: BigNumber,
      timestamp: BigNumber
    }[] = [];

    if(position === undefined){
      return allSwaps;
    }

    for (let s of position.swaps) {
      allSwaps.push({
        fDelta: BigNumber.from(s.fixedTokenDeltaUnbalanced.toString()),
        vDelta: BigNumber.from(s.variableTokenDelta.toString()),
        timestamp: BigNumber.from(s.transactionTimestamp.toString())
      })
    }

    allSwaps.sort((a, b) => a.timestamp.sub(b.timestamp).toNumber());

    return allSwaps;
  }

  public async getAccruedCashflow(allSwaps: {
    fDelta: BigNumber,
    vDelta: BigNumber,
    timestamp: BigNumber
  }[], atMaturity: boolean): Promise<[BigNumber, BigNumber]> {
    if (!this.provider) {
      throw new Error('Wallet not connected');
    }

    let totalVarableCashflow = BigNumber.from(0);
    let totalFixedCashflow = BigNumber.from(0);
    let lenSwaps = allSwaps.length;

    const lastBlock = await this.provider.getBlockNumber();
    const lastBlockTimestamp = BigNumber.from((await this.provider.getBlock(lastBlock - 2)).timestamp);

    let untilTimestamp = (atMaturity)
      ? BigNumber.from(this.termEndTimestamp.toString())
      : lastBlockTimestamp.mul(BigNumber.from(10).pow(18));

    const rateOracleContract = BaseRateOracle__factory.connect(this.rateOracle.id, this.provider);

    for (let i = 0; i < lenSwaps; i++) {
      const currentSwapTimestamp = allSwaps[i].timestamp.mul(BigNumber.from(10).pow(18));

      const normalizedTime = (untilTimestamp.sub(currentSwapTimestamp)).div(BigNumber.from(ONE_YEAR_IN_SECONDS));

      const variableFactorBetweenSwaps = await rateOracleContract.callStatic.variableFactor(currentSwapTimestamp, untilTimestamp);

      const fixedCashflow = allSwaps[i].fDelta.mul(normalizedTime).div(BigNumber.from(100)).div(BigNumber.from(10).pow(18));
      const variableCashflow = allSwaps[i].vDelta.mul(variableFactorBetweenSwaps).div(BigNumber.from(10).pow(18));

      totalFixedCashflow = totalFixedCashflow.add(fixedCashflow);
      totalVarableCashflow = totalVarableCashflow.add(variableCashflow);
    }

    return [totalFixedCashflow, totalVarableCashflow];
  }

  public async atMaturity(): Promise<boolean> {
    if (!this.provider) {
      throw new Error('Blockchain not connected');
    }
    // is past maturity?
    const lastBlock = await this.provider.getBlockNumber();
    const lastBlockTimestamp = BigNumber.from((await this.provider.getBlock(lastBlock - 1)).timestamp);
    const pastMaturity = (BigNumber.from(this.termEndTimestamp.toString())).lt(lastBlockTimestamp.mul(BigNumber.from(10).pow(18)));

    return pastMaturity;
  }

  public async getVariableCashFlow(position: Position): Promise<BigNumber> {
    if(position === undefined){
      return BigNumber.from(0);
    }
    const allSwaps = this.getAllSwaps(position);
    const pastMaturity = await this.atMaturity();

    const [fixedCashFlow, variableCashFlow] = await this.getAccruedCashflow(allSwaps, pastMaturity);

    return variableCashFlow;
  }

  public async getFixedCashFlow(position: Position): Promise<number> {
    if(position === undefined){
      return 0;
    }
  
    const allSwaps = this.getAllSwaps(position);
    const pastMaturity = await this.atMaturity();

    const [fixedCashFlow, variableCashFlow] = await this.getAccruedCashflow(allSwaps, pastMaturity);

    return this.descale(fixedCashFlow);
  }

  public async getScaledUnderlyingBorrowBalance(): Promise<BigNumber> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    const protocolId = this.rateOracle.protocolId;
    if ( protocolId === 6 && !this.cToken) {
      const compoundRateOracle = CompoundBorrowRateOracle__factory.connect(this.rateOracle.id, this.signer)
      const cTokenAddress = await compoundRateOracle.ctoken();
      this.cToken = cTokenFactory.connect(cTokenAddress, this.signer);

    } else if ( protocolId === 5 && !this.aaveVariableDebtToken) {
      const aaveRateOracle = AaveBorrowRateOracle__factory.connect(this.rateOracle.id, this.signer)

      const lendingPoolAddress = await aaveRateOracle.aaveLendingPool();
      const lendingPool = IAaveV2LendingPool__factory.connect(lendingPoolAddress, this.signer);
      if(!this.underlyingToken.id){
        throw new Error('missing underlying token address');
      }
      const reserve =  await lendingPool.getReserveData(this.underlyingToken.id);
      const variableDebtTokenAddress = reserve.variableDebtTokenAddress;
      this.aaveVariableDebtToken = IERC20Minimal__factory.connect(variableDebtTokenAddress, this.signer);
    }
    

    let borrowBalance = BigNumber.from(0);
    if (this.cToken) { // compound
        const userAddress = await this.signer.getAddress();
        borrowBalance = await this.cToken.callStatic.borrowBalanceCurrent(userAddress);
    } else if ( this.aaveVariableDebtToken ) { // aave
        const userAddress = await this.signer.getAddress();
        borrowBalance = await this.aaveVariableDebtToken.balanceOf(userAddress);
    }

    return borrowBalance;
  }

  public async getUnderlyingBorrowBalance(): Promise<number> {
    const borrowBalance = await this.getScaledUnderlyingBorrowBalance();
    return this.descale(borrowBalance);
  }

  public async getFixedBorrowBalance(position: Position): Promise<number> {
    const fixedCashFlow= await this.getFixedCashFlow(position);
    const notional = this.descale(BigNumber.from(position.variableTokenBalance.toString()));

    return notional - fixedCashFlow;
  }

  // get variable debt: debt from underlying protocol - fixed debt on Voltz
  public async getAggregatedBorrowBalance(position: Position): Promise<number> {
    const variableCashFlow = await this.getVariableCashFlow(position);
    const notional = BigNumber.from(position.variableTokenBalance.toString());
    const notionalWithVariableCashFlow = notional.add(variableCashFlow);

    const buffer = BigNumber.from("1001").div(BigNumber.from("1000"))
    const notionalWithVariableCashFlowAndBuffer = notionalWithVariableCashFlow.mul(buffer);

    const underlyingBorrowBalance = await this.getScaledUnderlyingBorrowBalance();

    if (underlyingBorrowBalance.gte(notionalWithVariableCashFlowAndBuffer)) {
      return this.descale(underlyingBorrowBalance.sub(notionalWithVariableCashFlow));
    } else {
      return 0;
    }
  }

  public async getFullyCollateralisedMarginRequirement(fixedTokenBalance: number, variableTokenBalance: number, fee: number): Promise<number> {
    if (!this.provider) {
      throw new Error('Blockchain not connected');
    }

    const variableAPYToMaturity = await this.amm.getVariableFactor(
      BigNumber.from(this.termStartTimestamp.toString()), 
      BigNumber.from(this.termEndTimestamp.toString())
    );

    const termStartTimestamp = (BigNumber.from(this.termStartTimestamp.toString()).div(BigNumber.from(10).pow(18))).toNumber();
    const termEndTimestamp = (BigNumber.from(this.termEndTimestamp.toString()).div(BigNumber.from(10).pow(18))).toNumber();
    const fixedFactor = (termEndTimestamp - termStartTimestamp) / ONE_YEAR_IN_SECONDS * 0.01;
    
    let fcMargin = -(fixedTokenBalance * fixedFactor + variableTokenBalance * variableAPYToMaturity);
    fcMargin = (fcMargin + fee) * 1.01;
    return fcMargin > 0 ? fcMargin : 0;
  }
  
  public async getFixedBorrowBalanceInUSD(position: Position): Promise<number> {
    const balanceInTokens = await this.getFixedBorrowBalance(position);
    if (this.amm && this.amm.isETH) {
      const EthToUsdPrice = await geckoEthToUsd();
      return balanceInTokens*EthToUsdPrice;
    }
    return balanceInTokens;
  }

  public async getUnderlyingBorrowBalanceInUSD(): Promise<number> {
    const balanceInTokens = await this.getUnderlyingBorrowBalance();
    if (this.amm && this.amm.isETH) {
      const EthToUsdPrice = await geckoEthToUsd();
      return balanceInTokens*EthToUsdPrice;
    }
    return balanceInTokens;
  }

  public async getAggregatedBorrowBalanceInUSD(position: Position): Promise<number> {
    const balanceInTokens = await this.getAggregatedBorrowBalance(position);
    if (this.amm && this.amm.isETH) {
      const EthToUsdPrice = await geckoEthToUsd();
      return balanceInTokens*EthToUsdPrice;
    }
    return balanceInTokens;
  }

}

export default BorrowAMM;
