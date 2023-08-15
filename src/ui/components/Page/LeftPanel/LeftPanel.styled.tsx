import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const PanelBox = styled('div')`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0px;

  width: 63px;
  height: 100%;

  border: 1px solid ${colors.lavenderWeb8};

  background: rgba(11, 9, 17, 0.5);
  backdrop-filter: blur(2px);
`;

export const CraftedByBox = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 4px;
  width: 100%;
  margin-top: 16px;
`;

export const CraftedByBoxWithoutSubmenu = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 16px;
  padding-bottom: 8px;
`;

export const VoltzLogoBox = styled('div')`
  margin-top: 11px;
`;

export const SubmenuBox = styled('div')`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  height: 100%;

  border: 1px solid ${colors.lavenderWeb8};

  background: rgba(11, 9, 17, 0.5);
  backdrop-filter: blur(2px);
`;
