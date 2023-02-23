import { Page as BrokoliPage } from 'brokoli-ui';
import * as React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  getAvailableNotionalsThunk,
  getFixedRateThunk,
  getVariableRateThunk,
} from '../../app/features/swap-form/thunks';
import { useAppDispatch } from '../../app/hooks';
import { Loading } from '../../components/atomic/Loading/Loading';
import { Panel } from '../../components/atomic/Panel/Panel';
import { useSwapFormAMM } from '../../hooks/useSwapFormAMM';
import { NoVaultFound } from '../LPOptimisers/VaultFormRoute/NoVaultFound/NoVaultFound';
import { Form } from './Form';
import { LeftPanel } from './LeftPanel';
import { Main } from './Main';
import { NoAMMFound } from './NoAMMFound/NoAMMFound';
import { TopPanel } from './TopPanel';
import {
  MainAndFormSectionBox,
  MainSectionBox,
  PageSectionBox,
  RightPageSectionBox,
  RightSectionBox,
} from './TraderForm.styled';

export const TraderFormRoute: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { form } = useParams();
  const { aMM, loading, error, idle } = useSwapFormAMM();

  useEffect(() => {
    if (!aMM) {
      return;
    }
    void dispatch(getFixedRateThunk());
    void dispatch(getVariableRateThunk());
    void dispatch(getAvailableNotionalsThunk());
  }, [dispatch, aMM]);

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
      <Panel
        sx={{
          width: '400px',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
        }}
        variant="grey-dashed"
      >
        <Loading />
      </Panel>
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
