import { styled } from '@mui/material/styles';
import BoxComponent from '@mui/material/Box';

export const Box = styled(BoxComponent)<{ templateLayout: string }>`
  display: grid;
  grid-template-columns: ${({ templateLayout }) => templateLayout};
`;
