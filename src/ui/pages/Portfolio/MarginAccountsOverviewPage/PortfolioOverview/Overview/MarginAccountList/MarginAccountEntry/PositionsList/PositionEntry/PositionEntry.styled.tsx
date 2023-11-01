import styled from '@emotion/styled';
import { ColorTokens, getColorFromToken } from 'brokoli-ui';

export const PositionEntryBoxWrapper = styled('div')`
  position: relative;
`;

export const PositionEntryBox = styled('div', {
  shouldForwardProp: (prop) => prop !== 'backgroundColorToken',
})<{
  backgroundColorToken: ColorTokens;
}>`
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  box-shadow: -2px 0px 8px 0px ${({ theme }) => theme.colors.black900};
  background-color: ${({ theme, backgroundColorToken }) =>
    getColorFromToken({ theme, colorToken: backgroundColorToken })};
  border: 1px solid ${({ theme }) => theme.colors.white800};
  border-radius: 8px;
`;

const InfoBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BorderBox = styled(InfoBox)`
  justify-content: center;
  border-left: 1px solid ${({ theme }) => theme.colors.white800};
`;

export const LeftBox = styled(InfoBox)`
  width: 342px;
`;

export const RightBox = styled(InfoBox)``;

export const NotionalBox = styled(BorderBox)`
  width: 78px;
`;
export const MarginBox = styled(BorderBox)`
  width: 78px;
`;
export const MaturityBox = styled(BorderBox)`
  width: 88px;
`;
export const StatusBox = styled(BorderBox, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<{
  variant: 'small' | 'large';
}>`
  width: ${({ variant }) => (variant === 'small' ? '60px' : '128px')}};
`;
export const UnrealizedPNLBox = styled(BorderBox)`
  width: 88px;
`;
export const RealizedPNLBox = styled(BorderBox)`
  width: 88px;
`;
