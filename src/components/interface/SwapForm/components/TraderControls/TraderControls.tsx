import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import isUndefined from 'lodash/isUndefined';

import { Agents } from '@components/contexts';
import { IconLabel, ToggleButtonGroup } from '@components/composite';
import { useAgent } from '@hooks';

export type TraderControlsProps = {
  isModifying?: boolean;
  defaultPartialCollateralization?: boolean;
  partialCollateralization?: boolean;
  fcmMode?: boolean;
  onChangePartialCollateralization: (value: boolean) => void;
  onChangeFcmMode: (value: boolean) => void;
};

const TraderControls: React.FunctionComponent<TraderControlsProps> = ({
  isModifying,
  defaultPartialCollateralization,
  partialCollateralization,
  fcmMode,
  onChangePartialCollateralization,
  onChangeFcmMode,
}) => {
  // Keeping this in as we might need it when refactoring how partial collateralisation mode is enabled
  // useEffect(() => {
  //   if (isUndefined(partialCollateralizationValue)) {
  //     onChangePartialCollateralization(true);
  //   }
  // }, []);

  const { agent, onChangeAgent } = useAgent();
  if (!agent || agent === Agents.LIQUIDITY_PROVIDER) {
    return null;
  }

  const agentOptionTitles = {
    [Agents.FIXED_TRADER]: 'FIXED',
    [Agents.VARIABLE_TRADER]: 'VARIABLE',
  };

  const fcmOptionTitles = { 
    [Agents.FIXED_TRADER]: 'SWAP',
    [Agents.VARIABLE_TRADER]: 'UNWIND'
  };

  const handleChangeMode = (option: string) => {
    for (const [key, value] of Object.entries(agentOptionTitles)) {
      if (value === option) {
        onChangeAgent(key as Agents);
      }
    }
  };

  const partialCollateralizationValue = isUndefined(partialCollateralization)
    ? defaultPartialCollateralization
    : partialCollateralization;

  const partialCollateralizationOptionTitles = {
    YES: 'Yes',
    NO: 'No',
  };
  const handleChangePartialCollateralization = (option: string) => {
    onChangePartialCollateralization(option === partialCollateralizationOptionTitles.YES);
  };

  const handleChangeFcmMode = (option: string) => {
    onChangeFcmMode(option === fcmOptionTitles[Agents.FIXED_TRADER]);
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginRight: (theme) => theme.spacing(4),
        '& > *:not(:last-child)': { marginBottom: (theme) => theme.spacing(4) },
      }}
    >
     
      <ToggleButtonGroup
        label={
          <IconLabel label="partial collateralization" icon="information-circle" info="Trading with partial collateralization  means you need to deposit less margin to cover your position. However, it also means you may be at more risk of getting liquidated if the market moves against you." />
        }
        options={Object.values(partialCollateralizationOptionTitles)}
        option={
          partialCollateralizationValue
            ? partialCollateralizationOptionTitles.YES
            : partialCollateralizationOptionTitles.NO
        }
        defaultOption={partialCollateralizationOptionTitles.YES}
        onChangeOption={handleChangePartialCollateralization}
        agent={agent}
      />

      {!partialCollateralization && (
        <ToggleButtonGroup
          label={<IconLabel label="rates" icon="information-circle" info="Choose between entering a fully collateralised swap or unwinding your position" />}
          options={Object.values(fcmOptionTitles)}
          option={fcmMode ? fcmOptionTitles[Agents.FIXED_TRADER] : fcmOptionTitles[Agents.VARIABLE_TRADER]}
          defaultOption={agentOptionTitles[Agents.FIXED_TRADER]}
          onChangeOption={handleChangeFcmMode}
          agent={agent}
        />
      )}

      {partialCollateralization && (
        <ToggleButtonGroup
          label={<IconLabel label="rates" icon="information-circle" info="Choose between taking a fixed or variable position." />}
          options={Object.values(agentOptionTitles)}
          option={agentOptionTitles[agent]}
          defaultOption={agentOptionTitles[Agents.FIXED_TRADER]}
          onChangeOption={handleChangeMode}
          agent={agent}
        />
      )}
    </Box>
  );
};

export default TraderControls;
