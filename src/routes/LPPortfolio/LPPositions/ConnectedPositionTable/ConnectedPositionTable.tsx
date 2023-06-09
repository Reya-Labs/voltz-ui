import Box from '@mui/material/Box';
import { Position } from '@voltz-protocol/v1-sdk';
import React, { ReactNode, useCallback, useState } from 'react';

import { selectors } from '../../../../app';
import { initializeSettleFlowAction } from '../../../../app/features/settle-flow';
import { closeTransactionAction } from '../../../../app/features/transactions';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { Loading } from '../../../../components/atomic/Loading/Loading';
import { Panel } from '../../../../components/atomic/Panel/Panel';
import { RouteLink } from '../../../../components/atomic/RouteLink/RouteLink';
import { PendingTransaction } from '../../../../components/interface/PendingTransaction/PendingTransaction';
import { useWallet } from '../../../../hooks/useWallet';
import { SettleFlow } from '../../../../ui/components/SettleFlow';
import { routes } from '../../../paths';
import { NoPositionsOrVaultsFound } from '../../NoPositionsOrVaultsFound/NoPositionsOrVaultsFound';
import { PortfolioHeader } from './PortfolioHeader/PortfolioHeader';
import { PositionStatus, PositionStatusToggle } from './PositionStatusToggle/PositionStatusToggle';
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
  handleCompletedSettling,
}) => {
  const { status, account } = useWallet();
  const [positionStatus, setPositionStatus] = useState<PositionStatus>('open');

  const [positionToSettle, setPositionToSettle] = useState<
    { txId: string; position: Position } | undefined
  >();
  const activeTransaction = useAppSelector(selectors.transactionSelector)(positionToSettle?.txId); // contains a failureMessage attribute that will contain whatever came out from the sdk
  const dispatch = useAppDispatch();

  const handleSettle = useCallback(
    (position: Position) => {
      dispatch(
        initializeSettleFlowAction({
          position,
          account,
          positionDetails: null,
        }),
      );
    },
    [account, dispatch],
  );

  const handleTransactionFinished = () => {
    handleCompletedSettling();
    if (positionToSettle) {
      dispatch(closeTransactionAction(positionToSettle.txId));
      setPositionToSettle(undefined);
    }
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

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <PendingTransaction
          amm={positionToSettle.position.amm}
          isEditingMargin={false}
          isSettle={true}
          margin={
            positionToSettle.position.margin +
            positionToSettle.position.settlementCashflow +
            positionToSettle.position.fees
          }
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
    if (positions.length === 0) return null;
    const filteredPositions = positions.filter((p) => {
      const isSettled = positionStatus === 'settled';
      return p.isSettled === isSettled;
    });

    return (
      <>
        <SettleFlow />
        <PortfolioHeader positions={positions} />
        <PositionStatusToggle status={positionStatus} onChange={setPositionStatus} />
        <Box sx={{ marginTop: (theme) => theme.spacing(6) }}>
          {positionStatus === 'open' && filteredPositions.length === 0 ? (
            <NoPositionsOrVaultsFound
              description="Open your first position here:"
              navigateTo={`/${routes.POOLS}`}
              navigateToText="LP POOLS"
              title="You haven’t provided liquidity to any pool yet."
            />
          ) : positionStatus === 'settled' && filteredPositions.length === 0 ? (
            <NoPositionsOrVaultsFound
              description="Settled positions are listed here, to help you keep track of all your LP activities."
              title="Settled positions will appear here."
            />
          ) : (
            <PositionTable
              positions={filteredPositions}
              onSelectItem={onSelectItem}
              onSettle={handleSettle}
            />
          )}
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
    } else if (positions.length === 0) {
      content = renderNoPositions();
    } else {
      content = renderPositionTable();
    }

    return content;
  };

  return <>{renderContent()}</>;
};
