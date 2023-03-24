import styled from '@emotion/styled';

export const Box = styled('div', {
  shouldForwardProp: (prop) => prop !== 'templateLayout',
})<{ templateLayout: string }>`
  display: grid;
  grid-template-columns: ${({ templateLayout }) => templateLayout};
`;
