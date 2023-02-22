import { Page as BrokoliPage } from 'brokoli-ui';
import * as React from 'react';

import { Form } from './Form';
import { LeftPanel } from './LeftPanel';
import { Main } from './Main';
import { TopPanel } from './TopPanel';
import {
  MainAndFormSectionBox,
  MainSectionBox,
  PageSectionBox,
  RightPageSectionBox,
  RightSectionBox,
} from './TraderPosition.styled';

export const TraderPositionRoute: React.FunctionComponent = () => {
  return (
    <BrokoliPage data-testid="BrokoliPage">
      <PageSectionBox data-testid="BrokoliPage-PageSectionBox">
        <LeftPanel />
        <RightPageSectionBox data-testid="BrokoliPage-RightPageSectionBox">
          <TopPanel />
          <MainAndFormSectionBox data-testid="BrokoliPage-MainAndFormSectionBox">
            <MainSectionBox data-testid="BrokoliPage-MainSectionBox">
              <Main />
            </MainSectionBox>
            <RightSectionBox data-testid="BrokoliPage-RightSectionBox">
              <Form />
            </RightSectionBox>
          </MainAndFormSectionBox>
        </RightPageSectionBox>
      </PageSectionBox>
    </BrokoliPage>
  );
};
