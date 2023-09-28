import React from 'react';

import { routes } from '../../../../app';
import { GenericError } from '../../../components/GenericError';
import { Page } from '../../../components/Page';
import { useAMMs } from '../../../hooks/useAMMs';
import { Pools } from './Pools';

export const DeprecatedPoolsPage: React.FunctionComponent = () => {
  const { error } = useAMMs();

  return (
    <Page
      errorSlot={error ? <GenericError to={`/${routes.POOLS}`} /> : undefined}
      mainSlot={<Pools />}
    />
  );
};
