import { Page } from 'brokoli-ui';
import React from 'react';

import { LeftPanel } from './LeftPanel';
import { TopPanel } from './TopPanel';
import {
  MainAndFormSectionBox,
  MainSectionBox,
  PageSectionBox,
  RightPageSectionBox,
  RightSectionBox,
} from './VoltzPage.styled';

type VoltzPageProps = {
  MainSlotComponent: React.FunctionComponent;
  RightSlotComponent: React.FunctionComponent;
  NotFoundSlotComponent?: React.FunctionComponent;
  PageLoadingSlotComponent?: React.FunctionComponent;
};
export const VoltzPage: React.FunctionComponent<VoltzPageProps> = ({
  MainSlotComponent,
  RightSlotComponent,
  NotFoundSlotComponent,
  PageLoadingSlotComponent,
}) => {
  let pageContent = (
    <MainAndFormSectionBox data-testid="VoltzPage-MainAndFormSectionBox">
      <MainSectionBox data-testid="VoltzPage-MainSectionBox">
        {MainSlotComponent && <MainSlotComponent />}
      </MainSectionBox>
      <RightSectionBox data-testid="VoltzPage-RightSectionBox">
        {RightSlotComponent && <RightSlotComponent />}
      </RightSectionBox>
    </MainAndFormSectionBox>
  );
  if (NotFoundSlotComponent) {
    pageContent = <NotFoundSlotComponent />;
  } else if (PageLoadingSlotComponent) {
    pageContent = <PageLoadingSlotComponent />;
  }
  return (
    <Page data-testid="VoltzPage">
      <PageSectionBox data-testid="VoltzPage-PageSectionBox">
        <LeftPanel />
        <RightPageSectionBox data-testid="VoltzPage-RightPageSectionBox">
          <TopPanel />
          {pageContent}
        </RightPageSectionBox>
      </PageSectionBox>
    </Page>
  );
};
