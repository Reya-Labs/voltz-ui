import { Page as BrokoliPage, Typography } from 'brokoli-ui';
import * as React from 'react';

import { WalletConnectModal } from '../../components/interface/WalletConnectModal/WalletConnectModal';
import { ChainSelector } from './ChainSelector';
import { Nav } from './Nav';
import {
  CraftedByBox,
  LeftSectionBox,
  MainAndFormSectionBox,
  MainSectionBox,
  PageSectionBox,
  RightPageSectionBox,
  RightSectionBox,
  TopSectionBox,
  TopSectionRightContent,
  VoltzLogo,
} from './TraderPosition.styled';

export const TraderPositionRoute: React.FunctionComponent = () => {
  return (
    <BrokoliPage data-testid="BrokoliPage">
      <PageSectionBox data-testid="BrokoliPage-PageSectionBox">
        <LeftSectionBox data-testid="BrokoliPage-LeftSectionBox">
          <VoltzLogo
            data-testid="BrokoliPage-VoltzLogo"
            onClick={() => {
              window.open('https://voltz.xyz', '_blank');
            }}
          />
          <CraftedByBox data-testid="BrokoliPage-CraftedByBox">
            <Typography colorToken="lavenderWeb4" typographyToken="primaryBodyXSmallRegular">
              crafted by
            </Typography>
            <Typography colorToken="lavenderWeb" typographyToken="primaryBodyXSmallRegular">
              Voltz Labs
            </Typography>
            <Typography colorToken="lavenderWeb4" typographyToken="primaryBodyXSmallRegular">
              {process.env.APP_VERSION}
            </Typography>
          </CraftedByBox>
        </LeftSectionBox>
        <RightPageSectionBox data-testid="BrokoliPage-RightPageSectionBox">
          <TopSectionBox data-testid="BrokoliPage-TopSectionBox">
            <Nav />
            <TopSectionRightContent data-testid="BrokoliPage-TopSectionRightContent">
              <WalletConnectModal useNewUI={true} />
              <ChainSelector />
            </TopSectionRightContent>
          </TopSectionBox>
          <MainAndFormSectionBox data-testid="BrokoliPage-MainAndFormSectionBox">
            <MainSectionBox data-testid="BrokoliPage-MainSectionBox"></MainSectionBox>
            <RightSectionBox data-testid="BrokoliPage-RightSectionBox"></RightSectionBox>
          </MainAndFormSectionBox>
        </RightPageSectionBox>
      </PageSectionBox>
    </BrokoliPage>
  );
};
