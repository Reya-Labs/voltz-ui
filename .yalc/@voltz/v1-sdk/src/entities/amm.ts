import JSBI from 'jsbi';
import { DateTime } from 'luxon';
import { BigNumber, BigNumberish, ContractTransaction, Signer } from 'ethers';

import { BigIntish, SwapPeripheryParams, MintOrBurnParams } from '../types';
import { Q192, PERIPHERY_ADDRESS, FACTORY_ADDRESS } from '../constants';
import { Price } from './fractions/price';
import {
  Periphery__factory as peripheryFactory,
  MarginEngine__factory as marginEngineFactory,
  VAMM__factory as vammFactory,
  Factory__factory as factoryFactory,
  // todo: not very elegant to use the mock as a factory
  ERC20Mock__factory as tokenFactory
} from '../typechain';
import Token from './token';
import RateOracle from './rateOracle';
import { TickMath } from '../utils/tickMath';
import timestampWadToDateTime from '../utils/timestampWadToDateTime';
import { fixedRateToClosestTick, tickToFixedRate } from '../utils/priceTickConversions';
import { nearestUsableTick } from '../utils/nearestUsableTick';
import { Position } from '.';

export type AMMConstructorArgs = {
  id: string;
  signer: Signer | null;
  marginEngineAddress: string;
  fcmAddress: string;
  rateOracle: RateOracle;
  createdTimestamp: BigIntish;
  updatedTimestamp: BigIntish;
  termStartTimestamp: BigIntish;
  termEndTimestamp: BigIntish;
  underlyingToken: Token;
  sqrtPriceX96: BigIntish;
  liquidity: BigIntish;
  tick: BigIntish;
  tickSpacing: BigIntish;
  txCount: number;
};

export type AMMGetMinimumMarginRequirementArgs = {
  recipient: string;
  isFT: boolean;
  notional: BigNumberish;
  sqrtPriceLimitX96: BigNumberish;
  tickLower: BigNumberish;
  tickUpper: BigNumberish;
};

export type AMMUpdatePositionMarginArgs = {
  owner: string;
  tickLower: BigNumberish;
  tickUpper: BigNumberish;
  marginDelta: BigNumberish;
};

export type AMMSettlePositionArgs = {
  owner: string;
  tickLower: BigNumberish;
  tickUpper: BigNumberish;
};

export type AMMSwapArgs = {
  recipient: string;
  isFT: boolean;
  notional: BigNumberish;
  sqrtPriceLimitX96: BigNumberish;
  tickLower: 0;
  tickUpper: 0;
};

export type AMMMintOrBurnArgs = {
  recipient: string;
  fixedLow: number;
  fixedHigh: number;
  margin: number;
  leverage: number;
};

export type AMMMintOrBurnUsingTicksArgs = {
  recipient: string;
  tickLower: BigNumberish;
  tickUpper: BigNumberish;
  notional: BigNumberish;
  isMint: boolean;
};

export type ClosestTickAndFixedRate = {
  closestUsableTick: number;
  closestUsableFixedRate: Price;
}

class AMM {
  public readonly id: string;
  public readonly signer: Signer | null;
  public readonly marginEngineAddress: string;
  public readonly fcmAddress: string;
  public readonly rateOracle: RateOracle;
  public readonly createdTimestamp: JSBI;
  public readonly updatedTimestamp: JSBI;
  public readonly termStartTimestamp: JSBI;
  public readonly termEndTimestamp: JSBI;
  public readonly underlyingToken: Token;
  public readonly sqrtPriceX96: JSBI;
  public readonly liquidity: JSBI;
  public readonly tickSpacing: JSBI;
  public readonly tick: JSBI;
  public readonly txCount: JSBI;
  private _fixedRate?: Price;
  private _price?: Price;

