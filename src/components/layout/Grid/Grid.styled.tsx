import BoxComponent from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Box = styled(BoxComponent, {
  shouldForwardProp: (prop) => prop !== 'templateLayout',
})<{ templateLayout: string }>`
  display: grid;
  grid-template-columns: ${({ templateLayout }) => templateLayout};
`;
