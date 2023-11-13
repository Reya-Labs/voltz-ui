import styled from '@emotion/styled';
import { mediaBreakPoints, shouldNotForwardProps } from 'brokoli-ui';

export const PageSectionBox = styled('div', shouldNotForwardProps(['hasSubmenu']))<{
  hasSubmenu: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: ${({ hasSubmenu }) => (hasSubmenu ? 'calc(100% - 55px)' : '100%')};
  width: 100%;
`;

export const RightPageSectionBox = styled('div')`
  box-sizing: border-box;
  flex: 1;

  display: flex;
  flex-direction: column;
`;

export const MainAndFormSectionBox = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow-y: auto;
`;

export const MainSectionBox = styled('div')`
  box-sizing: border-box;
  flex: 1;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const RightSectionBox = styled('div')`
  box-sizing: border-box;
  width: 416px;

  height: 100%;

  @media ${mediaBreakPoints.largeDesktopDevice} {
    width: 544px;
  }
`;
