import styled from '@emotion/styled';

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
  gap: 4px;
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
