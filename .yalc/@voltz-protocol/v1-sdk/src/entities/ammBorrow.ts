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
} from '../typechain';
import RateOracle from './rateOracle';
import Token from './token';
import { Price } from './fractions/price';
import { TokenAmount } from './fractions/tokenAmount';
import Position from './position';


// dynamic information about position

export type PositionInfo = {
    notionalInUSD: number;
    marginInUSD: number;
    margin: number;
    fees?: number;
    liquidationThreshold?: number;
    safetyThreshold?: number;
    accruedCashflowInUSD: number;
    accruedCashflow: number;
    variableRateSinceLastSwap?: number;
    fixedRateSinceLastSwap?: number;
    beforeMaturity: boolean;
    fixedApr?: number;
    healthFactor?: number;
  }

export type BorrowAMMConstructorArgs = {
  id: string;
  signer: Signer | null;
  provider?: providers.Provider;
  environment: string;
  factoryAddress: string;
  marginEngineAddress: string;
  rateOracle: RateOracle;
  termStartTimestamp: JSBI;
  termEndTimestamp: JSBI;
  underlyingToken: Token;
  tick: number;
  tickSpacing: number;
};

class BorrowAMM {
  public readonly id: string;
  public readonly signer: Signer | null;
  public readonly provider?: providers.Provider;
  public readonly environment: string;
  public readonly factoryAddress: string;
  public readonly marginEngineAddress: string;
  public readonly rateOracle: RateOracle;
  public readonly termStartTimestamp: JSBI;
  public readonly termEndTimestamp: JSBI;
  public readonly underlyingToken: Token;
  public readonly tickSpacing: number;
  public readonly tick: number;

  public cToken?: ICToken;
  public aaveVariableDebtToken?: IERC20Minimal;

  public constructor({
    id,
    signer,
    provider,
    environment,
    factoryAddress,
    marginEngineAddress,
    rateOracle,
    termStartTimestamp,
    termEndTimestamp,
    underlyingToken,
    tick,
    tickSpacing
  }: BorrowAMMConstructorArgs) {
    this.id = id;
    this.signer = signer;
    this.provider = provider || signer?.provider;
    this.environment = environment;
    this.factoryAddress = factoryAddress;
    this.marginEngineAddress = marginEngineAddress;
    this.rateOracle = rateOracle;
    this.termStartTimestamp = termStartTimestamp;
    this.termEndTimestamp = termEndTimestamp;
    this.underlyingToken = underlyingToken;
    this.tickSpacing = tickSpacing;
    this.tick = tick;

    const protocolId = this.rateOracle.protocolId;
    if ( protocolId !== 6 && protocolId !== 5 ) {
        throw new Error("Not a borrow market");
    }

    if (signer) {
      if ( protocolId === 6) {
        const compoundRateOracle = ICompoundRateOracle__factory.connect(this.rateOracle.id, signer)
        const cTokenAddress = compoundRateOracle.ctoken().then( (cTokenAddress) => {
          this.cToken = cTokenFactory.connect(cTokenAddress, signer);
        });
      } else {
        const aaveRateOracle = IAaveRateOracle__factory.connect(this.rateOracle.id, signer)

        aaveRateOracle.aaveLendingPool().then( (lendingPoolAddress) => {
            const lendingPool = IAaveV2LendingPool__factory.connect(lendingPoolAddress, signer);

            if(!this.underlyingToken.id){
                throw new Error('missing underlying token address');
            }
  
            lendingPool.getReserveData(this.underlyingToken.id).then( (reserve) => {
              const variableDebtTokenAddress = reserve.variableDebtTokenAddress;
              this.aaveVariableDebtToken = IERC20Minimal__factory.connect(variableDebtTokenAddress, signer);
            });
          });
      }
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

    for (let s of position.swaps) {
      allSwaps.push({
        fDelta: BigNumber.from(s.fixedTokenDeltaUnbalanced.toString()),
        vDelta: BigNumber.from(s.variableTokenDelta.toString()),
        timestamp: BigNumber.from(s.transactionTimestamp.toString())
      })
    }

    for (let s of position.fcmSwaps) {
      allSwaps.push({
        fDelta: BigNumber.from(s.fixedTokenDeltaUnbalanced.toString()),
        vDelta: BigNumber.from(s.variableTokenDelta.toString()),
        timestamp: BigNumber.from(s.transactionTimestamp.toString())
      })
    }

    for (let s of position.fcmUnwinds) {
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
  }[], atMaturity: boolean): Promise<number> {
    if (!this.provider) {
      throw new Error('Wallet not connected');
    }

    let accruedCashflow = BigNumber.from(0);
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

      const cashflow = fixedCashflow.add(variableCashflow);
      accruedCashflow = accruedCashflow.add(cashflow);
    }

    return this.descale(accruedCashflow);
  }

