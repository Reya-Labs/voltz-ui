import * as React from 'react';

import { routes, useAppDispatch } from '../../../app';
import { resetStateAction } from '../../../app/features/forms/trader/swap';
import { GenericError } from '../../components/GenericError';
import { NoMarginAccountFound } from '../../components/NoMarginAccountFound';
import { NoPoolFound } from '../../components/NoPoolFound';
import { Page } from '../../components/Page';
import { PageLoading } from '../../components/PageLoading';
import { Form } from './Form';
import { useSwapFormPoolAndMarginAccount } from './hooks/useSwapFormPoolAndMarginAccount';
import { Main } from './Main';

export const SwapFormPage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const { noMarginAccountFound, noPoolFound, loading, error } = useSwapFormPoolAndMarginAccount();

  React.useEffect(() => {
    return () => {
      dispatch(resetStateAction());
    };
  }, []);

  return (
    <Page
      errorSlot={error ? <GenericError to={`/${routes.POOLS}`} /> : undefined}
      mainSlot={<Main />}
      notFoundSlot={
        noPoolFound ? (
          <NoPoolFound to={`/${routes.POOLS}`} />
        ) : noMarginAccountFound ? (
          <NoMarginAccountFound to={`/${routes.POOLS}`} />
        ) : undefined
      }
      pageLoadingSlot={loading ? <PageLoading /> : undefined}
      rightSlot={<Form />}
    />
  );
};
