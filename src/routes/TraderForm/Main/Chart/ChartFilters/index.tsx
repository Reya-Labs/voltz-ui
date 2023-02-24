import { ColorTokens, getColorFromToken, Typography } from 'brokoli-ui';
import React from 'react';

import {
  ChartFilterButton,
  ChartFilterButtonBox,
  ChartFiltersBox,
  Underline,
} from './ChartFilters.styled';
export type ChartFiltersProps = {
  activeTimeRangeId: string;
  activeModeId: string;
  filterOptions: {
    id: string;
    label: string;
    underlineColorToken?: ColorTokens;
    isMode: boolean;
  }[];
  disabled: boolean;
  onModeChange: (filterId: string) => void;
  onTimeRangeChange: (filterId: string) => void;
};

export const ChartFilters: React.FunctionComponent<ChartFiltersProps> = ({
  filterOptions,
  activeTimeRangeId,
  activeModeId,
  onModeChange,
  onTimeRangeChange,
  disabled,
}) => {
  return (
    <ChartFiltersBox data-testid="ChartFilters-ChartFiltersBox">
      {filterOptions.map(({ id, isMode, label, underlineColorToken }) => (
        <ChartFilterButtonBox
          key={`${id}_${label}`}
          active={id === activeModeId || id === activeTimeRangeId}
        >
          <ChartFilterButton
            disabled={disabled}
            onClick={() => {
              if (isMode) {
                onModeChange(id);
              } else {
                onTimeRangeChange(id);
              }
            }}
          >
            <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
              {label}
            </Typography>
          </ChartFilterButton>
          {underlineColorToken ? (
            <Underline color={getColorFromToken(underlineColorToken)} />
          ) : null}
        </ChartFilterButtonBox>
      ))}
    </ChartFiltersBox>
  );
};
