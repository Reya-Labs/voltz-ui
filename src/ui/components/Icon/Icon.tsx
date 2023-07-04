import React from 'react';

import { iconMap, SupportedIcons } from './types';

type IconProps = {
  name: SupportedIcons;
  className?: string;
  'data-testid'?: string;
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

  return <SupportedIcon className={className} data-testid={dataTestId || `Icon-${name}`} />;
};
