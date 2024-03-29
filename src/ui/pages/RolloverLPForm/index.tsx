import * as React from 'react';

import { routes, useAppDispatch } from '../../../app';
import { resetStateAction } from '../../../app/features/forms/lps/rollover-lp';
import { GenericError } from '../../components/GenericError';
import { NoPoolFound } from '../../components/NoPoolFound';
import { Page } from '../../components/Page';
import { PageLoading } from '../../components/PageLoading';
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
    <Page
      errorSlot={error ? <GenericError to={`/${routes.POOLS}`} /> : undefined}
      mainSlot={<Main />}
      notFoundSlot={noAMMFound ? <NoPoolFound to={`/${routes.POOLS}`} /> : undefined}
      pageLoadingSlot={loading ? <PageLoading /> : undefined}
      rightSlot={<Form />}
    />
  );
};
