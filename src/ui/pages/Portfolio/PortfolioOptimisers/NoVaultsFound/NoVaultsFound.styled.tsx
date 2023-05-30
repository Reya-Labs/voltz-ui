import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const MainContentBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;

  background: ${colors.liberty5};
  border-radius: 8px;
`;

export const ContentBox = styled('div')`
  width: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;

  /* Liberty 7 */
  background: ${colors.liberty7};
  border-radius: 8px;
`;
