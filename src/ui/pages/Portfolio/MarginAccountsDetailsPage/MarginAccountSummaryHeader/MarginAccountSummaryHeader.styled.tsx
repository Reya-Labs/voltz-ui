import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const TopBox = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
`;

export const TotalPortfolioValueBox = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
`;

const PositionBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 24px;
  min-width: 75px;
`;

const BorderBox = styled(PositionBox)`
  border-left: 1px solid ${colors.lavenderWeb7};
  padding-left: 24px;
`;

export const MarginBox = styled(PositionBox)``;
export const RealizedPNLBox = styled(BorderBox)``;
export const UnrealizedPNLBox = styled(BorderBox)``;
export const TotalNotionalBox = styled(BorderBox)``;
export const TotalCollateralBox = styled(BorderBox)``;
export const TotalPositionsBox = styled(BorderBox)``;
export const MarginRatioBox = styled(BorderBox)``;

export const PositionDetailsBox = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
`;
