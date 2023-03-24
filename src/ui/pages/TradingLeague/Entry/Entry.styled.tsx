import styled from '@emotion/styled';
import { colors, Skeleton } from 'brokoli-ui';

import { ReactComponent as BronzeIcon } from './icons/bronze.svg';
import { ReactComponent as GoldIcon } from './icons/gold.svg';
import { ReactComponent as SilverIcon } from './icons/silver.svg';

export const EntrySkeleton = styled(Skeleton)`
  padding: 8px 8px 8px 32px;
  border-radius: 8px;
  font-size: 18px;
  line-height: 24px;
`;

export const AddressBox = styled('div')`
  flex: 1;
`;

export const RankBox = styled('div')`
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

const EntryBox = styled('div')`
  border-radius: 8px;
  padding: 8px 8px 8px 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  box-sizing: border-box;
`;

export const Rank1EntryBox = styled(EntryBox)`
  background-color: ${colors.lavenderWeb6};
`;
export const Rank2EntryBox = styled(EntryBox)`
  background-color: ${colors.lavenderWeb7};
`;
export const Rank3EntryBox = styled(EntryBox)`
  background-color: ${colors.lavenderWeb8};
`;
export const OtherEntryBox = styled(EntryBox)`
  background-color: ${colors.lavenderWeb8};
`;
export const MeEntryBox = styled(EntryBox)`
  background-color: ${colors.liberty4};
`;
