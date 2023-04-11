import styled from '@emotion/styled';

export const PoolsHeaderBox = styled('div')`
  display: flex;
  flex-direction: row;
  padding: 0 8px;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
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

export const FixedAPRBox = styled(InfoBox)`
  width: 70px;
`;
export const VariableAPYBox = styled(InfoBox)`
  width: 130px;
`;
export const MaturityBox = styled(InfoBox)`
  width: 70px;
`;
