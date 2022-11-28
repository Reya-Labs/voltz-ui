import React, { ReactNode, useCallback, useState } from 'react';

import { actions, selectors } from '../../../store';
import { routes } from '../../../routes/paths';
import Box from '@mui/material/Box';
import { colors } from '../../../theme';
import { Typography } from '../../atomic/Typography/Typography';
import { Loading } from '../../atomic/Loading/Loading';
import { Panel } from '../../atomic/Panel/Panel';
import { RouteLink } from '../../atomic/RouteLink/RouteLink';
import { PendingTransaction } from '../../interface/PendingTransaction/PendingTransaction';
import { PositionTable } from '../../interface/PositionTable/PositionTable';
import { PortfolioHeader } from '../../interface/PortfolioHeader/PortfolioHeader';

import { AMM, Position } from '@voltz-protocol/v1-sdk';
import { useWallet } from '../../../hooks/useWallet';
import { Agents } from '../../../contexts/AgentContext/types';
import { usePortfolioContext } from '../../../contexts/PortfolioContext/PortfolioContext';
import { usePositions } from '../../../hooks/usePositions/usePositions';
import { useSelector } from '../../../hooks/useSelector';
import { useDispatch } from '../../../hooks/useDispatch';

export type ConnectedPositionTableProps = {
  onSelectItem: (item: Position, mode: 'margin' | 'liquidity' | 'rollover' | 'notional') => void;
  agent: Agents;
  amm?: AMM;
  handleCompletedSettling: () => void;
};

export const ConnectedPositionTable: React.FunctionComponent<ConnectedPositionTableProps> = ({
  onSelectItem,
  agent,
  handleCompletedSettling,
}) => {
  const { positionsByAgentGroup, loading, error } = usePositions();
  const { status } = useWallet();

  const [positionToSettle, setPositionToSettle] = useState<
    { txId: string; position: Position } | undefined
  >();
  const activeTransaction = useSelector(selectors.transactionSelector)(positionToSettle?.txId); // contains a failureMessage attribute that will contain whatever came out from the sdk
  const dispatch = useDispatch();

  const portfolioData = usePortfolioContext();

  const handleSettle = useCallback(
    (position: Position) => {
      const positionAmm = position.amm;
      const transaction = {
        notional: 0,
        margin: 0,
        ammId: positionAmm.id,
        agent,
        source: position.source,
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
      <Panel variant="main" sx={{ width: '100%', textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: colors.skyBlueCrayola.base }}>
          CONNECT YOUR WALLET
        </Typography>
      </Panel>
    );
  };

  const renderLoading = () => {
    return (
      <Panel variant="grey-dashed" sx={{ width: '100%' }}>
        <Loading sx={{ margin: '0 auto' }} />
      </Panel>
    );
  };

  const renderNoPositions = () => {
    return (
      <Panel variant="main" sx={{ width: '100%', textAlign: 'center' }}>
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

    const spData = portfolioData.info[positionToSettle.position.id];

    let netWithdraw = undefined;
    if (agent === Agents.LIQUIDITY_PROVIDER) {
      netWithdraw =
        typeof spData?.fees === 'number' && typeof spData?.settlementCashflow === 'number'
          ? spData?.margin + spData?.settlementCashflow
          : undefined;
    } else {
      netWithdraw =
        typeof spData?.settlementCashflow === 'number'
          ? spData?.margin + spData?.settlementCashflow
          : undefined;
    }

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <PendingTransaction
          amm={positionToSettle.position.amm}
          position={positionToSettle.position}
          isEditingMargin={false}
          isSettle={true}
          transactionId={positionToSettle.txId}
          onComplete={handleTransactionFinished}
          notional={
            agent === Agents.LIQUIDITY_PROVIDER
              ? Math.abs(positionToSettle.position.notional)
              : Math.abs(positionToSettle.position.effectiveVariableTokenBalance)
          }
          margin={netWithdraw}
          onBack={handleTransactionFinished}
        />
      </Box>
    );
  };

  const renderPositionTable = () => {
    if (!positionsByAgentGroup) return null;

    return (
      <>
        <PortfolioHeader currencyCode="USD" currencySymbol="$" portfolioData={portfolioData} />
        <Box sx={{ marginTop: (theme) => theme.spacing(14) }}>
          <PositionTable
            positions={positionsByAgentGroup}
            onSelectItem={onSelectItem}
            onSettle={handleSettle}
            portfolioData={portfolioData}
          />
        </Box>
      </>
    );
  };

  const renderContent = () => {
    let content: ReactNode = null;

    if (activeTransaction && positionToSettle) {
      return renderPendingTransaction(); // We return this one immediately as we dont want it wrapped in a Panel
    } else if (loading || status === 'connecting') {
      content = renderLoading();
    } else if (error || status !== 'connected') {
      content = renderConnectWallet();
    } else if (!positionsByAgentGroup) {
      content = renderNoPositions();
    } else {
      content = renderPositionTable();
    }

    return (
      <Panel variant="dark" sx={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        {content}
      </Panel>
    );
  };

  return renderContent();
};
