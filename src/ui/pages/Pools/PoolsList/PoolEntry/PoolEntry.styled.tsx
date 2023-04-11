import styled from '@emotion/styled';
import { Button, ColorTokens, getColorFromToken } from 'brokoli-ui';

export const PoolEntryBox = styled('div', {
  shouldForwardProp: (prop) => prop !== 'backgroundColorToken',
})<{
  backgroundColorToken: ColorTokens;
}>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 8px;
  background-color: ${({ backgroundColorToken }) => getColorFromToken(backgroundColorToken)};
  border-radius: 8px;
`;

const InfoBox = styled('div')`
  display: flex;
  flex-direction: row;
`;

export const LeftBox = styled(InfoBox)`
  width: 280px;
`;

export const MiddleBox = styled(InfoBox)`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: space-between;
  margin-right: 30px;
`;

export const RightBox = styled(InfoBox)`
  width: 140px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
`;

export const FixedAPRBox = styled(InfoBox)`
  width: 70px;
`;
export const VariableAPYBox = styled(InfoBox)`
  width: 130px;
`;
export const MaturityBox = styled(InfoBox)`
  width: 70px;
`;

export const ButtonStyled = styled(Button)`
  padding: 6px 16px;
`;
