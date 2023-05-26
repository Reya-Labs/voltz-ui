import React from 'react';

import { VoyageBadgeUI } from '../../../../../app/features/voyage/types';
import { SupportedIcons } from '../../../../../components/atomic/Icon/types';
import { Icon, Skeleton } from './Badge.styled';

type BadgeProps = {
  variant: VoyageBadgeUI['id'];
  loading?: boolean;
};

const BADGE_ID_ICON_NAME_MAP: Record<VoyageBadgeUI['id'], SupportedIcons> = {
  1: 'voyageWeek1',
  2: 'voyageWeek2',
  3: 'voyageWeek3',
  4: 'voyageWeek4',
};

export const Badge: React.FunctionComponent<BadgeProps> = ({ loading, variant }) => {
  if (loading) {
    return <Skeleton colorToken="liberty2" data-testid="Badge-Skeleton" variant="circular" />;
  }
  return <Icon data-testid={`Badge-${variant}`} name={BADGE_ID_ICON_NAME_MAP[variant]} />;
};
