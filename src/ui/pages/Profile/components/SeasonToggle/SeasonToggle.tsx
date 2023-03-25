import { Pill } from 'brokoli-ui';
import React from 'react';

import { Season } from '../../../../../hooks/season/types';
import { doNothing } from '../../../../../utilities/doNothing';
import { PillBox, PillsBox } from './SeasonToggle.styled';

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
      {seasons.map((option) => (
        <PillBox
          key={option.id}
          onClick={() => {
            const activeSeason = seasons.find((s) => s.id === option.id);
            activeSeason && onChange(activeSeason);
          }}
        >
          <Pill
            colorToken={option.id === season.id ? 'lavenderWeb' : 'liberty'}
            typographyToken="primaryBodySmallBold"
          >
            {option.label}
          </Pill>
        </PillBox>
      ))}
    </PillsBox>
  );
};
