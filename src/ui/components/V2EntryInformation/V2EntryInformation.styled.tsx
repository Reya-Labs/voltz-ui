import styled from '@emotion/styled';

export const V2Box = styled('div')`
  margin-left: 8px;
  margin-right: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white800};
  border-right: 1px solid ${({ theme }) => theme.colors.white800};
  border-left: 1px solid ${({ theme }) => theme.colors.white800};
  border-radius: 0px 0px 8px 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const V2DetailBox = styled('div')`
  padding: 0 8px;
  margin: 4px 0;
  display: flex;
  align-items: center;
`;

export const V2BorderDetailBox = styled(V2DetailBox)`
  border-right: 1px solid ${({ theme }) => theme.colors.white800};
`;
