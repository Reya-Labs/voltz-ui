import React from 'react';

import { AvatarAddress } from '../../../components/interface/AvatarAddress/AvatarAddress';
import {
  AddressBox,
  Bronze,
  EntrySkeleton,
  Gold,
  MeEntryBox,
  NoAddressTypography,
  OtherEntryBox,
  Rank1EntryBox,
  Rank2EntryBox,
  Rank3EntryBox,
  RankBox,
  RankTypography,
  Silver,
} from './Entry.styled';
import { Points } from './Points/Points';

export type EntryProps = {
  points: number;
  rank: number;
  address: string;
  loading?: boolean;
  variant: 'rank1' | 'rank2' | 'rank3' | 'other' | 'me';
};

const VariantEntryBoxMap: Record<EntryProps['variant'], React.FunctionComponent> = {
  rank1: Rank1EntryBox,
  rank2: Rank2EntryBox,
  rank3: Rank3EntryBox,
  other: OtherEntryBox,
  me: MeEntryBox,
};

export const Entry: React.FunctionComponent<EntryProps> = ({
  points,
  rank,
  address,
  loading,
  variant,
}) => {
  if (loading) {
    return <EntrySkeleton data-testid="Entry-EntrySkeleton" variant="rectangular" />;
  }
  const EntryBox = VariantEntryBoxMap[variant];
  return (
    <EntryBox data-testid={`RankingEntry-${rank}-${variant}`}>
      <RankBox>
        <RankTypography variant="body2">
          {rank <= 0 ? '---' : rank}
          {rank === 1 && <Gold data-testid="Entry-GoldIcon" />}
          {rank === 2 && <Silver data-testid="Entry-SilverIcon" />}
          {rank === 3 && <Bronze data-testid="Entry-BronzeIcon" />}
        </RankTypography>
      </RankBox>
      <AddressBox>
        {address ? (
          <AvatarAddress address={address} size={24} />
        ) : (
          <NoAddressTypography data-testid="Entry-NoAddressTypography" variant="body2">
            ---
          </NoAddressTypography>
        )}
      </AddressBox>
      <Points points={points} />
    </EntryBox>
  );
};
