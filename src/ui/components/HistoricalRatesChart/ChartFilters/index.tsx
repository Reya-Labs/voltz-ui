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
}) => (
  <ChartFiltersBox data-testid="ChartFilters-ChartFiltersBox">
    {filterOptions.map(({ id, isMode, label, underlineColorToken }) => {
      const active = id === activeModeId || id === activeTimeRangeId;
      return (
        <ChartFilterButtonBox
          key={`${id}_${label}`}
          active={active}
          data-testid={`ChartFilters-ChartFilterButtonBox-${disabled ? 'disabled' : 'enabled'}-${
            active ? 'active' : 'notactive'
          }`}
          disabled={disabled}
          onClick={() => {
            if (disabled) {
              return;
            }
            if (isMode) {
              onModeChange(id);
            } else {
              onTimeRangeChange(id);
            }
          }}
        >
          <ChartFilterButton disabled={disabled}>
            <Typography
              colorToken="lavenderWeb"
              data-testid="ChartFilterButtonBox-TypographyLabel"
              typographyToken="primaryBodySmallRegular"
            >
              {label}
            </Typography>
          </ChartFilterButton>
          {underlineColorToken ? (
            <Underline
              color={getColorFromToken(underlineColorToken)}
              data-testid="ChartFilterButtonBox-Underline"
            />
          ) : null}
        </ChartFilterButtonBox>
      );
    })}
  </ChartFiltersBox>
);
