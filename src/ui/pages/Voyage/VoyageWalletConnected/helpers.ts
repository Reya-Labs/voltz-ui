import { ColorTokens } from 'brokoli-ui';

import { VoyageBadgeUI } from '../../../../app/features/voyage/types';

export const BADGE_ID_TITLE_COPY_MAP: Record<VoyageBadgeUI['id'], string> = {
  v2Voyage: 'VOLTZ V2 VOYAGE - W1',
};

export const STATUS_DESCRIPTION_COPY_MAP: Record<VoyageBadgeUI['status'], string> = {
  notAchieved: 'Don’t worry, more opportunities await.',
  notStarted: 'The voyage has yet to be started! s00n...',
  achieved:
    'Congratulations, you earned the Voltz v2 Voyage Badge. This will have a number of unique benefits, including early access to Voltz v2.',
  inProgress: 'Trade or LP to try achieve Voltz v2 Status.',
};

export const STATUS_TEXT_MAP: Record<VoyageBadgeUI['status'], string> = {
  notAchieved: 'Not Achieved',
  notStarted: 'Starting s00n',
  achieved: 'Achieved',
  inProgress: 'In Progress',
};

export const STATUS_COLOR_TOKEN_MAP: Record<VoyageBadgeUI['status'], ColorTokens> = {
  notAchieved: 'wildStrawberry',
  notStarted: 'skyBlueCrayola3',
  achieved: 'skyBlueCrayola',
  inProgress: 'orangeYellow',
};

export const BADGE_ID_PILL_TEXT_MAP: Record<VoyageBadgeUI['id'], string> = {
  v2Voyage: 'Week 1',
};
