import React, { useState } from 'react';

import { data, AugmentedAMM } from '@utilities';
import { useAMMs } from '@hooks';
import { AMMTable, AMMTableFields } from '@components/interface';

export type ConnectedAMMTableProps = {
  onSelectItem: (item: AugmentedAMM) => void;
};

const ConnectedAMMTable: React.FunctionComponent<ConnectedAMMTableProps> = ({ onSelectItem }) => {
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
