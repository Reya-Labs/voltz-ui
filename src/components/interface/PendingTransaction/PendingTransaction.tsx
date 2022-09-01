import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { AugmentedAMM } from '@utilities';
import { useWallet, useSelector } from '@hooks';
import { selectors } from '@store';
import { AMMProvider, MintBurnFormLiquidityAction } from '@contexts';
import { Button, Panel, Typography, Loading, TokenAndText } from '@components/atomic';
import { ProtocolInformation, WalletAddressDisplay } from '@components/composite';
import { formatCurrency } from '@utilities';
import { isUndefined } from 'lodash';

export type PendingTransactionProps = {
  amm: AugmentedAMM;
  transactionId?: string;
  isEditingMargin?: boolean;
  liquidityAction?: MintBurnFormLiquidityAction;
  isFCMSwap?: boolean;
  isFCMUnwind?: boolean;
  isRollover?: boolean;
  isSettle?: boolean;
  notional?: number;
  margin?: number;
  onBack: () => void;
  onComplete: () => void;
};

const PendingTransaction: React.FunctionComponent<PendingTransactionProps> = ({
  amm,
  transactionId,
  liquidityAction,
  isEditingMargin,
  isFCMSwap,
  isFCMUnwind,
  isRollover,
  isSettle,
  notional,
  margin,
  onBack,
  onComplete,
}) => {
  const { account } = useWallet();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId);

  if (!activeTransaction) {
    return null;
  }

  let transactionLink: string | undefined = undefined;
  if (activeTransaction.txid) {
    if (process.env.REACT_APP_REQUIRED_ETHEREUM_NETWORK === 'goerli') {
      transactionLink = `https://goerli.etherscan.io/tx/${activeTransaction.txid}`
    }

    if (process.env.REACT_APP_REQUIRED_ETHEREUM_NETWORK === 'homestead') {
      transactionLink = `https://etherscan.io/tx/${activeTransaction.txid}`
    }
  }

  const renderStatus = () => {
    if (activeTransaction.resolvedAt) {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            sx={{
              paddingTop: (theme) => theme.spacing(6),
              paddingBottom: (theme) => theme.spacing(8),
            }}
          >
            <Box sx={{ height: 30, width: 30 }}>
              <img src="/images/done.png" alt="Done" height="100%" width="100%" />
            </Box>
          </Box>
          <Box
            sx={{
              paddingBottom: (theme) => theme.spacing(2),
            }}
          >
            <Typography variant="subtitle1">TRANSACTION CONFIRMED</Typography>
          </Box>
          <Box
            sx={{
              paddingBottom: (theme) => theme.spacing(8),
            }}
          >
            <Link href={transactionLink} variant="caption" color="primary.light">
              View on etherscan
            </Link>
          </Box>
          <Box
            sx={{
              paddingBottom: (theme) => theme.spacing(10),
            }}
          >
            <Button variant="contained" onClick={onComplete}>
              Go to your portfolio
            </Button>
          </Box>
        </Box>
      );
    }

    if (activeTransaction.failedAt) {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            sx={{
              paddingTop: (theme) => theme.spacing(6),
              paddingBottom: (theme) => theme.spacing(8),
            }}
          >
            <Box sx={{ height: 30, width: 30 }}>
              <img src="/images/failed.png" alt="Done" height="100%" width="100%" />
            </Box>
          </Box>
          <Box
            sx={{
              paddingBottom: (theme) => theme.spacing(2),
            }}
          >
            <Typography variant="subtitle1">TRANSACTION FAILED</Typography>
          </Box>
          <Box
            sx={{
              paddingBottom: (theme) => theme.spacing(8),
            }}
          >
            <Typography variant="body2" align="center" color="error">
              {activeTransaction.failureMessage || "Unrecognized error"}
            </Typography>
          </Box>
          <Box
            sx={{
              paddingBottom: (theme) => theme.spacing(10),
            }}
          >
            <Button variant="contained" onClick={onBack}>
              Back
            </Button>
          </Box>
        </Box>
      );
    }

    if (activeTransaction.succeededAt) {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            sx={{
              paddingTop: (theme) => theme.spacing(6),
              paddingBottom: (theme) => theme.spacing(8),
            }}
          >
            {/* <Loading /> */}
          </Box>
          <Box
            sx={{
              paddingBottom: (theme) => theme.spacing(2),
            }}
          >
            <Typography variant="h6">TRANSACTION CONFIRMED</Typography>
          </Box>
          <Box
            sx={{
              paddingBottom: (theme) => theme.spacing(8),
            }}
          >
            <Link href={transactionLink} target="_blank" variant="caption" color="primary.light">
              View on etherscan
            </Link>
          </Box>
          <Box
            sx={{
              paddingBottom: (theme) => theme.spacing(10),
              textAlign: 'center',
            }}
          >
            {/* <Typography variant="caption" color="secondary">
              Wait a few moments for the blockchain data to synchronize
            </Typography> */}
            <Button variant="contained" onClick={onComplete}>
              Go to your portfolio
            </Button>
          </Box>
        </Box>
      );
    }

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          sx={{
            paddingTop: (theme) => theme.spacing(6),
            paddingBottom: (theme) => theme.spacing(8),
          }}
        >
          <Loading />
        </Box>
        <Box
          sx={{
            paddingBottom: (theme) => theme.spacing(2),
          }}
        >
          <Typography variant="h6">WAITING FOR CONFIRMATION</Typography>
        </Box>
        <Box
          sx={{
            paddingBottom: (theme) => theme.spacing(2),
          }}
        >
          <WalletAddressDisplay address={account} />
        </Box>
        <Box
          sx={{
            paddingBottom: (theme) => theme.spacing(10),
          }}
        >
          <Typography variant="caption" color="secondary">
            Confirm this transaction in your wallet
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderNotional = () => {
    if (isUndefined(amm.underlyingToken.name)) {
      return "Underlying token name undefined";
    }

    if (isUndefined(notional)) {
      return `${formatCurrency(0)} ${amm.underlyingToken.name}`;
    }

    return `${formatCurrency(notional)} ${amm.underlyingToken.name}`;
  }

  const renderMargin = () => {
    if (isUndefined(margin)) {
      return "Margin undefined";
    }

    if (isUndefined(amm.underlyingToken.name)) {
      return "Underlying token name undefined";
    }

    if (isFCMSwap) {
      return `${formatCurrency(margin)} ${amm.protocol}`;
    }

    return `${formatCurrency(margin)} ${amm.underlyingToken.name}`;
  }

  return (
    <Panel
      variant="dark"
      sx={{
        marginTop: 12,
        width: (theme) => theme.spacing(97),
        boxShadow: '0px 0px 60px rgba(255, 89, 156, 0.2)',
      }}
    >
      {renderStatus()}
      <Panel variant="main">
        {(isRollover || isSettle) 
          ? (
            <TokenAndText 
              token={amm.protocol} 
              tokenLabel='pool' 
              text={isRollover ? 'ROLLOVER' : 'SETTLING'} 
              textLabel='STATUS' 
            />
          )
          : (
            <AMMProvider amm={amm}>
              <ProtocolInformation protocol={amm.protocol} />
            </AMMProvider>
          )
        }

        {(isUndefined(isEditingMargin) || !isEditingMargin) && (<Box
          sx={{
            marginBottom: (theme) => theme.spacing(4),
          }}
        >
          <Typography label="NOTIONAL AMOUNT" variant="body2">
            {renderNotional()}
          </Typography>
        </Box>)
        }
        
        {
          (isUndefined(liquidityAction) || liquidityAction) && (isUndefined(isFCMUnwind) || !isFCMUnwind) && (
        <Box
          sx={{
            marginBottom: (theme) => theme.spacing(4),
          }}
        >
          <Typography label="MARGIN" variant="body2">
            {renderMargin()}
          </Typography>
        </Box>
        )}
      </Panel>
    </Panel>
  );
};

export default PendingTransaction;
