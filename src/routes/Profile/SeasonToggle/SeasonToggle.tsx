import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { Season } from '../../../hooks/season/types';
import { ToggleButton, SeasonTypography } from './SeasonToggle.styled';
import { doNothing } from '@utilities';
import React from 'react';

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
      value={season.id}
      exclusive
      onChange={(_, activeSeasonId) => {
        const activeSeason = seasons.find((s) => s.id === activeSeasonId);
        activeSeason && onChange(activeSeason);
      }}
      aria-label="text alignment"
    >
      {seasons.map((option) => (
        <ToggleButton value={option.id}>
          <SeasonTypography>{option.label}</SeasonTypography>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
