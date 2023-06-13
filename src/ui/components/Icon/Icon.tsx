import React from 'react';

import { iconMap, SupportedIcons } from './types';

type IconProps = {
  name: SupportedIcons;
  className?: string;
  'data-testid'?: string;
};

const VIEW_BOX_ICON_MAP: Record<SupportedIcons, string> = {
  'alpha-pass': '',
  s3BeWaterMyFriend: '',
  s3BeWaterMyFriendArbitrum: '',
  s3DegenStuff: '',
  s3DegenStuffArbitrum: '',
  s3DeltaDegen: '',
  s3DeltaDegenArbitrum: '',
  s3FixedTrader: '',
  s3FixedTraderArbitrum: '',
  s3IrsConnoisseur: '',
  s3IrsConnoisseurArbitrum: '',
  s3LeverageCrowbar: '',
  s3LeverageCrowbarArbitrum: '',
  s3Lpoor: '',
  s3LpoorArbitrum: '',
  s3MaxBidding: '',
  s3MaxBiddingArbitrum: '',
  s3MoneyMoneyMoney: '',
  s3MoneyMoneyMoneyArbitrum: '',
  s3RainMaker: '',
  s3RainMakerArbitrum: '',
  s3SushiRoll: '',
  s3SushiRollArbitrum: '',
  s3TopTrader: '',
  s3TopTraderArbitrum: '',
  s3WaterHose: '',
  s3WaterHoseArbitrum: '',
  s3Yikes: '',
  s3YikesArbitrum: '',
  voyageWeek1: '',
  noClaimedBadges: '0 0 459 459',
  degenStuff: '0 0 459 459',
  deltaDegen: '0 0 459 459',
  irsConnoisseur: '0 0 459 459',
  leverageCrowbar: '0 0 459 459',
  fixedTrader: '0 0 459 459',
  sushiRoll: '0 0 459 459',
  topTrader: '0 0 459 459',
  beWaterMyFriend: '0 0 459 459',
  rainMaker: '0 0 459 459',
  waterHose: '0 0 459 459',
  moneyMoneyMoney: '0 0 459 459',
  lpoor: '0 0 459 459',
  yikes: '0 0 459 459',
  maxBidding: '0 0 459 459',
  okBoomer: '0 0 459 459',
  dryIce: '0 0 459 459',
  mellowLpVault: '0 0 459 459',
  mellowLpVaultTier1: '0 0 459 459',
  mellowLpVaultTier2: '0 0 459 459',
  mellowLpVaultTier3: '0 0 459 459',
  '0BCMellowLpVault': '0 0 459 459',
  ogDegenStuff: '0 0 459 459',
  ogDeltaDegen: '0 0 459 459',
  ogIrsConnoisseur: '0 0 459 459',
  ogLeverageCrowbar: '0 0 459 459',
  ogFixedTrader: '0 0 459 459',
  ogSushiRoll: '0 0 459 459',
  ogTopTrader: '0 0 459 459',
  ogBeWaterMyFriend: '0 0 459 459',
  ogRainMaker: '0 0 459 459',
  ogWaterHose: '0 0 459 459',
  ogMoneyMoneyMoney: '0 0 459 459',
  ogLpoor: '0 0 459 459',
  ogYikes: '0 0 459 459',
  ogMaxBidding: '0 0 459 459',
  ogOkBoomer: '0 0 459 459',
  ogDryIce: '0 0 459 459',
  s2DegenStuff: '0 0 459 459',
  s2DeltaDegen: '0 0 459 459',
  s2IrsConnoisseur: '0 0 459 459',
  s2LeverageCrowbar: '0 0 459 459',
  s2FixedTrader: '0 0 459 459',
  s2SushiRoll: '0 0 459 459',
  s2TopTrader: '0 0 459 459',
  s2BeWaterMyFriend: '0 0 459 459',
  s2RainMaker: '0 0 459 459',
  s2WaterHose: '0 0 459 459',
  s2MoneyMoneyMoney: '0 0 459 459',
  s2Lpoor: '0 0 459 459',
  s2Yikes: '0 0 459 459',
  s2MaxBidding: '0 0 459 459',
  s2MellowLpVaultTier1: '0 0 459 459',
  s2MellowLpVaultTier2: '0 0 459 459',
  s2MellowLpVaultTier3: '0 0 459 459',
  s3MellowLpVaultTier1: '0 0 459 459',
  s3MellowLpVaultTier2: '0 0 459 459',
  s3MellowLpVaultTier3: '0 0 459 459',
  s3MellowLpVaultTier1Arbitrum: '0 0 459 459',
  s3MellowLpVaultTier2Arbitrum: '0 0 459 459',
  s3MellowLpVaultTier3Arbitrum: '0 0 459 459',
  diplomatz: '0 0 459 459',
  governorz: '0 0 459 459',
  senatorz: '0 0 459 459',
  notionalInfluencer: '0 0 459 459',
  referror: '0 0 459 459',
  whaleWhisperer: '0 0 459 459',
  voyageWeek3: '0 0 447 336',
  voyageWeek2: '0 0 459 337',
  voyageWeek4: '0 0 459 357',
};

export const Icon: React.FunctionComponent<IconProps> = ({
  'data-testid': dataTestId,
  name,
  className,
}) => {
  const SupportedIcon = iconMap[name];

  if (!SupportedIcon) {
    return null;
  }

  return (
    <SupportedIcon
      className={className}
      data-testid={dataTestId || `Icon-${name}`}
      viewBox={VIEW_BOX_ICON_MAP[name]}
    />
  );
};
