import React, { useState } from 'react';

import { useAMMs } from '@hooks';
import { AMMTable } from '@components/interface';

import { AMM } from '@voltz-protocol/v1-sdk';

export type ConnectedAMMTableProps = {
  onSelectItem: (item: AMM) => void;
};

const ConnectedAMMTable: React.FunctionComponent<ConnectedAMMTableProps> = ({ onSelectItem }) => {
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
