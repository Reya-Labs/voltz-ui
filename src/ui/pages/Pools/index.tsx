import React from 'react';

import { useAMMs } from '../../../hooks/useAMMs';
import { routes } from '../../../routes/paths';
import { GenericError } from '../../components/GenericError';
import { Page } from '../../components/Page';
import { Pools } from './Pools';

export const PoolsPage: React.FunctionComponent = () => {
  const { error } = useAMMs();

  return (
    <Page
      errorSlot={error ? <GenericError to={`/${routes.POOLS}`} /> : undefined}
      mainSlot={<Pools />}
    />
  );
};
