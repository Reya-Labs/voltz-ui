import { RainbowLoader } from 'brokoli-ui';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { resetStateAction } from '../../../app/features/swap-form';
import { useAppDispatch } from '../../../app/hooks';
import { useSwapFormAMM } from '../../../hooks/useSwapFormAMM';
import { VoltzPage } from '../../components/VoltzPage';
import { Form } from './Form';
import { Main } from './Main';
import { NoAMMFound } from './NoAMMFound/NoAMMFound';
import { LoadingBox, RainbowLoadingBox } from './TraderForm.styled';

const LoadingPage: React.FunctionComponent = React.memo(() => (
  <LoadingBox>
    <RainbowLoadingBox>
      <RainbowLoader height={2} text="Fetching best rates..." />
    </RainbowLoadingBox>
  </LoadingBox>
));

export const TraderFormPage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const { form } = useParams();
  const { noAMMFound, loading, error } = useSwapFormAMM();

  React.useEffect(() => {
    return () => {
      dispatch(resetStateAction());
    };
  }, []);

  const pageNotFound = form !== 'swap' || noAMMFound || error;

  return (
    <VoltzPage
      MainSlotComponent={Main}
      NotFoundSlotComponent={pageNotFound ? NoAMMFound : undefined}
      PageLoadingSlotComponent={loading ? LoadingPage : undefined}
      RightSlotComponent={Form}
    />
  );
};
