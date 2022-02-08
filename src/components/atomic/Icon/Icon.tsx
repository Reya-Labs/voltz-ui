import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SxProps, Theme } from '@mui/system';
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
  const handleClick = () => navigate(link);

  return (
    <SvgIcon component={NamedIcon} sx={[defaultSx, ...getSx()]} onClick={handleClick} {...props} />
  );
};

export default Icon;
