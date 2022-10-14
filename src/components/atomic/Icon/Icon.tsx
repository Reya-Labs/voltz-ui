import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SystemStyleObject, Theme } from '@theme';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import isArray from 'lodash/isArray';

import { Icons, iconMap } from './types';

export type IconProps = SvgIconProps & {
  name: Icons;
  link?: string;
};

const Icon: React.FunctionComponent<IconProps> = ({ name, sx, link, ...props }) => {
  const navigate = useNavigate();
  const NamedIcon = iconMap[name];

  const extraProps = (iconName: Icons) => {
    switch (iconName) {
      case 'degenStuff':
      case 'deltaDegen':
      case 'irsConnoisseur':
      case 'leverageCrowbar':
      case 'noRiskHereSer':
      case 'sushiRoll':
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
  const handleClick = () => link && navigate(link);

  return (
    <SvgIcon
      component={NamedIcon}
      sx={[defaultSx, ...getSx()]}
      onClick={handleClick}
      {...extraProps(name)}
      {...props}
    />
  );
};

export default Icon;
