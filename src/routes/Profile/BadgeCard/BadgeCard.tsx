import React from 'react';
import { Badge } from '../Badge/Badge';
import { BadgePill } from '../BadgePill/BadgePill';
import { BADGE_VARIANT_DESCRIPTION_COPY_MAP, BADGE_VARIANT_TITLE_COPY_MAP } from '../helpers';
import { BadgeVariant } from '@graphql';
import {
  BadgeBox,
  BadgePillBox,
  ClaimButtonBox,
  ClaimButtonSkeleton,
  Container,
  DescriptionBox,
  DescriptionSkeleton,
  DescriptionTypography,
  TitleBox,
  TitleSkeleton,
  TitleTypography,
} from './BadgeCard.styled';
import { ClaimButtonProps, ClaimButton } from '../ClaimButton/ClaimButton';

export type BadgeCardProps = {
  variant: BadgeVariant;
  loading?: boolean;
  onClaimButtonClick?: ClaimButtonProps['onClick'];
  claimButtonMode: ClaimButtonProps['mode'];
  claimedAt?: ClaimButtonProps['claimedAt'];
  disableClaiming: boolean;
};

export const BadgeCard: React.FunctionComponent<BadgeCardProps> = ({
  onClaimButtonClick,
  claimButtonMode,
  loading,
  variant,
  claimedAt,
  disableClaiming,
}) => {
  return (
    <Container data-testid="BadgeCard">
      <BadgePillBox>
        <BadgePill loading={loading} variant={variant} />
      </BadgePillBox>
      <BadgeBox>
        <Badge loading={loading} variant={variant} />
      </BadgeBox>
      <TitleBox>
        {loading ? (
          <TitleSkeleton variant="text" />
        ) : (
          <TitleTypography variant="body2">
            {BADGE_VARIANT_TITLE_COPY_MAP[variant].toUpperCase()}
          </TitleTypography>
        )}
      </TitleBox>
      <DescriptionBox>
        {loading ? (
          <DescriptionSkeleton variant="text" />
        ) : (
          <DescriptionTypography variant="body2">
            {BADGE_VARIANT_DESCRIPTION_COPY_MAP[variant]}
          </DescriptionTypography>
        )}
      </DescriptionBox>
      {disableClaiming ? null : (
        <ClaimButtonBox>
          {loading ? (
            <ClaimButtonSkeleton variant="rectangular" />
          ) : (
            <ClaimButton
              claimedAt={claimedAt}
              onClick={onClaimButtonClick}
              mode={claimButtonMode}
            />
          )}
        </ClaimButtonBox>
      )}
    </Container>
  );
};
