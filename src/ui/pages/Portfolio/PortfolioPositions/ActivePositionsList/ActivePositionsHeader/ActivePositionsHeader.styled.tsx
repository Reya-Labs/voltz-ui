import styled from '@emotion/styled';

export const ActivePositionsHeaderBox = styled('div')`
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
