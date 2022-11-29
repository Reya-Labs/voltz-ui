import React from 'react';

import { Badge } from '../Badge/Badge';
import { BadgePill } from '../BadgePill/BadgePill';
import { BadgeVariant1 } from '../getters/getPhase1Badges';
import { BADGE_VARIANT_DESCRIPTION_COPY_MAP, BADGE_VARIANT_TITLE_COPY_MAP } from '../helpers';
import {
  BadgeBox,
  BadgePillBox,
  Container,
  DescriptionSkeleton,
  DescriptionTypography,
  TitleSkeleton,
  TitleTypography,
} from './BadgeCard.styled';

export type BadgeCardProps = {
  variant: BadgeVariant1;
  loading?: boolean;
};

export const BadgeCard: React.FunctionComponent<BadgeCardProps> = ({ loading, variant }) => {
  return (
    <Container data-testid="BadgeCard">
      <BadgePillBox>
        <BadgePill loading={loading} variant={variant} />
      </BadgePillBox>
      <BadgeBox>
        <Badge loading={loading} variant={variant} />
      </BadgeBox>
      {loading ? (
        <TitleSkeleton variant="text" />
      ) : (
        <TitleTypography variant="body2">
          {BADGE_VARIANT_TITLE_COPY_MAP[variant].toUpperCase()}
        </TitleTypography>
      )}
      {loading ? (
        <DescriptionSkeleton variant="text" />
      ) : (
        <DescriptionTypography variant="body2">
          {BADGE_VARIANT_DESCRIPTION_COPY_MAP[variant]}
        </DescriptionTypography>
      )}
    </Container>
  );
};
