import styled from '@emotion/styled';

export const ContentBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
  width: 100%;
`;

export const ActionBox = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  gap: 8px;

  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

export const ActionLeftContentBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;
export const ActionRightContentBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const BatchBudgetContentBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  border-radius: 4px;
`;

export const BatchBudgetValueBox = styled('div')`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;
