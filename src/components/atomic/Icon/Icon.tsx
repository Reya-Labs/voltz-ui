import React from 'react';
import { SystemStyleObject, Theme } from '../../../theme';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import isArray from 'lodash/isArray';

import { Icons, iconMap } from './types';

export type IconProps = SvgIconProps & {
  name: Icons;
};

export const Icon: React.FunctionComponent<IconProps> = ({ name, sx, ...props }) => {
  const NamedIcon = iconMap[name];

  const extraProps = (iconName: Icons) => {
    switch (iconName) {
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
      case 'noClaimedBadges':
      case 'mellowLpVault':
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

    if (isArray(sx)) {
      return sx;
    }

    return [sx];
  };

  return (
    <SvgIcon component={NamedIcon} sx={[defaultSx, ...getSx()]} {...extraProps(name)} {...props} />
  );
};
