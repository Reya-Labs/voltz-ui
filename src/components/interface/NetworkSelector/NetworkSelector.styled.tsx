import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { colors } from '../../../theme';
import { Typography } from '../../atomic/Typography/Typography';
import { ReactComponent as Arbitrum } from './icons/arbitrum.svg';
import { ReactComponent as Arrow } from './icons/arrow.svg';
import { ReactComponent as Ethereum } from './icons/ethereum.svg';

export const SelectorBox = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 4px;
  background: #2d2b3d;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  z-index: 1;
  padding: 0 8px;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
`;

export const NetworkSelect = styled('select')`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
`;

export const EthereumIcon = styled(Ethereum)`
  width: 24px;
  height: 24px;
`;

export const ArrowIcon = styled(Arrow)`
  width: 12px;
  height: 12px;
  margin-left: 8px;
`;

export const ArbitrumIcon = styled(Arbitrum)`
  width: 24px;
  height: 24px;
`;

export const NetworkTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 14px;
  letter-spacing: 0.02em;
  color: ${colors.lavenderWeb};
`;
