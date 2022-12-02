import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import React from 'react';

import { Button } from '../../../../../components/atomic/Button/Button';
import { Icon } from '../../../../../components/atomic/Icon/Icon';
import { Typography } from '../../../../../components/atomic/Typography/Typography';
import { colors, SystemStyleObject, Theme } from '../../../../../theme';
import { getTransactionData } from './services';

interface TransactionListItemProps {
  listId?: string | number;
  onOpenClose?: () => void;
  open?: boolean;
  isLiquidation: boolean;
  transactionData: ReturnType<typeof getTransactionData>;
}

const rowStyles: SystemStyleObject<Theme> = {
  width: '100%',
  padding: '0',
  borderTop: `1px solid ${colors.lavenderWeb8}`,
  textTransform: 'uppercase',

  '&:first-of-type': {
    borderTop: 'none',
  },
};

const cellStyles: SystemStyleObject<Theme> = {
  color: colors.lavenderWeb,
  padding: (theme) => `${theme.spacing(2)} ${theme.spacing(3)}`,
  display: 'flex',
  alignItems: 'center',

  '&:first-of-type': {
    paddingLeft: '2px',
  },

  '&:last-of-type': {
    paddingRight: '2px',
  },
};

const labelStyles: SystemStyleObject<Theme> = {
  fontSize: '12px',
  lineHeight: '14px',
  color: colors.lavenderWeb3,
  marginRight: (theme) => theme.spacing(2),
};

const iconStyles: SystemStyleObject<Theme> = {
  width: '16px',
  height: '16px',
};

export const TransactionListItem = ({
  listId,
  onOpenClose,
  open = false,
  transactionData,
  isLiquidation,
}: TransactionListItemProps) => {
  const data = transactionData;

  const openCloseStyles: SystemStyleObject<Theme> = {
    color: colors.lavenderWeb,
    marginLeft: 'auto',
    minWidth: 'auto',
    paddingRight: open ? undefined : '0',
  };

  return (
    <ListItem sx={rowStyles}>
      <Box sx={cellStyles}>
        <Typography sx={{ color: colors.lavenderWeb3, textTransform: 'uppercase' }} variant="body2">
          {data.date}
        </Typography>
      </Box>
      <Box sx={cellStyles}>
        <Icon name={data.icon} sx={iconStyles} />
      </Box>
      <Box sx={cellStyles}>
        <Typography
          sx={isLiquidation ? { color: colors.wildStrawberry } : undefined}
          variant="body2"
        >
          {data.label}
        </Typography>
      </Box>
      {data.items.map((item) => (
        <Box key={item.label} sx={cellStyles}>
          <Typography sx={labelStyles} variant="body2">
            {item.label}
          </Typography>
          <Typography
            sx={isLiquidation ? { color: colors.wildStrawberry } : undefined}
            variant="body2"
          >
            {item.value}
          </Typography>
        </Box>
      ))}
      {onOpenClose && (
        <Button
          aria-controls={listId?.toString()}
          aria-expanded={open}
          sx={openCloseStyles}
          variant="text"
          onClick={onOpenClose}
        >
          {open ? 'X' : 'TX History'}
        </Button>
      )}
    </ListItem>
  );
};
