import * as React from 'react';

import { resetStateAction } from '../../../app/features/forms/trader/rollover-swap';
import { useAppDispatch } from '../../../app/hooks';
import { routes } from '../../../app/paths';
import { GenericError } from '../../components/GenericError';
import { NoAMMFound } from '../../components/NoAMMFound';
import { Page } from '../../components/Page';
import { PageLoading } from '../../components/PageLoading';
import { Form } from './Form';
import { useRolloverSwapFormAMM } from './hooks/useRolloverSwapFormAMM';
import { Main } from './Main';

export const RolloverSwapFormPage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const { noAMMFound, loading, error } = useRolloverSwapFormAMM();

  React.useEffect(() => {
    return () => {
      dispatch(resetStateAction());
    };
  }, []);

  return (
    <Page
      errorSlot={error ? <GenericError to={`/${routes.POOLS}`} /> : undefined}
      mainSlot={<Main />}
      notFoundSlot={noAMMFound ? <NoAMMFound to={`/${routes.POOLS}`} /> : undefined}
      pageLoadingSlot={loading ? <PageLoading /> : undefined}
      rightSlot={<Form />}
    />
  );
};
