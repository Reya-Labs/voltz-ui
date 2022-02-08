import React from 'react';
import { SxProps, Theme } from '@mui/system';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import isArray from 'lodash/isArray';

import { Icons, iconMap } from './types';

export type IconProps = SvgIconProps & {
  name: Icons;
};

const Icon: React.FunctionComponent<IconProps> = ({ name, sx, ...props }) => {
  const NamedIcon = iconMap[name];

  if (!NamedIcon) {
    return null;
  }

  const defaultSx: SxProps<Theme> = {
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

  return <SvgIcon component={NamedIcon} sx={[defaultSx, ...getSx()]} {...props} />;
};

export default Icon;