  public constructor({
    id,
    signer,
    marginEngineAddress,
    fcmAddress,
    rateOracle,
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
    this.signer = signer;
    this.marginEngineAddress = marginEngineAddress;
    this.fcmAddress = fcmAddress;
    this.rateOracle = rateOracle;
    this.createdTimestamp = JSBI.BigInt(createdTimestamp);
    this.updatedTimestamp = JSBI.BigInt(updatedTimestamp);
    this.termStartTimestamp = JSBI.BigInt(termStartTimestamp);
    this.termEndTimestamp = JSBI.BigInt(termEndTimestamp);
    this.underlyingToken = underlyingToken;
    this.sqrtPriceX96 = JSBI.BigInt(sqrtPriceX96);
    this.liquidity = JSBI.BigInt(liquidity);
    this.tickSpacing = JSBI.BigInt(tickSpacing);
    this.tick = JSBI.BigInt(tick);
    this.txCount = JSBI.BigInt(txCount);
  }

  public async getMinimumMarginRequirementPostSwap({
    recipient,
    isFT,
    notional,
    sqrtPriceLimitX96,
    tickLower,
    tickUpper,
  }: AMMGetMinimumMarginRequirementArgs) : Promise<BigNumber | void> {
    if (!this.signer) {
      return;
    }

    const peripheryContract = peripheryFactory.connect(PERIPHERY_ADDRESS, this.signer);
    const swapPeripheryParams: SwapPeripheryParams = {
      marginEngineAddress: this.marginEngineAddress,
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

  public async settlePosition({ owner, tickLower, tickUpper }: AMMSettlePositionArgs) : Promise<ContractTransaction | void>  {
    if (!this.signer) {
      return;
    }

    const marginEngineContract = marginEngineFactory.connect(this.marginEngineAddress, this.signer);
    const settlePositionReceipt = await marginEngineContract.settlePosition(
      tickLower,
      tickUpper,
      owner,
    );
    return settlePositionReceipt;
  }

  public async updatePositionMargin({
    owner,
    tickLower,
    tickUpper,
    marginDelta,
  }: AMMUpdatePositionMarginArgs) : Promise<ContractTransaction | void>  {
    if (!this.signer) {
      return;
    }

    // approve the margin engine 
    await this.approveMarginEngine(marginDelta);

    tickLower = parseInt(tickLower.toString())
    tickUpper = parseInt(tickUpper.toString())

    const marginEngineContract = marginEngineFactory.connect(this.marginEngineAddress, this.signer);
    const updatePositionMarginReceipt = await marginEngineContract.updatePositionMargin(
      owner,
      tickLower,
      tickUpper,
      marginDelta,
    );

    return updatePositionMarginReceipt;
  }
  
  public async mint({ recipient, fixedLow, fixedHigh, margin, leverage }: AMMMintOrBurnArgs): Promise<ContractTransaction | void> {
    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    return this.mintUsingTicks({
      recipient,
      tickLower,
      tickUpper,
      notional: margin * leverage,
    });
  }

  public async mintUsingTicks({ tickLower, ...args }: Omit<AMMMintOrBurnUsingTicksArgs, 'isMint'>): Promise<ContractTransaction | void> {
    if (!this.signer) {
      return;
    }

    const vammContract = vammFactory.connect(this.id, this.signer);

    if (JSBI.EQ(this.sqrtPriceX96, JSBI.BigInt(0))) {
      await vammContract.initializeVAMM(TickMath.getSqrtRatioAtTick(BigNumber.from(tickLower).toNumber()).toString())
    }

    return this.mintOrBurnUsingTicks({ ...args, tickLower, isMint: true });
  }

  public async burn({ recipient, fixedLow, fixedHigh, margin, leverage }: AMMMintOrBurnArgs): Promise<ContractTransaction | void> {
    const { closestUsableTick: tickUpper } = this.closestTickAndFixedRate(fixedLow);
    const { closestUsableTick: tickLower } = this.closestTickAndFixedRate(fixedHigh);

    return this.burnUsingTicks({
      recipient,
      tickLower,
      tickUpper,
      notional: margin * leverage,
    });
  }

  public async burnUsingTicks(args: Omit<AMMMintOrBurnUsingTicksArgs, 'isMint'>): Promise<ContractTransaction | void> {
    return this.mintOrBurnUsingTicks({ ...args, isMint: false });
  }

  public async mintOrBurnUsingTicks({
    recipient,
    tickLower,
    tickUpper,
    notional,
    isMint,
  }: AMMMintOrBurnUsingTicksArgs) : Promise<ContractTransaction | void> {
    if (!this.signer) {
      return;
    }

    await this.approvePeriphery()

    const peripheryContract = peripheryFactory.connect(PERIPHERY_ADDRESS, this.signer);
    const mintOrBurnParams: MintOrBurnParams = {
      marginEngineAddress: this.marginEngineAddress,
      recipient,
      tickLower,
      tickUpper,
      notional,
      isMint,
    };

    return peripheryContract.mintOrBurn(mintOrBurnParams);
  }

  public async approvePeriphery(): Promise<ContractTransaction | void> {

    if (!this.signer) {
      return;
    }

    const factoryContract = factoryFactory.connect(FACTORY_ADDRESS, this.signer);
    const signerAddress = await this.signer.getAddress();

    // check if already approved
    const isApproved = await factoryContract.isApproved(signerAddress, PERIPHERY_ADDRESS);

    if (!isApproved) {
      return await factoryContract.setApproval(PERIPHERY_ADDRESS, true);
    } else {
      return;
    }

  }

  public async approveMarginEngine(
    marginDelta: BigNumberish
  ) {

    if (!this.signer) {
      return;
    }

    if (!this.underlyingToken.id) {
      return;
    }

    const token = tokenFactory.connect(this.underlyingToken.id, this.signer);

    await token.approve(this.marginEngineAddress, marginDelta);

  }

  public async swap({
    recipient,
    isFT,
    notional,
    sqrtPriceLimitX96,
    tickLower = 0,
    tickUpper = 0,
  }: AMMSwapArgs): Promise<ContractTransaction | void> {
    if (!this.signer) {
      return;
    }

    if (sqrtPriceLimitX96.toString() === "0") {

      if (isFT) {
        sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK - 1).toString()
      } else {
        sqrtPriceLimitX96 = TickMath.getSqrtRatioAtTick(TickMath.MIN_TICK + 1).toString()
      }

    }

    await this.approvePeriphery()

    const peripheryContract = peripheryFactory.connect(PERIPHERY_ADDRESS, this.signer);
    const swapPeripheryParams: SwapPeripheryParams = {
      marginEngineAddress: this.marginEngineAddress,
      recipient,
      isFT,
      notional,
      sqrtPriceLimitX96,
      tickLower,
      tickUpper,
    };

    return peripheryContract.swap(swapPeripheryParams);
  }

  public get startDateTime(): DateTime {
    return timestampWadToDateTime(this.termStartTimestamp);
  }

  public get endDateTime(): DateTime {
    return timestampWadToDateTime(this.termEndTimestamp);
  }

  public get fixedRate(): Price {
    if (!this._fixedRate) {
      this._fixedRate = new Price(JSBI.multiply(this.sqrtPriceX96, this.sqrtPriceX96), Q192);
    }

    return this._fixedRate;
  }

  public get fixedApr(): number {
    return parseInt(this.fixedRate.toFixed(2));
  }

  public get price(): Price {
    if (!this._price) {
      this._price = new Price(Q192, JSBI.multiply(this.sqrtPriceX96, this.sqrtPriceX96));
    }

    return this._price;
  }

  public get variableApr(): number {
    return 0;
  }

  public get protocol(): string {
    const firstProtocolCharacter = this.rateOracle.protocol[0];
    const tokenName = this.underlyingToken.name;

    return `${firstProtocolCharacter.toLowerCase()}${tokenName}`;
  }

  public closestTickAndFixedRate(fixedRate: number): ClosestTickAndFixedRate {
    const fixedRatePrice = Price.fromNumber(fixedRate);
    const closestTick: number = fixedRateToClosestTick(fixedRatePrice);
    const closestUsableTick: number = nearestUsableTick(closestTick, JSBI.toNumber(this.tickSpacing))
    const closestUsableFixedRate: Price = tickToFixedRate(closestUsableTick)

    return {
      closestUsableTick,
      closestUsableFixedRate,
    };
  }
}

export default AMM;
