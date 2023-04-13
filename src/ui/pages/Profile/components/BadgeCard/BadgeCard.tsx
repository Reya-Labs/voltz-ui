import { Typography } from 'brokoli-ui';
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
  HighlightedContainer,
  TitleBox,
  TitleSkeleton,
} from './BadgeCard.styled';

type BadgeCardProps = {
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
    const containerRef = useRef<HTMLDivElement>(null);
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
            <TitleSkeleton
              colorToken="liberty2"
              typographyToken="primaryHeader3Black"
              variant="rectangular"
            />
          ) : (
            <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Black">
              {BADGE_VARIANT_TITLE_COPY_MAP[variant].toUpperCase()}
            </Typography>
          )}
        </TitleBox>
        <DescriptionBox>
          {loading ? (
            <DescriptionSkeleton
              colorToken="liberty2"
              typographyToken="primaryBodySmallRegular"
              variant="rectangular"
            />
          ) : (
            <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
              {BADGE_VARIANT_DESCRIPTION_COPY_MAP[variant]}
            </Typography>
          )}
        </DescriptionBox>
        {disableClaiming ? null : (
          <ClaimButtonBox>
            {loading ? (
              <ClaimButtonSkeleton
                colorToken="liberty2"
                typographyToken="primaryBodyMediumBold"
                variant="rectangular"
              />
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
