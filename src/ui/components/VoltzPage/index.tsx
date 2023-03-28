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
  mainSlot: React.ReactNode;
  errorSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  notFoundSlot?: React.ReactNode;
  pageLoadingSlot?: React.ReactNode;
};
export const VoltzPage: React.FunctionComponent<VoltzPageProps> = ({
  mainSlot,
  rightSlot,
  errorSlot,
  notFoundSlot,
  pageLoadingSlot,
}) => {
  let pageContent: React.ReactNode = (
    <MainAndFormSectionBox data-testid="VoltzPage-MainAndFormSectionBox">
      {mainSlot ? (
        <MainSectionBox data-testid="VoltzPage-MainSectionBox">{mainSlot}</MainSectionBox>
      ) : null}
      {rightSlot ? (
        <RightSectionBox data-testid="VoltzPage-RightSectionBox">{rightSlot}</RightSectionBox>
      ) : null}
    </MainAndFormSectionBox>
  );
  if (notFoundSlot) {
    pageContent = notFoundSlot;
  } else if (pageLoadingSlot) {
    pageContent = pageLoadingSlot;
  } else if (errorSlot) {
    pageContent = errorSlot;
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
