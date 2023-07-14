import { Page as BrokoliPage } from 'brokoli-ui';
import React from 'react';

import { LeftPanel } from './LeftPanel';
import {
  MainAndFormSectionBox,
  MainSectionBox,
  PageSectionBox,
  RightPageSectionBox,
  RightSectionBox,
} from './Page.styled';
import { TopPanel } from './TopPanel';

type PageProps = {
  mainSlot: React.ReactNode;
  errorSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  notFoundSlot?: React.ReactNode;
  pageLoadingSlot?: React.ReactNode;
  leftPanelSubmenu?: React.ReactNode;
};
export const Page: React.FunctionComponent<PageProps> = ({
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
      <MainAndFormSectionBox data-testid="Page-MainAndFormSectionBox">
        {mainSlot ? (
          <MainSectionBox data-testid="Page-MainSectionBox">{mainSlot}</MainSectionBox>
        ) : null}
        {rightSlot ? (
          <RightSectionBox data-testid="Page-RightSectionBox">{rightSlot}</RightSectionBox>
        ) : null}
      </MainAndFormSectionBox>
    );
  }
  const hasSubmenu = Boolean(leftPanelSubmenu);

  return (
    <BrokoliPage data-testid="Page">
      {hasSubmenu ? <TopPanel showLogo={true} /> : null}
      <PageSectionBox data-testid="Page-PageSectionBox" hasSubmenu={hasSubmenu}>
        <LeftPanel submenu={leftPanelSubmenu} />
        <RightPageSectionBox data-testid="Page-RightPageSectionBox">
          {!hasSubmenu ? <TopPanel showLogo={false} /> : null}
          {pageContent}
        </RightPageSectionBox>
      </PageSectionBox>
    </BrokoliPage>
  );
};
