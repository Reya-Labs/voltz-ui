import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { colors } from '../../theme';

export const LPPortfolioBox = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 48px;
`;

export const Split = styled('hr')`
  border: 1px solid ${colors.liberty3};
`;

export const ContentBox = styled(Box)`
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
`;