  // get user's borrow balance in underlying protocol

  // public async getActualBorrowBalance(position: Position): Promise<number> {

  //   if (!this.signer) {
  //       throw new Error('Wallet not connected');
  //   }

  //   if (!this.provider) {
  //       throw new Error('Blockchain not connected');
  //   }
    
  //   const protocolId = this.rateOracle.protocolId;

  //   // last updated balance in underlying protocol
  //   let borrowBalance = BigNumber.from(0);
  //   if (this.cToken) { // compound
  //       const userAddress = await this.signer.getAddress();
  //       borrowBalance = await this.cToken.callStatic.borrowBalanceCurrent(userAddress);
  //   } else if ( this.aaveVariableDebtToken ) { // aave
  //       const userAddress = await this.signer.getAddress();
  //       borrowBalance = await this.aaveVariableDebtToken.balanceOf(userAddress);
  //   }

  //   const allSwaps = this.getAllSwaps(position);
    
  //   // is past maturity?
  //   const lastBlock = await this.provider.getBlockNumber();
  //   const lastBlockTimestamp = BigNumber.from((await this.provider.getBlock(lastBlock - 1)).timestamp);
  //   const pastMaturity = (BigNumber.from(this.termEndTimestamp.toString())).lt(lastBlockTimestamp.mul(BigNumber.from(10).pow(18)));

  //   // balance in Voltz
  //   const accruedCashFlow = await this.getAccruedCashflow(allSwaps, pastMaturity);
  //   const notional = BigNumber.from(position.marginInScaledYieldBearingTokens.toString()).toNumber();
  //   const actualBalance = this.descale(borrowBalance) - notional - accruedCashFlow;

  //   return actualBalance;

  // }
  
  public async getUnderlyingBorrowBalance(): Promise<number> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    let borrowBalance = BigNumber.from(0);
    if (this.cToken) { // compound
        const userAddress = await this.signer.getAddress();
        borrowBalance = await this.cToken.callStatic.borrowBalanceCurrent(userAddress);
    } else if ( this.aaveVariableDebtToken ) { // aave
        const userAddress = await this.signer.getAddress();
        borrowBalance = await this.aaveVariableDebtToken.balanceOf(userAddress);
    }
    return this.descale(borrowBalance);
  }

  public async getFixedBorrowBalance(position: Position): Promise<number> {
    if (!this.provider) {
      throw new Error('Blockchain not connected');
    }
  
    const allSwaps = this.getAllSwaps(position);
    
    // is past maturity?
    const lastBlock = await this.provider.getBlockNumber();
    const lastBlockTimestamp = BigNumber.from((await this.provider.getBlock(lastBlock - 1)).timestamp);
    const pastMaturity = (BigNumber.from(this.termEndTimestamp.toString())).lt(lastBlockTimestamp.mul(BigNumber.from(10).pow(18)));

    // balance in Voltz
    const accruedCashFlow = await this.getAccruedCashflow(allSwaps, pastMaturity);
    const notional = BigNumber.from(position.marginInScaledYieldBearingTokens.toString()).toNumber();
    return notional + accruedCashFlow;
  }

  // get variable debt: debt from underlying protocol - fixed debt on Voltz
  public async getAggregatedBorrowBalance(position: Position): Promise<number> {
    const fixedBorrowBalance = await this.getFixedBorrowBalance(position);
    const underlyingBorrowBalance = await this.getUnderlyingBorrowBalance();

    if (underlyingBorrowBalance >= fixedBorrowBalance) {
      return underlyingBorrowBalance - fixedBorrowBalance;
    } else {
      return 0;
    }
  }

  public getVariableBorrowBalance(aggregatedDebt: number, fixedDebt: number): number {
    return aggregatedDebt - fixedDebt;
  }
}

export default BorrowAMM;
