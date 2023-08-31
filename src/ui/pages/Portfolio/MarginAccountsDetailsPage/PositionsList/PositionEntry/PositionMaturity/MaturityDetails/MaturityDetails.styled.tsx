import styled from '@emotion/styled';

export const DetailsBox = styled('div')`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  width: 240px;
`;

export const RowsBox = styled('div')`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;

export const RowBox = styled('div')`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
`;

export const ProgressBarBox = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  width: 124px;
`;
