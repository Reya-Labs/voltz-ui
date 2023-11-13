import styled from '@emotion/styled';

export const FormTransactionHistoryBox = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 16px 40px 40px;
  gap: 16px;
  position: relative;

  background: linear-gradient(
    90.95deg,
    ${({ theme }) => theme.colors.black900} 0.66%,
    ${({ theme }) => theme.colors.white900} 99.34%
  );
  border-radius: 4px;
`;
