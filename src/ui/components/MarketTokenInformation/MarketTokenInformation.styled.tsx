import styled from '@emotion/styled';

export const MarketTokenBox = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const ToggleCaretBox = styled('div')`
  background: ${({ theme }) => theme.colors.white900};
  color: ${({ theme }) => theme.colors.white100};
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
`;
