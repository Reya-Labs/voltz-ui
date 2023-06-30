import { PillSelector } from 'brokoli-ui';
import React from 'react';

import { Season } from '../../../../../hooks/season/types';
import { doNothing } from '../../../../../utilities/doNothing';
import { PillsBox } from './SeasonToggle.styled';

type SeasonToggleProps = {
  seasons: Season[];
  season: Season;
  onChange: (season: Season) => void;
};
export const SeasonToggle: React.FunctionComponent<SeasonToggleProps> = ({
  seasons,
  onChange = doNothing,
  season,
}) => {
  return (
    <PillsBox>
      <PillSelector
        activePillId={season.id.toString()}
        pillOptions={seasons.map((s) => ({ ...s, id: s.id.toString() }))}
        variant="compact"
        onPillClick={(nextSeasonId) => {
          const activeSeason = seasons.find((s) => s.id === parseInt(nextSeasonId, 10));
          activeSeason && onChange(activeSeason);
        }}
      />
    </PillsBox>
  );
};
