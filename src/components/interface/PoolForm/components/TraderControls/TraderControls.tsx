import React from 'react';
import Box from '@mui/material/Box';
import isUndefined from 'lodash/isUndefined';

import { Agents, VzMode } from '@theme';
import { OptionButtonGroup } from '@components/composite';

export type TraderControlsProps = VzMode & {
  onChangeMode: (mode: Agents) => void;
  defaultPartialCollateralization?: boolean;
  partialCollateralization?: boolean;
  onChangePartialCollateralization: (value: boolean) => void;
};

const TraderControls: React.FunctionComponent<TraderControlsProps> = ({
  mode,
  onChangeMode,
  defaultPartialCollateralization,
  partialCollateralization,
  onChangePartialCollateralization,
}) => {
  if (mode === Agents.LIQUIDITY_PROVIDER) {
    return null;
  }

  const modeOptionTitles = {
    [Agents.FIXED_TRADER]: 'FIXED',
    [Agents.VARIABLE_TRADER]: 'VARIABLE',
  };
  const handleChangeMode = (option: string) => {
    for (let [key, value] of Object.entries(modeOptionTitles)) {
      if (value === option) {
        onChangeMode(key as Agents);
      }
    }
  };
  const partialCollateralizationValue = isUndefined(partialCollateralization)
    ? defaultPartialCollateralization
    : partialCollateralization;
  const partialCollateralizationOptionTitles = {
    YES: 'Yes',
    NO: 'No ty',
  };
  const handleChangePartialCollateralization = (option: string) => {
    onChangePartialCollateralization(option === partialCollateralizationOptionTitles.YES);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <OptionButtonGroup
        options={Object.values(modeOptionTitles)}
        option={modeOptionTitles[mode]}
        defaultOption={modeOptionTitles[Agents.FIXED_TRADER]}
        onChange={handleChangeMode}
      />
      <OptionButtonGroup
        options={Object.values(partialCollateralizationOptionTitles)}
        option={
          partialCollateralizationValue
            ? partialCollateralizationOptionTitles.YES
            : partialCollateralizationOptionTitles.NO
        }
        defaultOption={partialCollateralizationOptionTitles.YES}
        onChange={handleChangePartialCollateralization}
      />
    </Box>
  );
};

export default TraderControls;
