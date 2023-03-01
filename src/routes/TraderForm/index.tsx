import { Page as BrokoliPage, RainbowLoader } from 'brokoli-ui';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { resetStateAction } from '../../app/features/swap-form';
import { useAppDispatch } from '../../app/hooks';
import { useSwapFormAMM } from '../../hooks/useSwapFormAMM';
import { NoVaultFound } from '../LPOptimisers/VaultFormRoute/NoVaultFound/NoVaultFound';
import { Form } from './Form';
import { LeftPanel } from './LeftPanel';
import { Main } from './Main';
import { NoAMMFound } from './NoAMMFound/NoAMMFound';
import { TopPanel } from './TopPanel';
import {
  LoadingBox,
  MainAndFormSectionBox,
  MainSectionBox,
  PageSectionBox,
  RainbowLoadingBox,
  RightPageSectionBox,
  RightSectionBox,
} from './TraderForm.styled';

export const TraderFormRoute: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const { form } = useParams();
  const { aMM, loading, error, idle } = useSwapFormAMM();

  React.useEffect(() => {
    void dispatch(resetStateAction());
  }, [dispatch]);

  let pageContent = (
    <MainAndFormSectionBox data-testid="BrokoliPage-MainAndFormSectionBox">
      <MainSectionBox data-testid="BrokoliPage-MainSectionBox">
        <Main />
      </MainSectionBox>
      <RightSectionBox data-testid="BrokoliPage-RightSectionBox">
        <Form />
      </RightSectionBox>
    </MainAndFormSectionBox>
  );

  if (!aMM || error) {
    pageContent = <NoAMMFound />;
  }

  if (loading || idle) {
    pageContent = (
      <LoadingBox>
        <RainbowLoadingBox>
          <RainbowLoader height={3} text="Fetching best rates..." />
        </RainbowLoadingBox>
      </LoadingBox>
    );
  }

  if (form !== 'swap') {
    pageContent = <NoVaultFound />;
  }

  return (
    <BrokoliPage data-testid="BrokoliPage">
      <PageSectionBox data-testid="BrokoliPage-PageSectionBox">
        <LeftPanel />
        <RightPageSectionBox data-testid="BrokoliPage-RightPageSectionBox">
          <TopPanel />
          {pageContent}
        </RightPageSectionBox>
      </PageSectionBox>
    </BrokoliPage>
  );
};
