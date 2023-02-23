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
export const TitleBox = styled('div')`
  width: 100%;
  position: sticky;
  top: 0;
  padding: 16px 40px 8px;
  z-index: 1;
  background: linear-gradient(180deg, rgba(11, 9, 17, 0.8) 41.43%, rgba(24, 21, 36, 0.8) 110.49%);
  backdrop-filter: blur(2px);
`;
export const FormOuterBox = styled('div')`
  box-sizing: border-box;
  /* Auto layout */
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
`;
