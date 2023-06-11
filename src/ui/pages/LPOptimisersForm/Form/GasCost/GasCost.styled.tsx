import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../../../components/atomic/Typography/Typography';

export const GasCostBox = styled(Box)`
  display: flex;
  flex-direction: row;
  column-gap: ${({ theme }) => theme.spacing(2)};
  align-items: center;
`;

const BaseGasCostTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  display: inline-block;
`;

export const GasCostTypography = styled(BaseGasCostTypography)`
  /* Lavender Web 3 */
  color: #e1ddf7;
`;

export const GasCostTokenTypography = styled(BaseGasCostTypography)`
  /* Lavender Web 3 */
  color: #a49ebf;
`;

export const GasCostInputLabel = styled(InputLabel)`
  position: relative;
  margin: 0;
`;

export const GasIcon = styled(LocalGasStationIcon)`
  color: #e1ddf7;

  font-size: 16px;
  line-height: 160%;
`;
