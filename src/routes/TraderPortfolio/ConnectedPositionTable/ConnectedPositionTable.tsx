import Box from '@mui/material/Box';
import { Position } from '@voltz-protocol/v1-sdk';
import React, { ReactNode, useCallback, useState } from 'react';

import { actions, selectors } from '../../../app';
import { closeTransactionAction } from '../../../app/features/transactions';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Loading } from '../../../components/atomic/Loading/Loading';
import { Panel } from '../../../components/atomic/Panel/Panel';
import { RouteLink } from '../../../components/atomic/RouteLink/RouteLink';
import { Typography } from '../../../components/atomic/Typography/Typography';
import { PendingTransaction } from '../../../components/interface/PendingTransaction/PendingTransaction';
import { Agents } from '../../../contexts/AgentContext/types';
import { useWallet } from '../../../hooks/useWallet';
import { colors } from '../../../theme';
import { routes } from '../../paths';
import { PortfolioHeader } from './PortfolioHeader/PortfolioHeader';
import { PositionTable } from './PositionTable/PositionTable';

export type ConnectedPositionTableProps = {
  onSelectItem: (item: Position, mode: 'margin' | 'liquidity' | 'rollover' | 'notional') => void;
  positions: Position[];
  loadingPositions: boolean;
  errorPositions: boolean;
  handleCompletedSettling: () => void;
};

export const ConnectedPositionTable: React.FunctionComponent<ConnectedPositionTableProps> = ({
  onSelectItem,
  positions,
  loadingPositions,
  errorPositions,
  handleCompletedSettling,
}) => {
  const { status } = useWallet();

  const [positionToSettle, setPositionToSettle] = useState<
    { txId: string; position: Position } | undefined
  >();
  const activeTransaction = useAppSelector(selectors.transactionSelector)(positionToSettle?.txId); // contains a failureMessage attribute that will contain whatever came out from the sdk
  const dispatch = useAppDispatch();

  const handleSettle = useCallback(
    (position: Position) => {
      const positionAmm = position.amm;
      const transaction = {
        notional: 0,
        margin: 0,
        ammId: positionAmm.id,
        agent: Agents.FIXED_TRADER,
        fixedLow: position.fixedRateLower.toNumber(),
        fixedHigh: position.fixedRateUpper.toNumber(),
      };
      const settlePositionAction = actions.settlePositionAction(positionAmm, transaction);
      setPositionToSettle({
        position,
        txId: settlePositionAction.payload.transaction.id,
      });
      dispatch(settlePositionAction);
    },
    [dispatch],
  );

  const handleTransactionFinished = () => {
    handleCompletedSettling();
    if (positionToSettle) {
      dispatch(closeTransactionAction(positionToSettle.txId));
      setPositionToSettle(undefined);
    }
  };

  const renderConnectWallet = () => {
    return (
      <Panel sx={{ width: '100%', textAlign: 'center' }} variant="main">
        <Typography sx={{ color: colors.skyBlueCrayola.base }} variant="h6">
          CONNECT YOUR WALLET
        </Typography>
      </Panel>
    );
  };

  const renderLoading = () => {
    return (
      <Panel sx={{ width: '100%' }} variant="grey-dashed">
        <Loading />
      </Panel>
    );
  };

  const renderNoPositions = () => {
    return (
      <Panel sx={{ width: '100%', textAlign: 'center' }} variant="main">
        <RouteLink to={`/${routes.POOLS}`}>OPEN YOUR FIRST POSITION</RouteLink>
      </Panel>
    );
  };

  const renderPendingTransaction = () => {
    if (!positionToSettle) return null;

    const netWithdraw =
      positionToSettle.position.margin + positionToSettle.position.settlementCashflow;

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <PendingTransaction
          amm={positionToSettle.position.amm}
          isEditingMargin={false}
          isSettle={true}
          margin={netWithdraw}
          notional={positionToSettle.position.notional}
          position={positionToSettle.position}
          transactionId={positionToSettle.txId}
          onBack={handleTransactionFinished}
          onComplete={handleTransactionFinished}
        />
      </Box>
    );
  };

  const renderPositionTable = () => {
    return (
      <>
        <PortfolioHeader positions={positions} />
        <Box sx={{ marginTop: (theme) => theme.spacing(14) }}>
          <PositionTable
            positions={positions}
            onSelectItem={onSelectItem}
            onSettle={handleSettle}
          />
        </Box>
      </>
    );
  };

  const renderContent = () => {
    let content: ReactNode = null;

    if (activeTransaction && positionToSettle) {
      return renderPendingTransaction(); // We return this one immediately as we don't want it wrapped in a Panel
    } else if (loadingPositions || status === 'connecting') {
      content = renderLoading();
    } else if (errorPositions || status !== 'connected') {
      content = renderConnectWallet();
    } else if (positions.length === 0) {
      content = renderNoPositions();
    } else {
      content = renderPositionTable();
    }

    return (
      <Panel sx={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }} variant="dark">
        {content}
      </Panel>
    );
  };

  return renderContent();
};
