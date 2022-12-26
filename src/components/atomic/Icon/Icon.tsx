import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import React from 'react';

import { SystemStyleObject, Theme } from '../../../theme';
import { iconMap, SupportedIcons } from './types';

export type IconProps = SvgIconProps & {
  name: SupportedIcons;
};

export const Icon: React.FunctionComponent<IconProps> = ({ name, sx, ...props }) => {
  const NamedIcon = iconMap[name];

  const extraProps = (iconName: SupportedIcons) => {
    switch (iconName) {
      case 'voltz':
        return {
          viewBox: '0 0 20 30',
        };
      case 'noClaimedBadges':
      case 'degenStuff':
      case 'deltaDegen':
      case 'irsConnoisseur':
      case 'leverageCrowbar':
      case 'fixedTrader':
      case 'sushiRoll':
      case 'topTrader':
      case 'beWaterMyFriend':
      case 'rainMaker':
      case 'waterHose':
      case 'moneyMoneyMoney':
      case 'lpoor':
      case 'yikes':
      case 'maxBidding':
      case 'okBoomer':
      case 'dryIce':
      case 'mellowLpVault':
      case 'mellowLpVaultTier1':
      case 'mellowLpVaultTier2':
      case 'mellowLpVaultTier3':
      case '0BCMellowLpVault':
      case 'ogDegenStuff':
      case 'ogDeltaDegen':
      case 'ogIrsConnoisseur':
      case 'ogLeverageCrowbar':
      case 'ogFixedTrader':
      case 'ogSushiRoll':
      case 'ogTopTrader':
      case 'ogBeWaterMyFriend':
      case 'ogRainMaker':
      case 'ogWaterHose':
      case 'ogMoneyMoneyMoney':
      case 'ogLpoor':
      case 'ogYikes':
      case 'ogMaxBidding':
      case 'ogOkBoomer':
      case 'ogDryIce':
      case 's2DegenStuff':
      case 's2DeltaDegen':
      case 's2IrsConnoisseur':
      case 's2LeverageCrowbar':
      case 's2FixedTrader':
      case 's2SushiRoll':
      case 's2TopTrader':
      case 's2BeWaterMyFriend':
      case 's2RainMaker':
      case 's2WaterHose':
      case 's2MoneyMoneyMoney':
      case 's2Lpoor':
      case 's2Yikes':
      case 's2MaxBidding':
      case 's2MellowLpVaultTier1':
      case 's2MellowLpVaultTier2':
      case 's2MellowLpVaultTier3':
      case 'diplomatz':
      case 'governorz':
      case 'senatorz':
      case 'notionalInfluencer':
      case 'referror':
      case 'whaleWhisperer':
        return {
          viewBox: '0 0 459 459',
        };
      case 'metamask':
        return {
          viewBox: '0 0 23 22',
        };
      case 'walletConnect':
        return {
          viewBox: '0 0 22 20',
        };
      case 'tx-burn':
      case 'tx-liquidation':
      case 'tx-margin-update':
      case 'tx-mint':
      case 'tx-settle':
      case 'tx-swap':
        return {
          viewBox: '0 0 16 16',
        };
    }
    return {};
  };

  if (!NamedIcon) {
    return null;
  }

  const defaultSx: SystemStyleObject<Theme> = {
    fill: 'none',
  };
  const getSx = () => {
    if (!sx) {
      return [];
    }

    if (Array.isArray(sx)) {
      return sx;
    }

    return [sx];
  };

  return (
    <SvgIcon
      component={NamedIcon}
      data-testid={`Icon-${name}`}
      sx={[defaultSx, ...getSx()]}
      {...extraProps(name)}
      {...props}
    />
  );
};
