import { Typography } from 'brokoli-ui';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { VoyageBadgeUI } from '../../../../../app/features/voyage/types';
import { Badge } from '../Badge/Badge';
import { BadgePill } from '../BadgePill/BadgePill';
import { ClaimButton, ClaimButtonProps } from '../ClaimButton/ClaimButton';
import {
  BADGE_ID_TITLE_COPY_MAP,
  STATUS_COLOR_TOKEN_MAP,
  STATUS_DESCRIPTION_COPY_MAP,
  STATUS_TEXT_MAP,
} from '../helpers';
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
  id: VoyageBadgeUI['id'];
  status: VoyageBadgeUI['status'];
  loading?: boolean;
};

export type BadgeCardHandle = {
  scrollIntoView: () => void;
};

export const BadgeCard = forwardRef<BadgeCardHandle, BadgeCardProps>(
  ({ status, loading, id }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [highlight, setHighlight] = useState(false);
    const claimButtonMode: ClaimButtonProps['mode'] =
      status === 'achieved'
        ? 'claimingSoon'
        : status === 'notAchieved'
        ? 'notAchieved'
        : status === 'inProgress'
        ? 'checkOnMonday'
        : status === 'notStarted'
        ? 'startingSoon'
        : 'claim';
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
          <BadgePill loading={loading} variant={id} />
        </BadgePillBox>
        <BadgeBox>
          <Badge loading={loading} variant={id} />
        </BadgeBox>
        <TitleBox>
          {loading ? (
            <TitleSkeleton
              colorToken="liberty2"
              typographyToken="primaryHeader3Black"
              variant="rectangular"
            />
          ) : (
            <React.Fragment>
              <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Black">
                {BADGE_ID_TITLE_COPY_MAP[id].toUpperCase()}
              </Typography>
              <Typography
                colorToken={STATUS_COLOR_TOKEN_MAP[status]}
                typographyToken="primaryHeader3Black"
              >
                {STATUS_TEXT_MAP[status]}
              </Typography>
            </React.Fragment>
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
              {STATUS_DESCRIPTION_COPY_MAP[status]}
            </Typography>
          )}
        </DescriptionBox>
        <ClaimButtonBox>
          {loading ? (
            <ClaimButtonSkeleton
              colorToken="liberty2"
              typographyToken="primaryBodyMediumBold"
              variant="rectangular"
            />
          ) : (
            <ClaimButton displayError={true} mode={claimButtonMode} />
          )}
        </ClaimButtonBox>
      </ContainerUI>
    );
  },
);
