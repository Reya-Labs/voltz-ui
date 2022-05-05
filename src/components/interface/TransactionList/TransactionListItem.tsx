import React from 'react';
import { FCMPositionTransaction, TraderPositionTransaction, TransactionType, LPPositionTransaction } from './types';
import { Box, ListItem } from '@mui/material';
import { SystemStyleObject, Theme } from '@mui/system';
import { Typography } from '@components/atomic';
import colors from '../../../theme/colors';
import { Icon } from '@components/atomic';
import { Position } from '@voltz-protocol/v1-sdk';
import { getTransactionData } from './services';

interface TransactionListItemProps {
  position: Position;
  transaction: TraderPositionTransaction | FCMPositionTransaction | LPPositionTransaction;
}

const rowStyles: SystemStyleObject<Theme> = {
  width: '100%',
  padding: (theme) => `0 ${theme.spacing(5)}`,
  borderTop: `1px solid ${colors.lavenderWeb.darken050}`,
  textTransform: 'uppercase',

  '&:first-child': {
    borderTop: 'none'
  }
}

const cellStyles: SystemStyleObject<Theme> = {
  color: '#fff',
  padding: (theme) => `${theme.spacing(2)} ${theme.spacing(3)}`,
  display: 'flex',
  alignItems: 'center'
}

const labelStyles: SystemStyleObject<Theme> = {
  fontSize: '12px',
  lineHeight: '14px',
  color: colors.lavenderWeb.darken020,
  marginRight: (theme) => theme.spacing(2)
};

const iconStyles: SystemStyleObject<Theme> = {
  width: '16px',
  height: '16px'
};

const TransactionListItem = ({ position, transaction }: TransactionListItemProps) => {
  const data = getTransactionData(position, transaction);
  const isLiquidation = transaction.type === TransactionType.LIQUIDATION;

  return (
    <ListItem sx={rowStyles}>
      <Box sx={cellStyles}>
        <Typography variant='body2' sx={{color: colors.lavenderWeb.darken020, textTransform: 'uppercase'}}>
          {data.date}
        </Typography>
      </Box>
      <Box sx={cellStyles}>
        <Icon name={data.icon} sx={iconStyles} />
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2' sx={isLiquidation ? {color: colors.vzCustomRed1} : undefined}>
          {data.label}
        </Typography>
      </Box>
      {data.items.map(item => (
        <Box sx={cellStyles} key={item.label}>
          <Typography variant='body2' sx={labelStyles}>{item.label}</Typography>
          <Typography variant='body2' sx={isLiquidation ? {color: colors.vzCustomRed1} : undefined}>
            {item.value}
          </Typography>
        </Box>
      ))}
    </ListItem>
  );
}

export default TransactionListItem;