import { ElementType } from 'react';

import {
  ArrowLeft,
  ArrowRight,
  BeWaterMyFriend,
  Burn,
  DegenStuff,
  DeltaDegen,
  DryIce,
  Ethereum,
  InterfaceAlertInformationCircle,
  InterfaceAlertWarningCircle,
  IrsConnoisseur,
  LeverageCrowbar,
  Liquidation,
  Lpoor,
  MarginUpdate,
  MaxBidding,
  Metamask,
  Mint,
  MoneyMoneyMoney,
  NoClaimedBadges,
  NoRiskHereSer,
  OkBoomer,
  Rainmaker,
  SeasonedTrader,
  Settle,
  SugarDaddy,
  SushiRoll,
  Swap,
  TokenDai,
  TokenEth,
  TokenLido,
  TokenUsdc,
  TokenUsdt,
  Voltz,
  WalletConnect,
  WaterHose,
} from './icons';

export type Icons =
  | 'arrow-left'
  | 'arrow-right'
  | 'ethereum'
  | 'information-circle'
  | 'metamask'
  | 'token-dai'
  | 'token-eth'
  | 'token-lido'
  | 'token-usdc'
  | 'token-usdt'
  | 'tx-burn'
  | 'tx-liquidation'
  | 'tx-margin-update'
  | 'tx-mint'
  | 'tx-settle'
  | 'tx-swap'
  | 'voltz'
  | 'walletConnect'
  | 'warning-circle'
  | 'degenStuff'
  | 'deltaDegen'
  | 'irsConnoisseur'
  | 'leverageCrowbar'
  | 'noRiskHereSer'
  | 'sushiRoll'
  | 'seasonedTrader'
  | 'beWaterMyFriend'
  | 'rainMaker'
  | 'waterHose'
  | 'moneyMoneyMoney'
  | 'lpoor'
  | 'sugarDaddy'
  | 'maxBidding'
  | 'dryIce'
  | 'noClaimedBadges'
  | 'okBoomer';

export const iconMap: Record<Icons, ElementType> = {
  'arrow-left': ArrowLeft as ElementType,
  'arrow-right': ArrowRight as ElementType,
  ethereum: Ethereum as ElementType,
  'information-circle': InterfaceAlertInformationCircle as ElementType,
  metamask: Metamask as ElementType,
  voltz: Voltz as ElementType,
  walletConnect: WalletConnect as ElementType,
  'warning-circle': InterfaceAlertWarningCircle as ElementType,
  'token-dai': TokenDai as ElementType,
  'token-eth': TokenEth as ElementType,
  'token-lido': TokenLido as ElementType,
  'token-usdc': TokenUsdc as ElementType,
  'token-usdt': TokenUsdt as ElementType,
  'tx-burn': Burn as ElementType,
  'tx-liquidation': Liquidation as ElementType,
  'tx-margin-update': MarginUpdate as ElementType,
  'tx-mint': Mint as ElementType,
  'tx-settle': Settle as ElementType,
  'tx-swap': Swap as ElementType,
  degenStuff: DegenStuff as ElementType,
  deltaDegen: DeltaDegen as ElementType,
  irsConnoisseur: IrsConnoisseur as ElementType,
  leverageCrowbar: LeverageCrowbar as ElementType,
  noRiskHereSer: NoRiskHereSer as ElementType,
  sushiRoll: SushiRoll as ElementType,
  seasonedTrader: SeasonedTrader as ElementType,
  beWaterMyFriend: BeWaterMyFriend as ElementType,
  rainMaker: Rainmaker as ElementType,
  waterHose: WaterHose as ElementType,
  moneyMoneyMoney: MoneyMoneyMoney as ElementType,
  lpoor: Lpoor as ElementType,
  sugarDaddy: SugarDaddy as ElementType,
  maxBidding: MaxBidding as ElementType,
  okBoomer: OkBoomer as ElementType,
  dryIce: DryIce as ElementType,
  noClaimedBadges: NoClaimedBadges as ElementType,
};
