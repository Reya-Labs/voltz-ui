import { Position, PositionInfo } from '@voltz-protocol/v1-sdk';
import React, { useCallback, useState } from 'react';

import { data } from '@utilities';
import { usePositions } from '@hooks';
import { PositionTable, PositionTableFields } from '@components/interface';
import { Panel } from '@components/atomic';
import { Agents } from '@components/contexts';
import { actions } from '@store';
import { useDispatch } from '@hooks';
import { AugmentedAMM } from '@utilities';
import { routes } from '@routes';
import { RouteLink } from '@components/atomic';
import { useEffect } from '@storybook/addons';

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
  const { positionsByAgent, loading, error } = usePositions();
  const pages = 0;

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
    
      dispatch(settlePosition);
    },  [dispatch, agent],
  );

  if(loading || error) {
    return null;
  }

  if (!positionsByAgent) {
    return (
      <Panel variant='dark' sx={{textAlign: 'center', marginTop: 10 }}>
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

  const [positionInformation, setPositionInformation] = useState<>();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    for (const p of positionsByAgent) {
      const positionInformation = p.amm.getPositionInformation(p);
    }
  }, []);

  return (
    <PositionTable
      positions={positionsByAgent}
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
  );
};

export default ConnectedPositionTable;

