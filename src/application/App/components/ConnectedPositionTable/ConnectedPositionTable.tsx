import React, { useState, useCallback } from 'react';
import { Position } from '@voltz/v1-sdk';
import { data } from '@utilities';
import { usePositions } from '@hooks';
import { PositionTable, PositionTableFields } from '@components/interface';
import { Agents } from '@components/contexts';
import { actions, selectors } from '@store';
import { useAgent, useDispatch, useSelector } from '@hooks';
import { AugmentedAMM } from '@utilities';

export type ConnectedAMMTableProps = {
  onSelectItem: (item: Position) => void;
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
  const [transactionId, setTransactionId] = useState<string | undefined>();

  const dispatch = useDispatch();
  
  const handleSubmit = useCallback(
    () => {
      // todo: settle transaction type should be different
      const transaction = { notional: 0, margin: 0,  ammId: amm.id, agent };
    
      const settlePosition = actions.settlePositionAction(amm, transaction);
      
      setTransactionId(settlePosition.payload.transaction.id);
      dispatch(settlePosition);

    },
    [setTransactionId, dispatch, agent, amm.id],
  );


  if (!positionsByAgent || loading || error) {
    return null;
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
      handleSubmit={handleSubmit}
      agent={agent}
    />
  );
};

export default ConnectedPositionTable;
