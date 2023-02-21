import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const PanelBox = styled('div')`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px 0px 0px;

  border-bottom: 1px solid ${colors.lavenderWeb8};
`;

export const RightContent = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 8px 0px 0px;
  gap: 4px;
`;
