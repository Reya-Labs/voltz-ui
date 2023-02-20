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
    <BrokoliPage>
      <PageSectionBox>
        <LeftSectionBox>
          <VoltzLogo
            onClick={() => {
              window.open('https://voltz.xyz', '_blank');
            }}
          />
          <CraftedByBox>
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
        <RightPageSectionBox>
          <TopSectionBox>
            <Nav />
            <TopSectionRightContent>
              <WalletConnectModal useNewUI={true} />
              <ChainSelector />
            </TopSectionRightContent>
          </TopSectionBox>
          <MainAndFormSectionBox>
            <MainSectionBox></MainSectionBox>
            <RightSectionBox></RightSectionBox>
          </MainAndFormSectionBox>
        </RightPageSectionBox>
      </PageSectionBox>
    </BrokoliPage>
  );
};
