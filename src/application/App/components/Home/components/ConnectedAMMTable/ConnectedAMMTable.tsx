import React, { useState } from 'react';
import { AMM } from '@voltz/v1-sdk';

import { data } from '@utilities';
import { useAMMs } from '@hooks';
import { AMMTable, AMMTableFields } from '@components/interface';

export type ConnectedAMMTableProps = {
  mode: data.Mode;
  onSelectItem: (item: AMM) => void;
};

const ConnectedAMMTable: React.FunctionComponent<ConnectedAMMTableProps> = ({
  mode,
  onSelectItem,
}) => {
  const [order, setOrder] = useState<data.TableOrder>('desc');
  const [orderBy, setOrderBy] = useState<AMMTableFields>('maturity');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState<number | null>(null);
  const { amms, loading, error } = useAMMs();
  const pages = 0;

  if (!amms || loading || error) {
    return null;
  }

  return (
    <AMMTable
      mode={mode}
      amms={amms}
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

export default ConnectedAMMTable;
