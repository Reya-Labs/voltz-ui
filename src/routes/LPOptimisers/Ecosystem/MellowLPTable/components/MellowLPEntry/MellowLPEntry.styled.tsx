import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../../../../components/atomic/Typography/Typography';

export const MellowLPEntryContainerBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
`;

export const MellowLPEntryInfoBox = styled(Box)`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(4)};
  gap: ${({ theme }) => theme.spacing(6)};

  background: #19152a;
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-color: #1e1933;
  border-radius: 8px 8px 0px 0px;

  flex: 1;
`;

export const DescriptionTypography = styled(Typography)`
  font-size: 14px;
  color: #9b97ad;
`;

export const PoolOutlineBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(1, 0)};
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const PoolFieldsBox = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacing(2)};
`;

export const PositionBox = styled(Box)`
  background: #1e1a33;
  border-radius: ${({ theme }) => theme.spacing(0, 0, 2, 2)};

  align-self: stretch;
`;

export const PoolFieldTypography = styled(Typography)`
  font-size: 18px;
  text-transform: uppercase;
  vertical-align: middle;
  font-weight: 700;
  letter-spacing: 0.02cm;
  line-height: 100%;
`;
