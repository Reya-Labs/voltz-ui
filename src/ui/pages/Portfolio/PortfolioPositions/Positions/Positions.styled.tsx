import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const PositionsBox = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
`;

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
export const PositionDetailsBox = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
`;
export const MidBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export const BottomBox = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
`;

export const PositionsSelectorBox = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Box = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 24px;
  min-width: 75px;
`;
const BorderBox = styled(Box)`
  border-left: 1px solid ${colors.lavenderWeb7};
  padding-left: 24px;
`;

export const MarginBox = styled(Box)``;
export const RealizedPNLBox = styled(BorderBox)``;
export const UnrealizedPNLBox = styled(BorderBox)``;
export const TotalNotionalBox = styled(BorderBox)``;

export const HealthStatusBox = styled(BorderBox)`
  display: flex;
  gap: 24px;
`;

export const HealthBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 40px;
  gap: 4px;
  justify-content: center;
`;
