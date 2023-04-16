import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const MarketTokenBox = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const ToggleCaretBox = styled('div')`
  background: ${colors.lavenderWeb8};
  color: ${colors.lavenderWeb};
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
`;
