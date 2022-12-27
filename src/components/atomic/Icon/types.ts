import { ElementType } from 'react';

import {
  _0BCMellowLpVault,
  ArrowLeft,
  ArrowRight,
  BeWaterMyFriend,
  Burn,
  DegenStuff,
  DeltaDegen,
  Diplomatz,
  DryIce,
  Ethereum,
  FixedTrader,
  Governorz,
  InformationCircle,
  IrsConnoisseur,
  LeverageCrowbar,
  Liquidation,
  Lpoor,
  MarginUpdate,
  MaxBidding,
  MellowLpVault,
  MellowLpVaultTier1,
  MellowLpVaultTier2,
  MellowLpVaultTier3,
  Metamask,
  Mint,
  MoneyMoneyMoney,
  NoClaimedBadges,
  NotionalInfluencer,
  OGBeWaterMyFriend,
  OGDegenStuff,
  OGDeltaDegen,
  OGDryIce,
  OGFixedTrader,
  OGIrsConnoisseur,
  OGLeverageCrowbar,
  OGLpoor,
  OGMaxBidding,
  OGMoneyMoneyMoney,
  OGOkBoomer,
  OGRainmaker,
  OGSushiRoll,
  OGTopTrader,
  OGWaterHose,
  OGYikes,
  OkBoomer,
  Rainmaker,
  Referror,
  S2BeWaterMyFriend,
  S2DegenStuff,
  S2DeltaDegen,
  S2FixedTrader,
  S2IrsConnoisseur,
  S2LeverageCrowbar,
  S2Lpoor,
  S2MaxBidding,
  S2MellowLpVaultTier1,
  S2MellowLpVaultTier2,
  S2MellowLpVaultTier3,
  S2MoneyMoneyMoney,
  S2Rainmaker,
  S2SushiRoll,
  S2TopTrader,
  S2WaterHose,
  S2Yikes,
  Senatorz,
  Settle,
  SushiRoll,
  Swap,
  TokenDai,
  TokenEth,
  TokenLido,
  TokenUsdc,
  TokenUsdt,
  TopTrader,
  Voltz,
  WalletConnect,
  WarningCircle,
  WaterHose,
  WhaleWhisperer,
  Yikes,
} from './icons';

export type SupportedIcons =
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
  // badges
  | 'noClaimedBadges'
  // season 1 badges
  | 'degenStuff'
  | 'deltaDegen'
  | 'irsConnoisseur'
  | 'leverageCrowbar'
  | 'fixedTrader'
  | 'sushiRoll'
  | 'topTrader'
  | 'beWaterMyFriend'
  | 'rainMaker'
  | 'waterHose'
  | 'moneyMoneyMoney'
  | 'lpoor'
  | 'yikes'
  | 'maxBidding'
  | 'dryIce'
  | 'okBoomer'
  | 'mellowLpVault'
  | 'mellowLpVaultTier1'
  | 'mellowLpVaultTier2'
  | 'mellowLpVaultTier3'
  | '0BCMellowLpVault'
  // season OG badges
  | 'ogDegenStuff'
  | 'ogDeltaDegen'
  | 'ogIrsConnoisseur'
  | 'ogLeverageCrowbar'
  | 'ogFixedTrader'
  | 'ogSushiRoll'
  | 'ogTopTrader'
  | 'ogBeWaterMyFriend'
  | 'ogRainMaker'
  | 'ogWaterHose'
  | 'ogMoneyMoneyMoney'
  | 'ogLpoor'
  | 'ogYikes'
  | 'ogMaxBidding'
  | 'ogDryIce'
  | 'ogOkBoomer'
  // season1, season2 & og non-programmatic badges
  | 'senatorz'
  | 'governorz'
  | 'diplomatz'
  | 'whaleWhisperer'
  | 'notionalInfluencer'
  | 'referror'
  // season 2 badges
  | 's2DegenStuff'
  | 's2DeltaDegen'
  | 's2IrsConnoisseur'
  | 's2LeverageCrowbar'
  | 's2FixedTrader'
  | 's2SushiRoll'
  | 's2TopTrader'
  | 's2BeWaterMyFriend'
  | 's2RainMaker'
  | 's2WaterHose'
  | 's2MoneyMoneyMoney'
  | 's2Lpoor'
  | 's2Yikes'
  | 's2MaxBidding'
  | 's2MellowLpVaultTier1'
  | 's2MellowLpVaultTier2'
  | 's2MellowLpVaultTier3';

