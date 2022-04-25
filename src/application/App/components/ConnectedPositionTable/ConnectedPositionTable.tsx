import React, { useCallback, useState } from 'react';
import { Position } from '@voltz/v1-sdk';
import { useNavigate } from 'react-router-dom';

import { data } from '@utilities';
import { usePositions } from '@hooks';
import { PositionTable, PositionTableFields } from '@components/interface';
import { Panel } from '@components/atomic';
import { Agents } from '@components/contexts';
import { routes } from '@routes';
import { RouteLink } from '@components/atomic';

export type ConnectedAMMTableProps = {
  onSelectItem: (item: Position) => void;
  agent: Agents
};

const ConnectedPositionTable: React.FunctionComponent<ConnectedAMMTableProps> = ({
  onSelectItem,
  agent
}) => {
  const [order, setOrder] = useState<data.TableOrder>('desc');
  const [orderBy, setOrderBy] = useState<PositionTableFields>('maturity');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState<number | null>(null);
  const { positionsByAgent, loading, error } = usePositions();
  const pages = 0;
  const navigate = useNavigate();

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
      agent={agent}
    />
  );
};

export default ConnectedPositionTable;

