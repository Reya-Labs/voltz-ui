import React from 'react';
import { 
  FCMPositionTransaction, 
  FCMSettlementTransaction, 
  FCMSwapTransaction, 
  FCMUnwindTransaction, 
  LiquidationTransaction, 
  MarginUpdateTransaction, 
  TraderPositionTransaction, 
  SettlementTransaction, 
  SwapTransaction, 
  TransactionType, 
  MintTransaction, 
  BurnTransaction, 
  LPPositionTransaction
} from './types';
import { Box, ListItem } from '@mui/material';
import { SystemStyleObject, Theme } from '@mui/system';
import { Typography } from '@components/atomic';
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

const TransactionListItem = ({ token, transaction }: TransactionListItemProps) => {
  const getBurnTransactionContent = (tx: BurnTransaction) => (
    <>
      <Box sx={cellStyles}>
        <Icon name='tx-burn' sx={iconStyles} />
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2'>BURN</Typography>
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2' sx={labelStyles}>notional</Typography>
        <Typography variant='body2'>
          {formatCurrency(JSBI.toNumber(tx.amount) / Math.pow(10, 18))} {token}
        </Typography>
      </Box>
    </>
  );

  const getMintTransactionContent = (tx: MintTransaction) => (
    <>
      <Box sx={cellStyles}>
        <Icon name='tx-mint' sx={iconStyles} />
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2'>MINT</Typography>
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2' sx={labelStyles}>notional</Typography>
        <Typography variant='body2'>
          {formatCurrency(JSBI.toNumber(tx.amount) / Math.pow(10, 18))} {token}
        </Typography>
      </Box>
    </>
  );

  const getLiquidationTransactionContent = (tx: LiquidationTransaction) => (
    <>
      <Box sx={cellStyles}>
        <Icon name='tx-liquidation' sx={iconStyles} />
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2' sx={{color: colors.vzCustomRed1}}>LIQUIDATION</Typography>
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2' sx={labelStyles}>unwound</Typography>
        <Typography variant='body2' sx={{color: colors.vzCustomRed1}}>
          {formatCurrency(JSBI.toNumber(tx.notionalUnwound) / Math.pow(10, 18))} {token}
        </Typography>
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2' sx={labelStyles}>cashflow</Typography>
        <Typography variant='body2' sx={{color: colors.vzCustomRed1}}>
          {JSBI.GT(tx.reward, 0) && '+'}
          {formatCurrency(JSBI.toNumber(tx.reward) / Math.pow(10, 18))} {token}
        </Typography>
      </Box>
    </>
  );

  const getMarginUpdateTransactionContent = (tx: MarginUpdateTransaction) => (
    <>
      <Box sx={cellStyles}>
        <Icon name='tx-margin-update' sx={iconStyles} />
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2'>MARGIN UPDATE</Typography>
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2' sx={labelStyles}>margin delta</Typography>
        <Typography variant='body2'>
          {formatCurrency(JSBI.toNumber(tx.marginDelta) / Math.pow(10, 18))} {token}
        </Typography>
      </Box>
    </>
  );

  const getSettlementTransactionContent = (tx: SettlementTransaction | FCMSettlementTransaction) => (
    <>
      <Box sx={cellStyles}>
        <Icon name='tx-settle' sx={iconStyles} />
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2'>SETTLE</Typography>
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2' sx={labelStyles}>cashflow</Typography>
        <Typography variant='body2'>
          {JSBI.GT(tx.settlementCashflow, 0) && '+'}
          {formatCurrency(JSBI.toNumber(tx.settlementCashflow) / Math.pow(10, 18))} {token}
        </Typography>
      </Box>
    </>
  );

  const getSwapTransactionContent = (tx: SwapTransaction | FCMSwapTransaction) => (
    <>
      <Box sx={cellStyles}>
        <Icon name='tx-swap' sx={iconStyles} />
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2'>SWAP</Typography>
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2' sx={labelStyles}>notional</Typography>
        <Typography variant='body2'>
          {formatCurrency(JSBI.toNumber(tx.desiredNotional) / Math.pow(10, 18))} {token}
        </Typography>
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2' sx={labelStyles}>avg fix</Typography>
        <Typography variant='body2'>
          {formatCurrency(JSBI.toNumber(tx.fixedTokenDelta) / Math.pow(10, 18))} %
        </Typography>
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2' sx={labelStyles}>fees</Typography>
        <Typography variant='body2'>
          {formatCurrency(JSBI.toNumber(tx.cumulativeFeeIncurred) / Math.pow(10, 18))} {token}
        </Typography>
      </Box>
    </>
  );

  const getUnwindTransactionContent = (tx: FCMUnwindTransaction) => (
    <>
      <Box sx={cellStyles}>
        <Icon name='tx-swap' sx={iconStyles} />
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2'>UNWIND</Typography>
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2' sx={labelStyles}>notional</Typography>
        <Typography variant='body2'>
          {formatCurrency(JSBI.toNumber(tx.desiredNotional) / Math.pow(10, 18))} {token}
        </Typography>
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2' sx={labelStyles}>avg fix</Typography>
        <Typography variant='body2'>
          {formatCurrency(JSBI.toNumber(tx.fixedTokenDelta) / Math.pow(10, 18))} %
        </Typography>
      </Box>
      <Box sx={cellStyles}>
        <Typography variant='body2' sx={labelStyles}>fees</Typography>
        <Typography variant='body2'>
          {formatCurrency(JSBI.toNumber(tx.cumulativeFeeIncurred) / Math.pow(10, 18))} {token}
        </Typography>
      </Box>
    </>
  );

  const getTransactionContent = (tx: TraderPositionTransaction | FCMPositionTransaction | LPPositionTransaction) => {
    switch(tx.type) {
      case TransactionType.SWAP:
      case TransactionType.FCM_SWAP:
        return getSwapTransactionContent(tx);
      case TransactionType.SETTLEMENT:
      case TransactionType.FCM_SETTLEMENT:
        return getSettlementTransactionContent(tx);
      case TransactionType.MARGIN_UPDATE:
        return getMarginUpdateTransactionContent(tx);
      case TransactionType.LIQUIDATION:
        return getLiquidationTransactionContent(tx);
      case TransactionType.FCM_UNWIND:
        return getUnwindTransactionContent(tx);
      case TransactionType.MINT:
        return getMintTransactionContent(tx);
      case TransactionType.BURN:
        return getBurnTransactionContent(tx);
      default:
        return null;
    }
  }

  return (
    <ListItem sx={rowStyles}>
      <Box sx={cellStyles}>
        <Typography variant='body2' sx={{color: colors.lavenderWeb.darken020, textTransform: 'uppercase'}}>
          {formatTimestamp(transaction.transactionTimestamp)}
        </Typography>
      </Box>
      {getTransactionContent(transaction)}
    </ListItem>
  );
}

export default TransactionListItem;