export const iconMap: Record<SupportedIcons, ElementType> = {
  'arrow-left': ArrowLeft as ElementType,
  'arrow-right': ArrowRight as ElementType,
  ethereum: Ethereum as ElementType,
  'information-circle': InformationCircle as ElementType,
  metamask: Metamask as ElementType,
  voltz: Voltz as ElementType,
  walletConnect: WalletConnect as ElementType,
  'warning-circle': WarningCircle as ElementType,
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
  // badges
  noClaimedBadges: NoClaimedBadges as ElementType,
  // badges season 1
  degenStuff: DegenStuff as ElementType,
  deltaDegen: DeltaDegen as ElementType,
  irsConnoisseur: IrsConnoisseur as ElementType,
  leverageCrowbar: LeverageCrowbar as ElementType,
  fixedTrader: FixedTrader as ElementType,
  sushiRoll: SushiRoll as ElementType,
  topTrader: TopTrader as ElementType,
  beWaterMyFriend: BeWaterMyFriend as ElementType,
  rainMaker: Rainmaker as ElementType,
  waterHose: WaterHose as ElementType,
  moneyMoneyMoney: MoneyMoneyMoney as ElementType,
  lpoor: Lpoor as ElementType,
  yikes: Yikes as ElementType,
  maxBidding: MaxBidding as ElementType,
  okBoomer: OkBoomer as ElementType,
  dryIce: DryIce as ElementType,
  mellowLpVault: MellowLpVault as ElementType,
  mellowLpVaultTier1: MellowLpVaultTier1 as ElementType,
  mellowLpVaultTier2: MellowLpVaultTier2 as ElementType,
  mellowLpVaultTier3: MellowLpVaultTier3 as ElementType,
  '0BCMellowLpVault': _0BCMellowLpVault as ElementType,

  // badges season OG
  ogDegenStuff: OGDegenStuff as ElementType,
  ogDeltaDegen: OGDeltaDegen as ElementType,
  ogIrsConnoisseur: OGIrsConnoisseur as ElementType,
  ogLeverageCrowbar: OGLeverageCrowbar as ElementType,
  ogFixedTrader: OGFixedTrader as ElementType,
  ogSushiRoll: OGSushiRoll as ElementType,
  ogTopTrader: OGTopTrader as ElementType,
  ogBeWaterMyFriend: OGBeWaterMyFriend as ElementType,
  ogRainMaker: OGRainmaker as ElementType,
  ogWaterHose: OGWaterHose as ElementType,
  ogMoneyMoneyMoney: OGMoneyMoneyMoney as ElementType,
  ogLpoor: OGLpoor as ElementType,
  ogYikes: OGYikes as ElementType,
  ogMaxBidding: OGMaxBidding as ElementType,
  ogOkBoomer: OGOkBoomer as ElementType,
  ogDryIce: OGDryIce as ElementType,
  // season1, season2 & og non-programmatic badges
  senatorz: Senatorz as ElementType,
  diplomatz: Diplomatz as ElementType,
  governorz: Governorz as ElementType,
  notionalInfluencer: NotionalInfluencer as ElementType,
  referror: Referror as ElementType,
  whaleWhisperer: WhaleWhisperer as ElementType,
  // season2 badges
  s2DegenStuff: S2DegenStuff as ElementType,
  s2DeltaDegen: S2DeltaDegen as ElementType,
  s2IrsConnoisseur: S2IrsConnoisseur as ElementType,
  s2LeverageCrowbar: S2LeverageCrowbar as ElementType,
  s2FixedTrader: S2FixedTrader as ElementType,
  s2SushiRoll: S2SushiRoll as ElementType,
  s2TopTrader: S2TopTrader as ElementType,
  s2BeWaterMyFriend: S2BeWaterMyFriend as ElementType,
  s2RainMaker: S2Rainmaker as ElementType,
  s2WaterHose: S2WaterHose as ElementType,
  s2MoneyMoneyMoney: S2MoneyMoneyMoney as ElementType,
  s2Lpoor: S2Lpoor as ElementType,
  s2Yikes: S2Yikes as ElementType,
  s2MaxBidding: S2MaxBidding as ElementType,
  s2MellowLpVaultTier1: S2MellowLpVaultTier1 as ElementType,
  s2MellowLpVaultTier2: S2MellowLpVaultTier2 as ElementType,
  s2MellowLpVaultTier3: S2MellowLpVaultTier3 as ElementType,
};
