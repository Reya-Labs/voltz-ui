import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../../../../components/atomic/Typography/Typography';
import colors from '../../../../../../theme/colors';

export const DistributionInputWrapper = styled('div')`
  font-family: 'PixelOperatorMono', monospace;
  font-weight: 400;
  font-size: 16px;
  line-height: 14px;
  color: ${colors.lavenderWeb2};
  &::after {
    content: '%';
    margin-left: ${({ theme }) => theme.spacing(-4)};
  }
  &:focus-within::after {
    color: ${colors.lavenderWeb};
  }
`;
export const DistributionInput = styled('input')`
  padding: ${({ theme }) => theme.spacing(2, 3.5, 2, 3.5)};
  background-color: #2b2548;
  border: 1px solid #5d5296;
  border-radius: 4px;
  color: ${colors.lavenderWeb2};
  font-family: 'PixelOperatorMono', monospace;
  font-weight: 400;
  font-size: 16px;
  line-height: 14px;
  display: inline-block;
  outline: none;
  &:focus {
    color: ${colors.lavenderWeb};
  }
  &:disabled {
    background: #1e1933;
    border: 1px solid #1e1933;
  }

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const MaturityTypography = styled(Typography)`
  color: ${colors.lavenderWeb};
  font-family: 'PixelOperatorMono', monospace;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
`;

export const PoolInputLabel = styled(InputLabel)`
  color: ${colors.lavenderWeb};
  font-family: 'PixelOperatorMono', monospace;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  margin: 0;
`;

export const MaturityDistributionBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const EvenBox = styled(Box)`
  flex: 1;
`;

export const PoolList = styled('ul')`
  margin-left: ${({ theme }) => theme.spacing(4)};
  padding: 0;
`;
