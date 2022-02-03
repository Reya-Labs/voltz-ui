import React from 'react';

import { Button, Icon, IconProps, Typography } from '@components/atomic';

export type WalletOptionButtonProps = {
  onClick: () => void;
  title: string;
  icon: IconProps['name'];
};

const WalletOptionButton: React.FunctionComponent<WalletOptionButtonProps> = ({
  onClick,
  title,
  icon,
}) => (
  <Button
    onClick={onClick}
    variant="darker"
    sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      padding: (theme) => theme.spacing(4),
    }}
  >
    <Typography variant="h6">{title}</Typography>
    <Icon name={icon} />
  </Button>
);

export default WalletOptionButton;
