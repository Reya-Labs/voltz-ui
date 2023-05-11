import styled from '@emotion/styled';
import { Button, colors, ColorTokens, getColorFromToken } from 'brokoli-ui';

import { ReactComponent as Arbitrum } from './assets/arbitrum.svg';
import { ReactComponent as Avalanche } from './assets/avalanche.svg';

export const PoolEntryBoxWrapper = styled('div')`
  position: relative;
`;

export const PoolEntryBox = styled('div', {
  shouldForwardProp: (prop) => prop !== 'backgroundColorToken' && prop !== 'borderColorToken',
})<{
  backgroundColorToken: ColorTokens;
  borderColorToken: ColorTokens | 'transparent';
}>`
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 8px;
  box-shadow: -4px 0px 20px 0px ${colors.liberty8};
  background-color: ${({ backgroundColorToken }) => getColorFromToken(backgroundColorToken)};
  border: 1px solid
    ${({ borderColorToken }) =>
      borderColorToken !== 'transparent' ? getColorFromToken(borderColorToken) : 'transparent'};
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

export const ChainIconContainer = styled('div')`
  position: absolute;
  z-index: 0;
  top: 18px;
  left: -13px;
`;

export const ArbitrumIcon = styled(Arbitrum)`
  width: 20px;
  height: 20px;
`;

export const AvalancheIcon = styled(Avalanche)`
  width: 20px;
  height: 20px;
`;
