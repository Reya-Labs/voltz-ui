import styled from '@emotion/styled';

export const FormBox = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 40px;
  gap: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white800};
`;
export const TitleBox = styled('div')`
  box-sizing: border-box;
  width: 100%;
  padding: 16px 40px 8px;
`;

export const MarginAccountBox = styled('div')`
  box-sizing: border-box;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white800};
  background: ${({ theme }) => theme.colors.black800};
`;

export const FormOuterBox = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  border-left: 1px solid ${({ theme }) => theme.colors.white800};
`;

export const TransactionDetailsBox = styled('div')`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  align-items: flex-start;
  padding: 16px 40px 132px 40px;
  width: 100%;

  border-bottom: 1px solid ${({ theme }) => theme.colors.white800};
`;
