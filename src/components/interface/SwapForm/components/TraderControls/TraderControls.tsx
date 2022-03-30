import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import isUndefined from 'lodash/isUndefined';

import { Agents } from '@components/contexts';
import { IconLabel, ToggleButtonGroup } from '@components/composite';
import { useAgent } from '@hooks';

export type TraderControlsProps = {
  isModifying?: boolean;
  defaultPartialCollateralization?: boolean;
  partialCollateralization?: boolean;
  onChangePartialCollateralization: (value: boolean) => void;
};

const TraderControls: React.FunctionComponent<TraderControlsProps> = ({
  isModifying,
  defaultPartialCollateralization,
  partialCollateralization,
  onChangePartialCollateralization,
}) => {
  useEffect(() => {
    if (isUndefined(partialCollateralizationValue)) {
      onChangePartialCollateralization(false);
    }
  }, []);

  const { agent, onChangeAgent } = useAgent();
  if (!agent || agent === Agents.LIQUIDITY_PROVIDER) {
    return null;
  }

  const agentOptionTitles = {
    [Agents.FIXED_TRADER]: 'FIXED',
    [Agents.VARIABLE_TRADER]: 'VARIABLE',
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
    NO: 'No ty',
  };
  const handleChangePartialCollateralization = (option: string) => {
    onChangePartialCollateralization(option === partialCollateralizationOptionTitles.YES);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginRight: (theme) => theme.spacing(4),
        '& > *:not(:last-child)': { marginBottom: (theme) => theme.spacing(4) },
      }}
    >
      {!isModifying && (
        <ToggleButtonGroup
          label={<IconLabel label="rates" icon="information-circle" info="Something" />}
          options={Object.values(agentOptionTitles)}
          option={agentOptionTitles[agent]}
          defaultOption={agentOptionTitles[Agents.FIXED_TRADER]}
          onChangeOption={handleChangeMode}
          agent={agent}
        />
      )}
      <ToggleButtonGroup
        label={
          <IconLabel label="partial collateralization" icon="information-circle" info="Something" />
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
    </Box>
  );
};

export default TraderControls;
