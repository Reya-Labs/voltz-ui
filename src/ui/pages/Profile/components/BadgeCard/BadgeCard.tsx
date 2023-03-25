import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { BadgeVariant } from '../../data/getSeasonBadges';
import { BADGE_VARIANT_DESCRIPTION_COPY_MAP, BADGE_VARIANT_TITLE_COPY_MAP } from '../../helpers';
import { Badge } from '../Badge/Badge';
import { BadgePill } from '../BadgePill/BadgePill';
import { ClaimButton, ClaimButtonProps } from '../ClaimButton/ClaimButton';
import {
  BadgeBox,
  BadgePillBox,
  ClaimButtonBox,
  ClaimButtonSkeleton,
  Container,
  DescriptionBox,
  DescriptionSkeleton,
  DescriptionTypography,
  HighlightedContainer,
  TitleBox,
  TitleSkeleton,
  TitleTypography,
} from './BadgeCard.styled';

export type BadgeCardProps = {
  variant: BadgeVariant;
  loading?: boolean;
  onClaimButtonClick?: ClaimButtonProps['onClick'];
  claimButtonMode: ClaimButtonProps['mode'];
  claimedAt?: ClaimButtonProps['claimedAt'];
  disableClaiming: boolean;
};

export type BadgeCardHandle = {
  scrollIntoView: () => void;
};

export const BadgeCard = forwardRef<BadgeCardHandle, BadgeCardProps>(
  ({ onClaimButtonClick, claimButtonMode, loading, variant, claimedAt, disableClaiming }, ref) => {
    const containerRef = useRef<HTMLElement>(null);
    const [highlight, setHighlight] = useState(false);
    useImperativeHandle(ref, () => ({
      scrollIntoView: () => {
        containerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        setTimeout(() => {
          setHighlight(true);
        }, 650);
      },
    }));
    const ContainerUI = highlight ? HighlightedContainer : Container;
    return (
      <ContainerUI
        ref={containerRef}
        data-testid="BadgeCard"
        onAnimationEnd={() => setHighlight(false)}
      >
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
                displayError={true}
                mode={claimButtonMode}
                onClick={onClaimButtonClick}
              />
            )}
          </ClaimButtonBox>
        )}
      </ContainerUI>
    );
  },
);
