import styled from '@emotion/styled';
import { colors, ColorTokens, getColorFromToken } from 'brokoli-ui';

import { ReactComponent as Arbitrum } from './assets/arbitrum.svg';
import { ReactComponent as Avalanche } from './assets/avalanche.svg';

export const PositionEntryBoxWrapper = styled('div')`
  position: relative;
`;

export const PositionEntryBox = styled('div', {
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
  box-shadow: -2px 0px 8px 0px ${colors.liberty8};
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

export const NotionalBox = styled(InfoBox)`
  width: 70px;
`;
export const MarginBox = styled(InfoBox)`
  width: 70px;
`;
export const MaturityBox = styled(InfoBox)`
  width: 70px;
`;
export const StatusBox = styled(InfoBox)`
  width: 70px;
`;

export const UnrealizedPNLBox = styled(InfoBox)`
  width: 70px;
`;
export const RealizedPNLBox = styled(InfoBox)`
  width: 70px;
`;

export const ChainIconContainer = styled('div')`
  position: absolute;
  z-index: 0;
  top: 18px;
  left: -15px;
`;

export const ArbitrumIcon = styled(Arbitrum)`
  width: 20px;
  height: 20px;
`;

export const AvalancheIcon = styled(Avalanche)`
  width: 20px;
  height: 20px;
`;
