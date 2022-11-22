import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '../../../../../components/atomic/Typography/Typography';
import { Tag } from '../Tag/Tag';

export const MellowLPEntryContainerBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MellowLPEntryInfoBox = styled(Box)`
  padding: ${({ theme }) => theme.spacing(4)};
  background-color: #19152a;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 8px 8px 0 0;
  flex: 1;
`;

export const MellowLPEntryTagBox = styled(Box)`
  display: flex;
`;

export const DescriptionTypography = styled(Typography)`
  font-size: 14px;
  color: #9b97ad;

  margin-left: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(6)};
`;

export const PoolTag = styled(Tag)`
  padding: ${({ theme }) => theme.spacing(0.5, 1)};
  margin-top: ${({ theme }) => theme.spacing(6)};
`;

export const TitleTypography = styled(DescriptionTypography)`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

export const PoolFieldsBox = styled(Box)`
  margin-left: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(1)};
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacing(1)};
`;

export const PositionBox = styled(Box)`
  background: #1e1a33;
  padding: ${({ theme }) => theme.spacing(4, 4, 4, 6)};
  border-radius: 0px 0px 8px 8px;
`;
