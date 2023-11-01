import styled from '@emotion/styled';

export const TopBox = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
`;

export const TotalPortfolioValueBox = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
`;
export const LeftBox = styled('div')`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
`;
export const RightBox = styled('div')`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  width: 350px;
`;
export const NameBox = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  gap: 4px;
  align-items: center;
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
  border-left: 1px solid ${({ theme }) => theme.colors.white800};
  padding-left: 24px;
`;

export const MarginBox = styled(PositionBox)``;
export const RealizedPNLBox = styled(BorderBox)``;
export const UnrealizedPNLBox = styled(BorderBox)``;
export const TotalNotionalBox = styled(BorderBox)``;
export const TotalCollateralBox = styled(BorderBox)``;
export const TotalPositionsBox = styled(BorderBox)``;
export const MarginRatioBox = styled(BorderBox)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const PositionDetailsBox = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
`;

export const MarginRatioDonutBox = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  gap: 8px;
  align-items: center;
`;
