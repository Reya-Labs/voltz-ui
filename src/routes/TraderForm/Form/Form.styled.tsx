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
  box-sizing: border-box;
  width: 100%;
  padding: 16px 40px 8px;
`;

export const MarginAccountBox = styled('div')`
  box-sizing: border-box;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;
  background: linear-gradient(90.95deg, ${colors.lavenderWeb8} 0.66%, ${colors.liberty8} 99.34%);
  box-shadow: 0px 0px 1px ${colors.lavenderWeb3};
`;

export const FormOuterBox = styled('div')`
  box-sizing: border-box;
  /* Auto layout */
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

export const TransactionDetailsBox = styled('div')`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  align-items: flex-start;
  padding: 16px 40px 132px 40px;
  width: 100%;

  border-bottom: 1px solid ${colors.lavenderWeb8};
`;
