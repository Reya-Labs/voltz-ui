import React from 'react';

import { AscendingSortIcon, DescendingSortIcon, NoSortIcon } from './DirectionIcon.styled';

export const DirectionIcon: React.FunctionComponent<{
  direction: 'noSort' | 'ascending' | 'descending';
}> = React.memo(({ direction }) => {
  if (direction === 'noSort') return <NoSortIcon data-testid="DirectionIcon-NoSortIcon" />;
  if (direction === 'ascending')
    return <AscendingSortIcon data-testid="DirectionIcon-AscendingSortIcon" />;
  return <DescendingSortIcon data-testid="DirectionIcon-DescendingSortIcon" />;
});
