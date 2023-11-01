import styled from '@emotion/styled';

export const ContentBox = styled('div')`
  display: flex;
  box-sizing: border-box;
  width: 316px;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
`;

export const TitleBox = styled('div')`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
`;

export const ButtonBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
`;

export const DepositFeeContentBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  justify-content: space-between;

  background: ${({ theme }) => theme.colors.black600};
  border-radius: 4px;

  width: 100%;
  box-sizing: border-box;
`;

export const DepositBudgetValueBox = styled('div')`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;
