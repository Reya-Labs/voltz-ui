import styled from '@emotion/styled';
import { shouldNotForwardProps } from 'brokoli-ui';

export const PositionsHeaderBox = styled('div')`
  display: flex;
  flex-direction: row;
  padding: 0 8px;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
`;

const InfoBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CenterTextBox = styled(InfoBox)`
  justify-content: center;
`;

export const LeftBox = styled(InfoBox)`
  width: 342px;
`;
export const RightBox = styled(InfoBox)``;
export const NotionalBox = styled(CenterTextBox)`
  width: 78px;
`;
export const MarginBox = styled(CenterTextBox)`
  width: 78px;
`;
export const MaturityBox = styled(CenterTextBox)`
  width: 88px;
`;
export const StatusBox = styled(CenterTextBox, shouldNotForwardProps(['variant']))<{
  variant: 'small' | 'large';
}>`
  width: ${({ variant }) => (variant === 'small' ? '60px' : '128px')}};
`;
export const UnrealizedPNLBox = styled(CenterTextBox)`
  width: 88px;
`;
export const RealizedPNLBox = styled(CenterTextBox)`
  width: 88px;
`;
