import React from 'react';
import { FCMPositionTransaction, TraderPositionTransaction, TransactionType, LPPositionTransaction} from './types';
import { Box, ListItem } from '@mui/material';
import { SystemStyleObject, Theme } from '@mui/system';
import { Icons, Typography } from '@components/atomic';
import colors from '../../../theme/colors';
import { formatCurrency, formatTimestamp } from '@utilities';
import { Icon } from '@components/atomic';
import JSBI from 'jsbi';

interface TransactionListItemProps {
  token?: string;
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

const TransactionListItem = ({ token = '', transaction }: TransactionListItemProps) => {
  const getTransactionData = (tx: TransactionListItemProps['transaction']) => {
    const iconMap:Record<TransactionType, Icons> = {
      [TransactionType.BURN]: 'tx-burn',
      [TransactionType.FCM_SWAP]: 'tx-swap',
      [TransactionType.FCM_SETTLEMENT]: 'tx-settle',
      [TransactionType.FCM_UNWIND]: 'tx-swap',
      [TransactionType.LIQUIDATION]: 'tx-liquidation',
      [TransactionType.MARGIN_UPDATE]: 'tx-margin-update',
      [TransactionType.MINT]: 'tx-mint',
      [TransactionType.SETTLEMENT]: 'tx-settle',
      [TransactionType.SWAP]: 'tx-swap',
    };

    const getLabel = () => {
      switch(tx.type) {
        case TransactionType.BURN: return 'BURN';
        case TransactionType.FCM_SWAP: return 'SWAP (FT)';
        case TransactionType.FCM_SETTLEMENT: return 'SETTLE';
        case TransactionType.FCM_UNWIND: return 'UNWIND (VT)';
        case TransactionType.LIQUIDATION: return 'LIQUIDATION';
        case TransactionType.MARGIN_UPDATE: return 'MARGIN UPDATE';
        case TransactionType.MINT: return 'MINT';
        case TransactionType.SETTLEMENT: return 'SETTLE';
        case TransactionType.SWAP: return `SWAP ${JSBI.GT(tx.variableTokenDelta, 0) ? 'VT' : 'FT'}`;
      }
    };

    const baseData = {
      icon: iconMap[tx.type],
      label: getLabel(),
      type: tx.type,
      items: []
    }

    switch(tx.type) {
      case TransactionType.SWAP:
      case TransactionType.FCM_SWAP:
      case TransactionType.FCM_UNWIND:
        return {
          ...baseData,
          items: [
            {
              label: 'notional', 
              value: `${formatCurrency(JSBI.toNumber(tx.desiredNotional) / Math.pow(10, 18))} ${token}`
            },
            {
              label: 'avg fix', 
              value: `${formatCurrency(JSBI.toNumber(tx.fixedTokenDelta) / Math.pow(10, 18))} %`
            },
            {
              label: 'fees', 
              value: `${formatCurrency(JSBI.toNumber(tx.cumulativeFeeIncurred) / Math.pow(10, 18))} ${token}`
            },
          ]
        }

      case TransactionType.SETTLEMENT:
      case TransactionType.FCM_SETTLEMENT:
        return {
          ...baseData,
          items: [
            {
              label: 'cashflow', 
              value: `${formatCurrency(JSBI.toNumber(tx.settlementCashflow) / Math.pow(10, 18), false, true)} ${token}`
            },
          ]
        }

      case TransactionType.MARGIN_UPDATE:
        return {
          ...baseData,
          items: [
            {
              label: 'margin delta', 
              value: `${formatCurrency(JSBI.toNumber(tx.marginDelta) / Math.pow(10, 18))} ${token}`
            },
          ]
        }

      case TransactionType.LIQUIDATION:
        return {
          ...baseData,
          items: [
            {
              label: 'unwound', 
              value: `${formatCurrency(JSBI.toNumber(tx.notionalUnwound) / Math.pow(10, 18))} ${token}`
            },
            {
              label: 'cashflow', 
              value: `${formatCurrency(JSBI.toNumber(tx.reward) / Math.pow(10, 18), false, true)} ${token}`
            },
          ]
        }

      case TransactionType.MINT:
      case TransactionType.BURN:
        return {
          ...baseData,
          items: [
            {
              label: 'notional', 
              value: `${formatCurrency(JSBI.toNumber(tx.amount) / Math.pow(10, 18))} ${token}`
            }
          ]
        }

      default:
        return baseData;
    }
  }

  const data = getTransactionData(transaction);
  const isLiquidation = transaction.type === TransactionType.LIQUIDATION;

  return (
    <ListItem sx={rowStyles}>
      <Box sx={cellStyles}>
        <Typography variant='body2' sx={{color: colors.lavenderWeb.darken020, textTransform: 'uppercase'}}>
          {formatTimestamp(transaction.transactionTimestamp)}
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