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
  padding: 8px;
  box-shadow: -2px 0px 8px 0px ${colors.liberty8};
  background-color: ${({ backgroundColorToken }) => getColorFromToken(backgroundColorToken)};
  border: 1px solid
    ${({ borderColorToken }) =>
      borderColorToken !== 'transparent' ? getColorFromToken(borderColorToken) : 'transparent'};
  border-radius: 8px;
  transition: all 200ms ease-in;

  &:hover {
    border: 1px solid ${colors.lavenderWeb4};
    cursor: pointer;
    background-color: ${colors.lavenderWeb7};
  }
`;

const InfoBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CenterTextBox = styled(InfoBox)`
  justify-content: center;
  border-left: 1px solid ${colors.lavenderWeb7};
`;

export const LeftBox = styled(InfoBox)`
  width: 342px;
`;

export const NotionalBox = styled(CenterTextBox)`
  width: 78px;
`;
export const MarginBox = styled(CenterTextBox)`
  width: 78px;
`;
export const MaturityBox = styled(CenterTextBox)`
  width: 88px;
`;
export const StatusBox = styled(CenterTextBox)`
  width: 128px;
`;
export const UnrealizedPNLBox = styled(CenterTextBox)`
  width: 88px;
`;
export const RealizedPNLBox = styled(CenterTextBox)`
  width: 88px;
`;

export const ChainIconContainer = styled('div')`
  position: absolute;
  z-index: 0;
  top: 12px;
  left: -15px;
`;

export const HealthIndicatorBox = styled('div')`
  position: absolute;
  z-index: 0;
  top: 10px;
  right: -8px;
`;

export const ArbitrumIcon = styled(Arbitrum)`
  width: 20px;
  height: 20px;
`;

export const AvalancheIcon = styled(Avalanche)`
  width: 20px;
  height: 20px;
`;
