import React from 'react';

import { useAMMs } from '../../../hooks/useAMMs';
import { routes } from '../../../routes/paths';
import { AMMFetchingError } from '../../components/AMMFetchingError';
import { VoltzPage } from '../../components/VoltzPage';
import { Pools } from './Pools';

export const PoolsPage: React.FunctionComponent = () => {
  const { error } = useAMMs();

  return (
    <VoltzPage
      errorSlot={error ? <AMMFetchingError to={`/${routes.POOLS}`} /> : undefined}
      mainSlot={<Pools />}
    />
  );
};
