import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const MarginUpdateConfirmationStepBox = styled('div')`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
`;

export const TitleBox = styled('div')`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
`;

export const MarginUpdateDetailsBox = styled('div')`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
`;

export const HorizontalLine = styled('div')`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid ${colors.lavenderWeb5};
`;

export const MarginUpdateFeeDetailsBox = styled('div')`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
`;
