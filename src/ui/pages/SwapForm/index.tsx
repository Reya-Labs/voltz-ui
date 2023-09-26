import * as React from 'react';

import { routes, useAppDispatch } from '../../../app';
import { resetStateAction } from '../../../app/features/forms/trader/swap';
import { GenericError } from '../../components/GenericError';
import { NoAMMFound } from '../../components/NoAMMFound';
import { Page } from '../../components/Page';
import { PageLoading } from '../../components/PageLoading';
import { Form } from './Form';
import { useSwapFormPool } from './hooks/useSwapFormPool';
import { Main } from './Main';

export const SwapFormPage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const { noPoolFound, loading, error } = useSwapFormPool();

  React.useEffect(() => {
    return () => {
      dispatch(resetStateAction());
    };
  }, []);

  return (
    <Page
      errorSlot={error ? <GenericError to={`/${routes.POOLS}`} /> : undefined}
      mainSlot={<Main />}
      notFoundSlot={noPoolFound ? <NoAMMFound to={`/${routes.POOLS}`} /> : undefined}
      pageLoadingSlot={loading ? <PageLoading /> : undefined}
      rightSlot={<Form />}
    />
  );
};
