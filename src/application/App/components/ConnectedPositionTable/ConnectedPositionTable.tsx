import { Position } from '@voltz-protocol/v1-sdk';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { data } from '@utilities';
import { usePositions } from '@hooks';
import { PortfolioHeader, PositionTable, PositionTableFields } from '@components/interface';
import { Panel } from '@components/atomic';
import { Agents } from '@components/contexts';
import { actions, selectors, Transaction } from '@store';
import { useAgent, useDispatch, useSelector } from '@hooks';
import { AugmentedAMM } from '@utilities';
import { routes } from '@routes';
import { RouteLink } from '@components/atomic';
import { Box } from '@mui/material';

export type ConnectedAMMTableProps = {
  onSelectItem: (item: Position, mode: 'margin' | 'liquidity') => void;
  agent: Agents
  amm?: AugmentedAMM;
};

const ConnectedPositionTable: React.FunctionComponent<ConnectedAMMTableProps> = ({
  onSelectItem,
  agent,
  amm
}) => {
  const [order, setOrder] = useState<data.TableOrder>('desc');
  const [orderBy, setOrderBy] = useState<PositionTableFields>('maturity');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState<number | null>(null);
  const { positionsByAgentGroup, loading, error } = usePositions();
  const pages = 0;
  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId);

  const dispatch = useDispatch();
  
  const handleSettle = useCallback(
    (position: Position) => {

      const positionAmm = position.amm as AugmentedAMM;
      const transaction = {
        notional: 0, 
        margin: 0,  
        ammId: positionAmm.id, 
        agent, 
        source: position.source, 
        fixedLow: position.fixedRateLower.toNumber(), 
        fixedHigh: position.fixedRateUpper.toNumber()
      };
      const settlePosition = actions.settlePositionAction(positionAmm, transaction);
      
      setTransactionId(settlePosition.payload.transaction.id);
      dispatch(settlePosition);
    },  [setTransactionId, dispatch, agent, amm?.id],
  );

  const navigate = useNavigate();

  if(loading || error) {
    return null;
  }

  if (!positionsByAgentGroup) {
    return (
      <Panel variant='dark' sx={{textAlign: 'center' }}>
        <Panel variant='main' sx={{
          width: '100%', 
          maxWidth: '900px', 
          textAlign: 'center',
        }}>
          <RouteLink to={agent === Agents.LIQUIDITY_PROVIDER ? `/${routes.POOLS}` : `/${routes.SWAP}`}>
            OPEN YOUR FIRST POSITION
          </RouteLink>
        </Panel>
      </Panel>
    )
  }

  return (
    <>
      <PortfolioHeader
        currencyCode='USD'
        currencySymbol='$'
        netMargin={1939.3}
        netMarginDiff={agent === Agents.LIQUIDITY_PROVIDER ? -300 : 300}
        netNotional={183002.74}
        netRateReceiving={agent !== Agents.LIQUIDITY_PROVIDER ? 3.55 : undefined}
        netRatePaying={agent !== Agents.LIQUIDITY_PROVIDER ? 1.55 : undefined}
        feesApy={agent === Agents.LIQUIDITY_PROVIDER ? 3.55 : undefined}
        positionsDanger={1}
        positionsHealthy={1}
        positionsWarning={1}
      />
      <Box sx={{ marginTop: (theme) => theme.spacing(14) }}>
        <PositionTable
          positions={positionsByAgentGroup}
          order={order}
          onSetOrder={setOrder}
          orderBy={orderBy}
          onSetOrderBy={setOrderBy}
          page={page}
          pages={pages}
          onSetPage={setPage}
          size={size}
          onSetSize={setSize}
          onSelectItem={onSelectItem}
          handleSettle={handleSettle}
          agent={agent}
        />
      </Box>
    </>
  );
};

export default ConnectedPositionTable;

