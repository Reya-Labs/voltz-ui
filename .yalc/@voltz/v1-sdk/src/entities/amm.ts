import JSBI from 'jsbi';
import { BigNumber, Signer } from 'ethers';

import { BigintIsh } from '../types';
import { PERIPHERY_ADDRESS, Q192 } from '../constants';
import { Price } from './fractions/price';
import { Periphery__factory, MarginEngine__factory } from '../typechain';
import { SwapPeripheryParams, MintOrBurnParams } from '../utils/interfaces';
import Token from './token';
import RateOracle from './rateOracle';

export type AMMConstructorArgs = {
  id: string;
  marginEngineAddress: string;
  fcmAddress: string;
  rateOracle: RateOracle;
  protocolName: string;
  createdTimestamp: BigintIsh;
  updatedTimestamp: BigintIsh;
  termStartTimestamp: JSBI;
  termEndTimestamp: JSBI;
  underlyingToken: Token;
  sqrtPriceX96: JSBI;
  liquidity: JSBI;
  tick: JSBI;
  tickSpacing: JSBI;
  txCount: number;
};

export type AMMGetMinimumMarginRequirementArgs = {
  signer: Signer;
  recipient: string;
  isFT: boolean;
  notional: BigNumber;
  sqrtPriceLimitX96: BigNumber;
  tickLower: number;
  tickUpper: number;
};

export type AMMUpdatePositionMarginArgs = {
  signer: Signer;
  owner: string;
  tickLower: number;
  tickUpper: number;
  marginDelta: BigNumber;
};

export type AMMSettlePositionArgs = {
  signer: Signer;
  owner: string;
  tickLower: number;
  tickUpper: number;
};

export type AMMSwapArgs = {
  signer: Signer;
  recipient: string;
  isFT: boolean;
  notional: BigNumber;
  sqrtPriceLimitX96: BigNumber;
  tickLower: 0;
  tickUpper: 0;
};

export type AMMMintOrBurnArgs = {
  signer: Signer;
  marginEngineAddress: string;
  recipient: string;
  tickLower: number;
  tickUpper: number;
  notional: BigNumber;
  isMint: boolean;
};

class AMM {
  public readonly id: string;
  public readonly marginEngineAddress: string;
  public readonly fcmAddress: string;
  public readonly rateOracle: RateOracle;
  public readonly protocolName: string;
  public readonly createdTimestamp: BigintIsh;
  public readonly updatedTimestamp: BigintIsh;
  public readonly termStartTimestamp: JSBI;
  public readonly termEndTimestamp: JSBI;
  public readonly underlyingToken: Token;
  public readonly sqrtPriceX96: JSBI;
  public readonly liquidity: JSBI;
  public readonly tickSpacing: JSBI;
  public readonly tick: JSBI;
  public readonly txCount: number;
  private _fixedRate?: Price;
  private _price?: Price;

  public constructor({
    id,
    marginEngineAddress,
    fcmAddress,
    rateOracle,
    protocolName,
    createdTimestamp,
    updatedTimestamp,
    termStartTimestamp,
    termEndTimestamp,
    underlyingToken,
    sqrtPriceX96,
    liquidity,
    tick,
    tickSpacing,
    txCount,
  }: AMMConstructorArgs) {
    this.id = id;
    this.marginEngineAddress = marginEngineAddress;
    this.fcmAddress = fcmAddress;
    this.rateOracle = rateOracle;
    this.protocolName = protocolName;
    this.createdTimestamp = createdTimestamp;
    this.updatedTimestamp = updatedTimestamp;
    this.termStartTimestamp = termStartTimestamp;
    this.termEndTimestamp = termEndTimestamp;
    this.underlyingToken = underlyingToken;
    this.sqrtPriceX96 = JSBI.BigInt(sqrtPriceX96);
    this.liquidity = JSBI.BigInt(liquidity);
    this.tickSpacing = tickSpacing;
    this.tick = tick;
    this.txCount = txCount;
  }

