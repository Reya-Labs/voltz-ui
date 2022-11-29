import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { AMM, Position } from '@voltz-protocol/v1-sdk';
import isUndefined from 'lodash/isUndefined';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { AMMProvider } from '../../../contexts/AMMContext/AMMContext';
import { useAMMsContext } from '../../../contexts/AMMsContext/AMMsContext';
import { MintBurnFormLiquidityAction } from '../../../contexts/MintBurnFormContext/MintBurnFormContext';
import { Wallet } from '../../../graphql';
import { useAgent } from '../../../hooks/useAgent';
import { useWallet } from '../../../hooks/useWallet';
import { selectors } from '../../../store';
import { useAppSelector } from '../../../store/hooks';
import { getAmmProtocol } from '../../../utilities/amm';
import { getAgentFromPosition } from '../../../utilities/getAgent';
import {
  DataLayerEventPayload,
  getPoolButtonId,
  pushEvent,
} from '../../../utilities/googleAnalytics';
import { isBorrowing } from '../../../utilities/isBorrowing';
import { formatCurrency } from '../../../utilities/number';
import { setPageTitle } from '../../../utilities/page';
import { Button } from '../../atomic/Button/Button';
import { Loading } from '../../atomic/Loading/Loading';
import { Panel } from '../../atomic/Panel/Panel';
import { Typography } from '../../atomic/Typography/Typography';
import { ProtocolInformation } from '../../composite/ProtocolInformation/ProtocolInformation';
import { WalletAddressDisplay } from '../../composite/WalletAddressDisplay/WalletAddressDisplay';

export type PendingTransactionProps = {
  amm: AMM;
  position?: Position;
  transactionId?: string;
  isEditingMargin?: boolean;
  showNegativeNotional?: boolean;
  liquidityAction?: MintBurnFormLiquidityAction;
  isRollover?: boolean;
  isSettle?: boolean;
  notional?: number;
  margin?: number;
  onBack: () => void;
  onComplete: () => void;
  variableApy?: number;
  fixedApr?: number;
};

