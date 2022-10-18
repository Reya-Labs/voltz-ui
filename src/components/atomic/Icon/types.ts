import { ElementType } from 'react';

import {
  ArrowLeft,
  ArrowRight,
  Burn,
  DegenStuff,
  DeltaDegen,
  Ethereum,
  InterfaceAlertInformationCircle,
  InterfaceAlertWarningCircle,
  IrsConnoisseur,
  LeverageCrowbar,
  Liquidation,
  MarginUpdate,
  Metamask,
  Mint,
  NoRiskHereSer,
  Settle,
  SushiRoll,
  Swap,
  TokenDai,
  TokenEth,
  TokenLido,
  TokenUsdc,
  TokenUsdt,
  Voltz,
  WalletConnect,
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
  seasonedTrader: DegenStuff as ElementType,
  beWaterMyFriend: DegenStuff as ElementType,
  rainMaker: DegenStuff as ElementType,
  waterHose: DegenStuff as ElementType,
  moneyMoneyMoney: DegenStuff as ElementType,
  lpoor: DegenStuff as ElementType,
  sugarDaddy: DegenStuff as ElementType,
  maxBidding: DegenStuff as ElementType,
  okBoomer: DegenStuff as ElementType,
};
