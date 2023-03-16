import * as React from 'react';
import { useParams } from 'react-router-dom';

import { resetStateAction } from '../../../app/features/swap-form';
import { useAppDispatch } from '../../../app/hooks';
import { useSwapFormAMM } from '../../../hooks/useSwapFormAMM';
import { NoAMMFound } from '../../components/NoAMMFound';
import { PageLoading } from '../../components/PageLoading';
import { VoltzPage } from '../../components/VoltzPage';
import { Form } from './Form';
import { Main } from './Main';

export const LPFormPage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const { form } = useParams();
  const { noAMMFound, loading, error } = useSwapFormAMM();

  React.useEffect(() => {
    return () => {
      dispatch(resetStateAction());
    };
  }, []);

  const pageNotFound = form !== 'liquidity' || noAMMFound || error;

  return (
    <VoltzPage
      MainSlotComponent={Main}
      NotFoundSlotComponent={pageNotFound ? NoAMMFound : undefined}
      PageLoadingSlotComponent={loading ? PageLoading : undefined}
      RightSlotComponent={Form}
    />
  );
};
