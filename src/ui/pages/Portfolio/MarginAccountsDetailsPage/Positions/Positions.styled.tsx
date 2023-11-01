import styled from '@emotion/styled';

export const PositionsBox = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
`;

export const PositionDetailsBox = styled('div')`
  display: flex;
  flex-direction: row;
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