export const PendingTransaction: React.FunctionComponent<PendingTransactionProps> = ({
  amm,
  position,
  transactionId,
  liquidityAction,
  isEditingMargin,
  showNegativeNotional,
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
  const fetchRef = useRef<number>(0);
  const fetchLimit = 20;
  const { account, refetch, wallet } = useWallet();
  const [loadingRefetch, setLoadingRefetch] = useState<boolean>(false);
  const { agent } = useAgent();
  const { isPositionFeched, removeFixedApr } = useAMMsContext();
  const cachedMargin = useRef<number | undefined>(margin);

  const action = useMemo(() => {
    if (isRollover) return 'rollover';
    if (isSettle) return 'settle';
    if (isEditingMargin || position) return 'edit';
    return 'new';
  }, [isRollover, isSettle, isEditingMargin]);

  useEffect(() => {
    setPageTitle('Pending Transaction', account);
    const payload: DataLayerEventPayload = {
      event: 'tx_submitted',
      eventValue: {
        notional:
          (notional ?? 0) *
          (showNegativeNotional || liquidityAction === MintBurnFormLiquidityAction.BURN ? -1 : 1),
        margin: isSettle ? cachedMargin.current : margin,
        action: action,
      },
      pool: getAmmProtocol(amm),
      agent: isSettle ? getAgentFromPosition(position?.positionType) : agent,
    };
    pushEvent(account ?? '', payload);
  }, []);

  useEffect(() => {
    if (!isUndefined(margin) && margin !== 0 && fetch === 0) {
      cachedMargin.current = margin;
    }
  }, [margin]);

  const activeTransaction = useAppSelector(selectors.transactionSelector)(transactionId);
  const trasactionState = useMemo(() => {
    return [activeTransaction?.resolvedAt, activeTransaction?.succeededAt];
  }, []);

  useEffect(() => {
    if (activeTransaction?.failedAt) {
      setPageTitle('Failed Transaction', account);
      const payload: DataLayerEventPayload = {
        event: 'failed_tx',
        eventValue: {
          notional:
            (notional ?? 0) *
            (showNegativeNotional || liquidityAction === MintBurnFormLiquidityAction.BURN ? -1 : 1),
          margin: isSettle ? cachedMargin.current : margin,
          action: action,
          failMessage: activeTransaction.failureMessage || 'Unrecognized error',
        },
        pool: getAmmProtocol(amm),
        agent: isSettle ? getAgentFromPosition(position?.positionType) : agent,
      };
      pushEvent(account ?? '', payload);
    }
  }, [activeTransaction?.failedAt]);

  const isFetched = useMemo(() => {
    if (
      previousWallet.current &&
      !loadingRefetch &&
      isPositionFeched(wallet as Wallet, previousWallet.current, position)
    ) {
      fetchRef.current = 0;
      removeFixedApr(amm);
      return true;
    } else {
      if (fetch >= fetchLimit) {
        fetchRef.current = 0;
        removeFixedApr(amm);
        return true;
      }
    }
    return false;
  }, [fetch, loadingRefetch]);

  useEffect(() => {
    if ((activeTransaction?.succeededAt || activeTransaction?.resolvedAt) && isFetched) {
      setPageTitle('Successful Transaction', account);
      const payload: DataLayerEventPayload = {
        event: 'successful_tx',
        eventValue: {
          notional:
            (notional ?? 0) *
            (showNegativeNotional || liquidityAction === MintBurnFormLiquidityAction.BURN ? -1 : 1),
          margin: isSettle ? cachedMargin.current : margin,
          action: action,
        },
        pool: getAmmProtocol(amm),
        agent: isSettle ? getAgentFromPosition(position?.positionType) : agent,
      };
      pushEvent(account ?? '', payload);
    }
  }, [(activeTransaction?.succeededAt || activeTransaction?.resolvedAt) && isFetched]);

  useEffect(() => {
    if (!previousWallet.current && wallet) {
      previousWallet.current = wallet as Wallet;
    }
  }, [wallet]);

  useEffect(() => {
    if (
      activeTransaction &&
      trasactionState[0] === activeTransaction.resolvedAt &&
      trasactionState[1] === activeTransaction.succeededAt
    )
      return;
    if (activeTransaction && (activeTransaction.resolvedAt || activeTransaction.succeededAt)) {
      if (
        fetch < fetchLimit &&
        !loadingRefetch &&
        wallet &&
        previousWallet.current &&
        !isPositionFeched(wallet as Wallet, previousWallet.current, position)
      ) {
        setLoadingRefetch(true);
        /* eslint-disable @typescript-eslint/no-unsafe-call */
        refetch().then(() => {
          setTimeout(() => {
            setLoadingRefetch(false);
          }, 500);
          fetchRef.current = fetch + 1;
          setFetch(fetchRef.current);
        });
      }
    }
  }, [activeTransaction?.resolvedAt, activeTransaction?.succeededAt, fetch, loadingRefetch]);

  if (!activeTransaction) {
    return null;
  }

  let transactionLink: string | undefined = undefined;
  if (activeTransaction.txid) {
    if (process.env.REACT_APP_REQUIRED_ETHEREUM_NETWORK === 'goerli') {
      transactionLink = `https://goerli.etherscan.io/tx/${activeTransaction.txid}`;
    }

    if (process.env.REACT_APP_REQUIRED_ETHEREUM_NETWORK === 'homestead') {
      transactionLink = `https://etherscan.io/tx/${activeTransaction.txid}`;
    }
  }

  const buttonId = getPoolButtonId(
    margin && margin < 0 ? 'REMOVE' : 'ADD',
    (liquidityAction ?? '').toString(),
    showNegativeNotional ? 'REMOVE' : 'ADD',
    agent,
    isBorrowing(amm.rateOracle.protocolId),
    amm.protocol,
  );

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
              <img alt="Done" height="100%" src="/images/done.png" width="100%" />
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
            <Link color="primary.light" href={transactionLink} id={buttonId} variant="caption">
              View on etherscan
            </Link>
          </Box>
          <Box
            sx={{
              paddingBottom: (theme) => theme.spacing(10),
            }}
          >
            <Button id={buttonId} variant="contained" onClick={onComplete}>
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
              <img alt="Done" height="100%" src="/images/failed.png" width="100%" />
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
            <Typography align="center" color="error" variant="body2">
              {activeTransaction.failureMessage || 'Unrecognized error'}
            </Typography>
          </Box>
          <Box
            sx={{
              paddingBottom: (theme) => theme.spacing(10),
            }}
          >
            <Button id={`${buttonId}_FAILED`} variant="contained" onClick={onBack}>
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
            <Link
              color="primary.light"
              href={transactionLink}
              id={buttonId}
              target="_blank"
              variant="caption"
            >
              View on etherscan
            </Link>
          </Box>
          <Box
            sx={{
              paddingBottom: (theme) => theme.spacing(10),
              textAlign: 'center',
            }}
          >
            <Button id={buttonId} variant="contained" onClick={onComplete}>
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
        <Box>
          <Typography color="secondary" sx={{}} variant="caption">
            Confirm this transaction in your wallet
          </Typography>
        </Box>
        <Box
          sx={{
            paddingBottom: (theme) => theme.spacing(10),
          }}
        >
          <Typography color="secondary" sx={{}} variant="caption">
            if you haven't already
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderNotional = () => {
    if (isUndefined(amm.underlyingToken.name)) {
      return 'Underlying token name undefined';
    }

    if (isUndefined(notional)) {
      return `${formatCurrency(0)} ${amm.underlyingToken.name}`;
    }

    if (showNegativeNotional) {
      return `${formatCurrency(0 - notional)} ${amm.underlyingToken.name}`;
    }

    return `${formatCurrency(notional)} ${amm.underlyingToken.name}`;
  };

  const renderMargin = () => {
    if (isUndefined(amm.underlyingToken.name)) {
      return 'Underlying token name undefined';
    }

    if (isSettle) {
      return `${formatCurrency(cachedMargin.current ?? 0)} ${amm.underlyingToken.name}`;
    }
    if (isUndefined(margin)) {
      return 'Margin undefined';
    }

    return `${formatCurrency(margin)} ${amm.underlyingToken.name}`;
  };

  return (
    <Panel
      sx={{
        marginTop: 12,
        width: (theme) => theme.spacing(97),
        boxShadow: '0px 0px 60px rgba(255, 89, 156, 0.2)',
      }}
      variant="dark"
    >
      {renderStatus()}
      <Panel variant="main">
        <AMMProvider amm={amm}>
          <ProtocolInformation
            fixedApr={fixedApr}
            isRollover={isRollover}
            isSettle={isSettle}
            protocol={amm.protocol}
            variableApy={variableApy}
          />
        </AMMProvider>

        {(isUndefined(isEditingMargin) || !isEditingMargin) && (
          <Box
            sx={{
              marginBottom: (theme) => theme.spacing(4),
            }}
          >
            <Typography label="NOTIONAL AMOUNT" variant="body2">
              {renderNotional()}
            </Typography>
          </Box>
        )}

        {(isUndefined(liquidityAction) || liquidityAction) && (
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
