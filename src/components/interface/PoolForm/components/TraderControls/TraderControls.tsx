import React from 'react';
import Box from '@mui/material/Box';
import isUndefined from 'lodash/isUndefined';

import { Agents, AgentProps } from '@theme';
import { ToggleButtonGroup } from '@components/composite';

export type TraderControlsProps = AgentProps & {
  onChangeAgent: (mode: Agents) => void;
  defaultPartialCollateralization?: boolean;
  partialCollateralization?: boolean;
  onChangePartialCollateralization: (value: boolean) => void;
};

const TraderControls: React.FunctionComponent<TraderControlsProps> = ({
  agent,
  onChangeAgent,
  defaultPartialCollateralization,
  partialCollateralization,
  onChangePartialCollateralization,
}) => {
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
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <ToggleButtonGroup
        options={Object.values(agentOptionTitles)}
        option={agentOptionTitles[agent]}
        defaultOption={agentOptionTitles[Agents.FIXED_TRADER]}
        onChangeOption={handleChangeMode}
        agent={agent}
      />
      <ToggleButtonGroup
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
