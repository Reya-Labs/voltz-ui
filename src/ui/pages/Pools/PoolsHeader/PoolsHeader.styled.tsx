import styled from '@emotion/styled';

export const PoolsHeaderBox = styled('div')`
  display: flex;
  flex-direction: row;
  padding: 0 8px;
  width: 100%;
  box-sizing: border-box;
`;

export const RowsBox = styled('div')`
  display: flex;
  flex-direction: column;
`;

const InfoBox = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export const PoolsBox = styled(InfoBox)`
  margin-right: 205px;
`;

export const FixedAPRBox = styled(InfoBox)`
  margin-right: 35px;
`;

export const VariableAPYBox = styled(InfoBox)`
  margin-right: 35px;
`;

export const TradingVolumeBox = styled(InfoBox)`
  margin-right: 35px;
`;

export const MaturityBox = styled(InfoBox)``;
