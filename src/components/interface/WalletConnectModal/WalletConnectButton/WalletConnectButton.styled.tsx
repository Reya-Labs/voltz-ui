import CircleIcon from '@mui/icons-material/Circle';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { colors } from '../../../../theme';
import { Button } from '../../../atomic/Button/Button';

export const ButtonBox = styled(Box)`
  display: flex;
`;

export const IndicatorCircleIcon = styled(CircleIcon)`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  color: ${colors.wildStrawberry.base};
`;

export const WalletButton = styled(Button)`
  font-size: 16px;
`;
