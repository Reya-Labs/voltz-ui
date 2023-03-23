import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { Season } from '../../../../hooks/season/types';
import { CHAIN_SEASON_BADGE_VARIANTS } from './mappers';
import { BadgeVariant, GetProfileBadgesResponse } from './types';

export function getDefaultResponse(
  chainId: SupportedChainId,
  seasonId: Season['id'],
): GetProfileBadgesResponse {
  return CHAIN_SEASON_BADGE_VARIANTS[chainId][seasonId].map((b) => ({
    variant: b as BadgeVariant,
  }));
}
