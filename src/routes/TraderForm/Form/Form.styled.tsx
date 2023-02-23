import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const FormBox = styled('div')`
  box-sizing: border-box;
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 40px;
  gap: 24px;

  border-width: 0px 0px 1px 1px;
  border-style: solid;
  border-color: ${colors.lavenderWeb8};
  backdrop-filter: blur(4px);
`;
