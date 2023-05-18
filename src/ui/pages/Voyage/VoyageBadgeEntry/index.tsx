import { Pill } from 'brokoli-ui';
import React from 'react';

import { formatPOSIXTimestamp } from '../../../../utilities/date';
import {
  AchievedAtTypography,
  AchievedContainerBox,
  BadgePillBox,
  ContainerBox,
  Skeleton,
  TitleTypography,
} from './VoyageBadgeEntry.styled';

export type VoyageBadgeEntryProps = {
  achievedAt?: number;
  loading?: boolean;
};
export const VoyageBadgeEntry: React.FunctionComponent<VoyageBadgeEntryProps> = ({
  achievedAt,
  loading,
}) => {
  if (loading) {
    return (
      <Skeleton
        colorToken="liberty2"
        data-testid="AchievedBadge-Skeleton"
        typographyToken="primaryBodyMediumRegular"
        variant="rectangular"
      />
    );
  }
  const Container = Boolean(achievedAt) ? AchievedContainerBox : ContainerBox;
  const achievedText = achievedAt
    ? `Achieved: ${formatPOSIXTimestamp(achievedAt)}`
    : 'Keep trading...';

  return (
    <Container data-testid={`VoyageBadgeEntry-Container`}>
      <BadgePillBox>
        <div>
          <Pill colorToken="rainbow" typographyToken="primaryBodySmallRegular" variant="regular">
            Voltz v2
          </Pill>
        </div>
      </BadgePillBox>
      <TitleTypography colorToken="lavenderWeb" typographyToken="primaryBodyMediumRegular">
        EPIC VOLTZ v2 VOYAGE
      </TitleTypography>
      <AchievedAtTypography colorToken="lavenderWeb" typographyToken="primaryBodyMediumRegular">
        {achievedText}
      </AchievedAtTypography>
    </Container>
  );
};
