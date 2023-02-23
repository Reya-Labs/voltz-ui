import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const ChartBox = styled('div')`
  box-sizing: border-box;
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 24px 0px 0px;

  border-bottom: 1px solid ${colors.lavenderWeb8};
`;
