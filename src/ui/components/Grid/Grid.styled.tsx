import styled from '@emotion/styled';
import { shouldNotForwardProps } from 'brokoli-ui';

export const Box = styled('div', shouldNotForwardProps(['templateLayout']))<{
  templateLayout: string;
}>`
  display: grid;
  grid-template-columns: ${({ templateLayout }) => templateLayout};
`;
