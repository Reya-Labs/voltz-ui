import React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { colors, SystemStyleObject, Theme } from '../../../theme';
import { Button, Icon, Typography } from '@components/atomic';
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
  borderTop: `1px solid ${colors.lavenderWeb.darken045}`,
  textTransform: 'uppercase',

  '&:first-of-type': {
    borderTop: 'none',
  },
};

const cellStyles: SystemStyleObject<Theme> = {
  color: '#fff',
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
  color: colors.lavenderWeb.darken020,
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
    color: colors.lavenderWeb.base,
    marginLeft: 'auto',
    minWidth: 'auto',
    paddingRight: open ? undefined : '0',
  };

  return (
    <ListItem sx={rowStyles}>
      <Box sx={cellStyles}>
        <Typography
          variant="body2"
          sx={{ color: colors.lavenderWeb.darken020, textTransform: 'uppercase' }}
        >
          {data.date}
        </Typography>
      </Box>
      <Box sx={cellStyles}>
        <Icon name={data.icon} sx={iconStyles} />
      </Box>
      <Box sx={cellStyles}>
        <Typography
          variant="body2"
          sx={isLiquidation ? { color: colors.vzCustomRed1.base } : undefined}
        >
          {data.label}
        </Typography>
      </Box>
      {data.items.map((item) => (
        <Box sx={cellStyles} key={item.label}>
          <Typography variant="body2" sx={labelStyles}>
            {item.label}
          </Typography>
          <Typography
            variant="body2"
            sx={isLiquidation ? { color: colors.vzCustomRed1.base } : undefined}
          >
            {item.value}
          </Typography>
        </Box>
      ))}
      {onOpenClose && (
        <Button
          onClick={onOpenClose}
          variant="text"
          sx={openCloseStyles}
          aria-expanded={open}
          aria-controls={listId?.toString()}
        >
          {open ? 'X' : 'TX History'}
        </Button>
      )}
    </ListItem>
  );
};
