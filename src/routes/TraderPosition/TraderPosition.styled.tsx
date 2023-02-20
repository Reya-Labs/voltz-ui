import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

import { ReactComponent as VoltzLogoSvg } from './voltz-logo.svg';

export const VoltzLogo = styled(VoltzLogoSvg)`
  cursor: pointer;
`;

export const TopSectionBox = styled('div')`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px 0px 0px;

  border-bottom: 1px solid ${colors.lavenderWeb8};
`;

export const TopSectionRightContent = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 8px 0px 0px;
  gap: 4px;
`;

export const PageSectionBox = styled('div')`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

export const RightPageSectionBox = styled('div')`
  flex: 1;
  height: 100%;
`;

export const MainAndFormSectionBox = styled('div')`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const LeftSectionBox = styled('div')`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0px;

  width: 63px;
  height: 100%;

  border: 1px solid ${colors.lavenderWeb8};

  background: rgba(11, 9, 17, 0.5);
  backdrop-filter: blur(2px);
`;
export const MainSectionBox = styled('div')`
  flex: 1;
  height: 100%;
`;
export const RightSectionBox = styled('div')`
  width: 416px;
  height: 100%;

  background: linear-gradient(180deg, rgba(11, 9, 17, 0.8) 41.43%, rgba(24, 21, 36, 0.8) 110.49%);
  backdrop-filter: blur(2px);
`;
export const CraftedByBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
