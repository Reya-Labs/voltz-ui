import Box from '@mui/material/Box';
import { Position } from '@voltz-protocol/v1-sdk';
import React, { ReactNode, useCallback, useState } from 'react';

import { Agents } from '../../../contexts/AgentContext/types';
import { usePortfolioContext } from '../../../contexts/PortfolioContext/PortfolioContext';
import { useWallet } from '../../../hooks/useWallet';
import { routes } from '../../../routes/paths';
import { actions, selectors } from '../../../store';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { colors } from '../../../theme';
import { Loading } from '../../atomic/Loading/Loading';
import { Panel } from '../../atomic/Panel/Panel';
import { RouteLink } from '../../atomic/RouteLink/RouteLink';
import { Typography } from '../../atomic/Typography/Typography';
import { PendingTransaction } from '../../interface/PendingTransaction/PendingTransaction';
import { PortfolioHeader } from '../../interface/PortfolioHeader/PortfolioHeader';
import { PositionTable } from '../../interface/PositionTable/PositionTable';

export type ConnectedPositionTableProps = {
  onSelectItem: (item: Position, mode: 'margin' | 'liquidity' | 'rollover' | 'notional') => void;
  agent: Agents;
  positions: Position[];
  loadingPositions: boolean;
  errorPositions: boolean;
  handleCompletedSettling: () => void;
};

export const ConnectedPositionTable: React.FunctionComponent<ConnectedPositionTableProps> = ({
  onSelectItem,
  agent,
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

  const portfolioData = usePortfolioContext();

  const handleSettle = useCallback(
    (position: Position) => {
      const positionAmm = position.amm;
      const transaction = {
        notional: 0,
        margin: 0,
        ammId: positionAmm.id,
        agent,
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
    [dispatch, agent],
  );

  const handleTransactionFinished = () => {
    handleCompletedSettling();
    if (positionToSettle) {
      const action = actions.closeTransaction(positionToSettle.txId);
      dispatch(action);
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
        <RouteLink
          to={
            agent === Agents.LIQUIDITY_PROVIDER ? `/${routes.LP_POOLS}` : `/${routes.TRADER_POOLS}`
          }
        >
          OPEN YOUR FIRST POSITION
        </RouteLink>
      </Panel>
    );
  };

  const renderPendingTransaction = () => {
    if (!positionToSettle) return null;

    let netWithdraw = undefined;
    if (agent === Agents.LIQUIDITY_PROVIDER) {
      netWithdraw = positionToSettle.position.margin + positionToSettle.position.settlementCashflow;
    } else {
      netWithdraw = positionToSettle.position.margin + positionToSettle.position.settlementCashflow;
    }

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
        <PortfolioHeader currencyCode="USD" currencySymbol="$" portfolioData={portfolioData} />
        <Box sx={{ marginTop: (theme) => theme.spacing(14) }}>
          <PositionTable
            portfolioData={portfolioData}
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
