import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../components/atomic/Typography/Typography';
import { colors } from '../../../theme';
import { ReactComponent as BronzeIcon } from './icons/bronze.svg';
import { ReactComponent as GoldIcon } from './icons/gold.svg';
import { ReactComponent as SilverIcon } from './icons/silver.svg';

export const EntrySkeleton = styled(Skeleton)`
  padding: ${({ theme }) => theme.spacing(2, 2, 2, 8)};
  border-radius: 8px;
  font-size: 18px;
  line-height: 24px;
`;

export const RankTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  color: ${colors.lavenderWeb.base};
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
`;

export const NoAddressTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  color: ${colors.lavenderWeb.base};
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
`;

export const AddressBox = styled(Box)`
  flex: 1;
`;

export const RankBox = styled(Box)`
  width: 67px;
`;

export const Gold = styled(GoldIcon)`
  margin-left: 8px;
`;

export const Silver = styled(SilverIcon)`
  margin-left: 8px;
`;

export const Bronze = styled(BronzeIcon)`
  margin-left: 8px;
`;

const EntryBox = styled(Box)`
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(2, 2, 2, 8)};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Rank1EntryBox = styled(EntryBox)`
  background-color: #2b2548;
`;
export const Rank2EntryBox = styled(EntryBox)`
  background-color: #262040;
`;
export const Rank3EntryBox = styled(EntryBox)`
  background-color: #1f1a34;
`;
export const OtherEntryBox = styled(EntryBox)`
  background-color: #19152b;
`;
export const MeEntryBox = styled(EntryBox)`
  background-color: #251f3f;
`;
