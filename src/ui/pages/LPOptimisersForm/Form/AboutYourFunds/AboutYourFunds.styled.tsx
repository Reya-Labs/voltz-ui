import styled from '@emotion/styled';

export const DescriptionBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 12px;

  background: ${({ theme }) => theme.colors.black600};
  border-radius: 4px;
`;

export const HighlightedText = styled('span')`
  color: ${({ theme }) => theme.colors.white100};
`;
