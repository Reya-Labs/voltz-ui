import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from 'react';

import { Season } from '../../../../../hooks/season/types';
import { doNothing } from '../../../../../utilities/doNothing';
import { SeasonTypography, ToggleButton } from './SeasonToggle.styled';

type SeasonToggleProps = {
  seasons: Season[];
  season: Season;
  onChange: (season: Season) => void;
};
export const SeasonToggle: React.FunctionComponent<SeasonToggleProps> = ({
  seasons,
  season,
  onChange = doNothing,
}) => {
  return (
    <ToggleButtonGroup
      aria-label="text alignment"
      value={season.id}
      exclusive
      onChange={(_, activeSeasonId) => {
        const activeSeason = seasons.find((s) => s.id === activeSeasonId);
        activeSeason && onChange(activeSeason);
      }}
    >
      {seasons.map((option) => (
        <ToggleButton key={option.id} value={option.id}>
          <SeasonTypography>{option.label}</SeasonTypography>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
