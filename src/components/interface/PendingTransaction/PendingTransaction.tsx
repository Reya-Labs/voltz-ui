import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { AugmentedAMM, getPoolButtonId } from '@utilities';
import { useWallet, useSelector, useAgent } from '@hooks';
import { selectors } from '@store';
import { AMMProvider, MintBurnFormLiquidityAction, useAMMsContext } from '@contexts';
import { Button, Panel, Typography, Loading, TokenAndText } from '@components/atomic';
import { ProtocolInformation, WalletAddressDisplay } from '@components/composite';
import { formatCurrency } from '@utilities';
import { isUndefined } from 'lodash';
import { Position } from '@voltz-protocol/v1-sdk/dist/types/entities';
import { Wallet } from '@graphql';

export type PendingTransactionProps = {
  amm: AugmentedAMM;
  position?: Position;
  transactionId?: string;
  isEditingMargin?: boolean;
  showNegativeNotional?: boolean;
  liquidityAction?: MintBurnFormLiquidityAction;
  isFCMSwap?: boolean;
  isFCMUnwind?: boolean;
  isRollover?: boolean;
  isSettle?: boolean;
  notional?: number;
  margin?: number;
  onBack: () => void;
  onComplete: () => void;
  variableApy?: number;
  fixedApr?: number;
};

const PendingTransaction: React.FunctionComponent<PendingTransactionProps> = ({
  amm,
  position,
  transactionId,
  liquidityAction,
  isEditingMargin,
  showNegativeNotional,
  isFCMSwap,
  isFCMUnwind,
  isRollover,
  isSettle,
  notional,
  margin,
  onBack,
  onComplete,
  variableApy,
  fixedApr,
}) => {
  const previousWallet = useRef<Wallet>();
  const [fetch, setFetch] = useState<number>(0);
  const fetchLimit = 20;
  const { account, refetch, wallet, loading } = useWallet();
  const {agent} = useAgent();
  const { isPositionFeched } = useAMMsContext();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId);
  const isFetched = previousWallet.current ? isPositionFeched(wallet as Wallet, previousWallet.current, position) : fetch >= fetchLimit ;

  useEffect(() => {
    if (!previousWallet.current && wallet) {
      previousWallet.current = wallet as Wallet;
    }
  }, [wallet]);

  useEffect(() => {
    if (activeTransaction && (activeTransaction.resolvedAt || activeTransaction.succeededAt)) {
      if( wallet && previousWallet.current && !isPositionFeched(wallet as Wallet, previousWallet.current, position) ) {
        setTimeout(() => {refetch()}, 500);
        if(fetch < fetchLimit) setFetch(fetch+1);
      } 
    }
  }, [activeTransaction?.resolvedAt, activeTransaction?.succeededAt, fetch]);

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
    if (activeTransaction.resolvedAt && isFetched) {
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
            <Link href={transactionLink} variant="caption" color="primary.light"
              id={getPoolButtonId(
                (margin && margin < 0) ? "REMOVE" : "ADD",
                (liquidityAction ?? "").toString(),
                showNegativeNotional ? "REMOVE": "ADD",
                agent,
                amm)}>
              View on etherscan
            </Link>
          </Box>
          <Box
            sx={{
              paddingBottom: (theme) => theme.spacing(10),
            }}
          >
            <Button variant="contained" onClick={onComplete}
              id={getPoolButtonId(
                (margin && margin < 0) ? "REMOVE" : "ADD",
                (liquidityAction ?? "").toString(),
                showNegativeNotional ? "REMOVE": "ADD",
                agent,
                amm)}>
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
            <Button variant="contained" onClick={onBack} id={getPoolButtonId(
                (margin && margin < 0) ? "REMOVE" : "ADD",
                (liquidityAction ?? "").toString(),
                showNegativeNotional ? "REMOVE": "ADD",
                agent,
                amm)+"_FAILED"}>
              Back
            </Button>
          </Box>
        </Box>
      );
    }

    if (activeTransaction.succeededAt && isFetched) {
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
            <Link href={transactionLink} target="_blank" variant="caption" color="primary.light"
              id={getPoolButtonId(
                (margin && margin < 0) ? "REMOVE" : "ADD",
                (liquidityAction ?? "").toString(),
                showNegativeNotional ? "REMOVE": "ADD",
                agent,
                amm)}>
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
            <Button variant="contained"
              onClick={onComplete}
              id={getPoolButtonId(
                (margin && margin < 0) ? "REMOVE" : "ADD",
                (liquidityAction ?? "").toString(),
                showNegativeNotional ? "REMOVE": "ADD",
                agent,
                amm)}>
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

    if (showNegativeNotional) {
      return `${formatCurrency(0-notional)} ${amm.underlyingToken.name}`;
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
              <ProtocolInformation protocol={amm.protocol} variableApy={variableApy} fixedApr={fixedApr}/>
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
