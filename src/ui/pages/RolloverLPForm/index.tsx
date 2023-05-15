import * as React from 'react';

import { resetStateAction } from '../../../app/features/forms/lps/rollover-lp';
import { useAppDispatch } from '../../../app/hooks';
import { routes } from '../../../routes/paths';
import { AMMFetchingError } from '../../components/AMMFetchingError';
import { NoAMMFound } from '../../components/NoAMMFound';
import { PageLoading } from '../../components/PageLoading';
import { VoltzPage } from '../../components/VoltzPage';
import { Form } from './Form';
import { useRolloverLPFormAMM } from './hooks/useRolloverLPFormAMM';
import { Main } from './Main';

export const RolloverLPFormPage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { noAMMFound, loading, error } = useRolloverLPFormAMM();

  React.useEffect(() => {
    return () => {
      dispatch(resetStateAction());
    };
  }, []);

  return (
    <VoltzPage
      errorSlot={error ? <AMMFetchingError to={`/${routes.POOLS}`} /> : undefined}
      mainSlot={<Main />}
      notFoundSlot={noAMMFound ? <NoAMMFound to={`/${routes.POOLS}`} /> : undefined}
      pageLoadingSlot={loading ? <PageLoading /> : undefined}
      rightSlot={<Form />}
    />
  );
};
