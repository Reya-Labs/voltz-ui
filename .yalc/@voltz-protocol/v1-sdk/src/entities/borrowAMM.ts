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
import AMM from './amm';


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
  public readonly amm?: AMM;

  public cToken?: ICToken;
  public aaveVariableDebtToken?: IERC20Minimal;

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
    if ( protocolId !== 2 && protocolId !== 1 ) {
        throw new Error("Not a borrow market");
    }

    if (this.signer) {
      if ( protocolId === 2) {
        const compoundRateOracle = ICompoundRateOracle__factory.connect(this.rateOracle.id, this.signer)
        compoundRateOracle.ctoken().then( (cTokenAddress) => {
          if (this.signer !== null) {
          this.cToken = cTokenFactory.connect(cTokenAddress, this.signer);
          }
        });
      } else {
        const aaveRateOracle = IAaveRateOracle__factory.connect(this.rateOracle.id, this.signer)

        aaveRateOracle.aaveLendingPool().then( (lendingPoolAddress) => {
          if (this.signer !== null) {
            const lendingPool = IAaveV2LendingPool__factory.connect(lendingPoolAddress, this.signer);
            if(!this.underlyingToken.id){
              throw new Error('missing underlying token address');
            }
            lendingPool.getReserveData(this.underlyingToken.id).then( (reserve) => {
              const variableDebtTokenAddress = reserve.variableDebtTokenAddress;
              if (this.signer !== null) {
                this.aaveVariableDebtToken = IERC20Minimal__factory.connect(variableDebtTokenAddress, this.signer);
              }
            });
          }
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
        borrowBalance = await this.cToken.callStatic.borrowBalanceCurrent("0xc2eb6539e4b351c08c268844cf1bcf44b1ea7494");
    } else if ( this.aaveVariableDebtToken ) { // aave
        const userAddress = await this.signer.getAddress();
        borrowBalance = await this.aaveVariableDebtToken.balanceOf(userAddress);
    }
    return this.descale(borrowBalance);
  }

  public async getFixedBorrowBalance(position: Position): Promise<number> {
    if(position === undefined){
      return 0;
    }

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
    const notional = this.descale(BigNumber.from(position.variableTokenBalance.toString()));
    return notional + accruedCashFlow;
  }

  // get variable debt: debt from underlying protocol - fixed debt on Voltz
  public async getAggregatedBorrowBalance(position: Position): Promise<number> {
    const fixedBorrowBalance = await this.getFixedBorrowBalance(position);
    const underlyingBorrowBalance = await this.getUnderlyingBorrowBalance();

      return underlyingBorrowBalance - fixedBorrowBalance;
  }

}

export default BorrowAMM;
