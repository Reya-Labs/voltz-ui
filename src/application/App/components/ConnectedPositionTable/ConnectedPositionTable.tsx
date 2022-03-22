import React, { useState } from 'react';
import { Position } from '@voltz/v1-sdk';

import { data } from '@utilities';
import { usePositions } from '@hooks';
import { PositionTable, PositionTableFields } from '@components/interface';

export type ConnectedAMMTableProps = {
  onSelectItem: (item: Position) => void;
};

const ConnectedPositionTable: React.FunctionComponent<ConnectedAMMTableProps> = ({
  onSelectItem,
}) => {
  const [order, setOrder] = useState<data.TableOrder>('desc');
  const [orderBy, setOrderBy] = useState<PositionTableFields>('maturity');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState<number | null>(null);
  const { positionsByAgent, loading, error } = usePositions();
  const pages = 0;

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
    />
  );
};

export default ConnectedPositionTable;
