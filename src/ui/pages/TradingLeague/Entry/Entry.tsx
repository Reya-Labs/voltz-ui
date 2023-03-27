import { AvatarAddress, Typography } from 'brokoli-ui';
import React from 'react';

import {
  AddressBox,
  Bronze,
  EntrySkeleton,
  Gold,
  MeEntryBox,
  OtherEntryBox,
  Rank1EntryBox,
  Rank2EntryBox,
  Rank3EntryBox,
  RankBox,
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
    return (
      <EntrySkeleton
        colorToken="liberty2"
        data-testid="Entry-EntrySkeleton"
        variant="rectangular"
      />
    );
  }
  const EntryBox = VariantEntryBoxMap[variant];
  return (
    <EntryBox data-testid={`RankingEntry-${rank}-${variant}`}>
      <RankBox>
        <Typography colorToken="lavenderWeb" typographyToken="secondaryBodyMediumRegular">
          {rank <= 0 ? '---' : rank}
          {rank === 1 && <Gold data-testid="Entry-GoldIcon" />}
          {rank === 2 && <Silver data-testid="Entry-SilverIcon" />}
          {rank === 3 && <Bronze data-testid="Entry-BronzeIcon" />}
        </Typography>
      </RankBox>
      <AddressBox>
        {address ? (
          <AvatarAddress
            address={address}
            avatarSize="medium"
            typographyToken="primaryBodyMediumRegular"
          />
        ) : (
          <Typography
            colorToken="lavenderWeb"
            data-testid="Entry-NoAddressTypography"
            typographyToken="secondaryBodyMediumRegular"
          >
            ---
          </Typography>
        )}
      </AddressBox>
      <Points points={points} />
    </EntryBox>
  );
};
