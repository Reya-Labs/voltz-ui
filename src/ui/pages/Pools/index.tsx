import React from 'react';

import { routes } from '../../../app';
import { GenericError } from '../../components/GenericError';
import { Page } from '../../components/Page';
import { usePools } from '../../hooks/usePools';
import { Pools } from './Pools';

export const PoolsPage: React.FunctionComponent = () => {
  const { error } = usePools();

  return (
    <Page
      errorSlot={error ? <GenericError to={`/${routes.POOLS}`} /> : undefined}
      mainSlot={<Pools />}
    />
  );
};
