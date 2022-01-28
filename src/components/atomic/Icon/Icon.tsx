import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

import { Icons, iconMap } from './types';

export type IconProps = SvgIconProps & {
  name: Icons;
};

const Icon: React.FunctionComponent<IconProps> = ({ name, ...props }) => {
  const NamedIcon = iconMap[name];

  if (!NamedIcon) {
    return null;
  }

  return (
    <SvgIcon {...props}>
      <NamedIcon />
    </SvgIcon>
  );
};

export default Icon;
