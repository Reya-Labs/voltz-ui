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
  leftPanelSubmenu?: React.ReactNode;
};
export const VoltzPage: React.FunctionComponent<VoltzPageProps> = ({
  mainSlot,
  rightSlot,
  errorSlot,
  notFoundSlot,
  pageLoadingSlot,
  leftPanelSubmenu,
}) => {
  let pageContent: React.ReactNode;
  if (notFoundSlot) {
    pageContent = notFoundSlot;
  } else if (pageLoadingSlot) {
    pageContent = pageLoadingSlot;
  } else if (errorSlot) {
    pageContent = errorSlot;
  } else {
    pageContent = (
      <MainAndFormSectionBox data-testid="VoltzPage-MainAndFormSectionBox">
        {mainSlot ? (
          <MainSectionBox data-testid="VoltzPage-MainSectionBox">{mainSlot}</MainSectionBox>
        ) : null}
        {rightSlot ? (
          <RightSectionBox data-testid="VoltzPage-RightSectionBox">{rightSlot}</RightSectionBox>
        ) : null}
      </MainAndFormSectionBox>
    );
  }
  const hasSubmenu = Boolean(leftPanelSubmenu);

  return (
    <Page data-testid="VoltzPage">
      {hasSubmenu ? <TopPanel showLogo={true} /> : null}
      <PageSectionBox data-testid="VoltzPage-PageSectionBox" hasSubmenu={hasSubmenu}>
        <LeftPanel submenu={leftPanelSubmenu} />
        <RightPageSectionBox data-testid="VoltzPage-RightPageSectionBox">
          {!hasSubmenu ? <TopPanel showLogo={false} /> : null}
          {pageContent}
        </RightPageSectionBox>
      </PageSectionBox>
    </Page>
  );
};
