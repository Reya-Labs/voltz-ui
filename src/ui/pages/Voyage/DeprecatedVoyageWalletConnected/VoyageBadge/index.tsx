import { Button, Pill, Typography } from 'brokoli-ui';
import React from 'react';

import { IconImage } from '../../../../../components/atomic/Icon/icons/IconImage';
import {
  SkeletonButton,
  SkeletonHeaderTypography,
  SkeletonImage,
  SkeletonPill,
  SkeletonSubheaderTypography,
  VoyageBadgeBox,
  VoyageBadgeHeaderBox,
  VoyageBadgeImageBox,
  VoyageBadgeTextBox,
  VoyageButtonBox,
  VoyagePillBox,
} from './VoyageBadge.styled';

type VoyageBadgeProps = {
  isClaimable: boolean;
  completed: boolean;
  loading: boolean;
};

export const VoyageBadge: React.FunctionComponent<VoyageBadgeProps> = ({
  completed,
  isClaimable,
  loading,
}) => {
  if (loading) {
    return (
      <VoyageBadgeBox>
        <VoyagePillBox>
          <SkeletonPill
            colorToken="liberty2"
            data-testid="VoyageBadge-SkeletonPill"
            typographyToken="primaryBodySmallRegular"
            variant="rectangular"
          />
        </VoyagePillBox>
        <VoyageBadgeImageBox completed={true}>
          <SkeletonImage
            colorToken="liberty2"
            data-testid="VoyageBadge-SkeletonImage"
            typographyToken="primaryBodySmallRegular"
            variant="rectangular"
          />
        </VoyageBadgeImageBox>
        <VoyageBadgeTextBox>
          <SkeletonHeaderTypography
            colorToken="liberty2"
            data-testid="VoyageBadge-SkeletonHeaderTypography"
            typographyToken="primaryHeader3Black"
            variant="rectangular"
          />
          <SkeletonSubheaderTypography
            colorToken="liberty2"
            data-testid="VoyageBadge-SkeletonSubheaderTypography"
            typographyToken="primaryBodySmallRegular"
            variant="rectangular"
          />
        </VoyageBadgeTextBox>
        <VoyageButtonBox>
          <SkeletonButton
            colorToken="liberty2"
            data-testid="VoyageBadge-Skeleton"
            typographyToken="primaryBodySmallRegular"
            variant="rectangular"
          />
        </VoyageButtonBox>
      </VoyageBadgeBox>
    );
  }
  return (
    <VoyageBadgeBox>
      <VoyagePillBox>
        <Pill colorToken="rainbow" typographyToken="primaryBodySmallRegular" variant="compact">
          Voltz v2
        </Pill>
      </VoyagePillBox>
      <VoyageBadgeImageBox completed={completed}>
        <IconImage src="/images/badges/voyage/deprecated.png" />
      </VoyageBadgeImageBox>
      <VoyageBadgeTextBox>
        <VoyageBadgeHeaderBox>
          <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Black">
            EPIC VOLTZ v2 VOYAGE -
          </Typography>
          <Typography
            colorToken={completed ? 'skyBlueCrayola' : 'wildStrawberry'}
            typographyToken="primaryHeader3Black"
          >
            &nbsp;{completed ? 'Completed' : 'Incomplete'}
          </Typography>
        </VoyageBadgeHeaderBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          {completed
            ? 'Congratulations, you earned the Voltz v2 Voyage Badge. This will have a number of unique benefits, including early access to Voltz v2.'
            : 'Keep trading and LPing to achieve Voltz v2 Status'}
        </Typography>
      </VoyageBadgeTextBox>
      <VoyageButtonBox>
        <Button disabled={!isClaimable || !completed} variant="primary">
          {!completed
            ? 'Not achieved yet - Check again on Monday'
            : !isClaimable
            ? 'Claiming available at the end of the Voyage'
            : 'Claim'}
        </Button>
      </VoyageButtonBox>
    </VoyageBadgeBox>
  );
};