  public async getMinimumMarginRequirement({
    signer,
    recipient,
    isFT,
    notional,
    sqrtPriceLimitX96,
    tickLower,
    tickUpper,
  }: AMMGetMinimumMarginRequirementArgs) {
    const peripheryContract = Periphery__factory.connect(PERIPHERY_ADDRESS, signer);
    const marginEngineAddress: string = this.marginEngineAddress;

    const swapPeripheryParams: SwapPeripheryParams = {
      marginEngineAddress,
      recipient,
      isFT,
      notional,
      sqrtPriceLimitX96,
      tickLower,
      tickUpper,
    };

    let marginRequirement: BigNumber = BigNumber.from(0);

    await peripheryContract.callStatic.swap(swapPeripheryParams).then(
      async (result: any) => {
        marginRequirement = result[4];
      },
      (error) => {
        if (error.message.includes('MarginRequirementNotMet')) {
          const args: string[] = error.message
            .split('(')[1]
            .split(')')[0]
            .replaceAll(' ', '')
            .split(',');

          marginRequirement = BigNumber.from(args[0]);
        } else {
          console.error(error.message);
        }
      },
    );

    return marginRequirement;
  }

  public async settlePosition({ signer, owner, tickLower, tickUpper }: AMMSettlePositionArgs) {
    const marginEngineContract = MarginEngine__factory.connect(this.marginEngineAddress, signer);
    const settlePositionReceipt = await marginEngineContract.settlePosition(
      tickLower,
      tickUpper,
      owner,
    );
    return settlePositionReceipt;
  }

  public async updatePositionMargin({
    signer,
    owner,
    tickLower,
    tickUpper,
    marginDelta,
  }: AMMUpdatePositionMarginArgs) {
    const marginEngineContract = MarginEngine__factory.connect(this.marginEngineAddress, signer);
    const updatePositionMarginReceipt = await marginEngineContract.updatePositionMargin(
      owner,
      tickLower,
      tickUpper,
      marginDelta,
    );

    return updatePositionMarginReceipt;
  }

  public async mintOrBurn({
    signer,
    recipient,
    tickLower,
    tickUpper,
    notional,
    isMint,
  }: AMMMintOrBurnArgs) {
    const peripheryContract = Periphery__factory.connect(PERIPHERY_ADDRESS, signer);
    const marginEngineAddress: string = this.marginEngineAddress;

    const mintOrBurnParams: MintOrBurnParams = {
      marginEngineAddress,
      recipient,
      tickLower,
      tickUpper,
      notional,
      isMint,
    };

    const mintOrBurnReceipt = await peripheryContract.mintOrBurn(mintOrBurnParams);

    return mintOrBurnReceipt;
  }

  public async swap({
    signer,
    recipient,
    isFT,
    notional,
    sqrtPriceLimitX96,
    tickLower = 0,
    tickUpper = 0,
  }: AMMSwapArgs) {
    const peripheryContract = Periphery__factory.connect(PERIPHERY_ADDRESS, signer);
    const marginEngineAddress: string = this.marginEngineAddress;

    const swapPeripheryParams: SwapPeripheryParams = {
      marginEngineAddress,
      recipient,
      isFT,
      notional,
      sqrtPriceLimitX96,
      tickLower,
      tickUpper,
    };
    const swapReceipt = await peripheryContract.swap(swapPeripheryParams);

    return swapReceipt;
  }

  public get fixedRate(): Price {
    return (
      this._fixedRate ??
      (this._fixedRate = new Price(JSBI.multiply(this.sqrtPriceX96, this.sqrtPriceX96), Q192))
    );
  }

  public get price(): Price {
    return (
      this._price ??
      (this._price = new Price(Q192, JSBI.multiply(this.sqrtPriceX96, this.sqrtPriceX96)))
    );
  }
}

export default AMM;
