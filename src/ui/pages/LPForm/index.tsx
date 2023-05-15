import * as React from 'react';

import { resetStateAction } from '../../../app/features/forms/lps/lp';
import { useAppDispatch } from '../../../app/hooks';
import { routes } from '../../../routes/paths';
import { AMMFetchingError } from '../../components/AMMFetchingError';
import { NoAMMFound } from '../../components/NoAMMFound';
import { PageLoading } from '../../components/PageLoading';
import { VoltzPage } from '../../components/VoltzPage';
import { Form } from './Form';
import { useLPFormAMM } from './hooks/useLPFormAMM';
import { Main } from './Main';

export const LPFormPage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { noAMMFound, loading, error } = useLPFormAMM();

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
