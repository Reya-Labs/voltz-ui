import React from 'react';

import { Button } from '../../../../../../../../atomic/Button/Button';
import { Icon, IconProps } from '../../../../../../../../atomic/Icon/Icon';
import { Typography } from '../../../../../../../../atomic/Typography/Typography';

export type WalletOptionButtonProps = {
  onClick: () => void;
  title: string;
  icon?: IconProps['name'];
  selected: boolean;
};

export const WalletOptionButton: React.FunctionComponent<WalletOptionButtonProps> = ({
  onClick,
  title,
  icon,
  selected,
}) => (
  <Button
    selected={selected}
    sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      padding: (theme) => theme.spacing(4),
      marginTop: (theme) => theme.spacing(4),

      '&:first-of-type': {
        marginTop: '0',
      },
    }}
    variant="darker"
    onClick={onClick}
  >
    <Typography variant="h6">
      {selected && '• '}
      {title}
    </Typography>
    {icon && <Icon name={icon} sx={{ width: 22 }} />}
  </Button>
);
