import React, { useRef } from 'react';
import Box from '@mui/material/Box';

import { Agents, usePositionContext } from '../../../../../contexts';
import { IconLabel, ToggleButtonGroup } from '@components/composite';

export type TraderControlsProps = {
  agent: Agents;
  isEdit?: boolean;
  onChangeAgent: (agent: Agents) => void;
};

const TraderControls: React.FunctionComponent<TraderControlsProps> = ({
  agent,
  isEdit,
  onChangeAgent,
}) => {
  const initAgent = useRef<Agents>(agent);

  const { position } = usePositionContext();
  if (position) {
    initAgent.current =
      position.effectiveVariableTokenBalance > 0 ? Agents.VARIABLE_TRADER : Agents.FIXED_TRADER;
  }

  if (!agent || agent === Agents.LIQUIDITY_PROVIDER) {
    return null;
  }

  const newTradeOptionTitles = {
    [Agents.FIXED_TRADER]: 'FIXED',
    [Agents.VARIABLE_TRADER]: 'VARIABLE',
  };

  const editOptionTitles = {
    [initAgent.current === Agents.FIXED_TRADER ? Agents.FIXED_TRADER : Agents.VARIABLE_TRADER]:
      'ADD',
    [initAgent.current === Agents.FIXED_TRADER ? Agents.VARIABLE_TRADER : Agents.FIXED_TRADER]:
      'REMOVE',
  };

  const agentOptionTitles = isEdit ? editOptionTitles : newTradeOptionTitles;

  const handleChangeMode = (option: string) => {
    for (const [key, value] of Object.entries(agentOptionTitles)) {
      if (value === option) {
        onChangeAgent(key as Agents);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        '& > *:not(:last-child)': { marginRight: (theme) => theme.spacing(8) },
      }}
    >
      <ToggleButtonGroup
        label={
          <IconLabel
            label="rates"
            icon="information-circle"
            info="Choose between taking a fixed or variable position."
          />
        }
        options={Object.values(agentOptionTitles)}
        option={agentOptionTitles[agent]}
        defaultOption={agentOptionTitles[Agents.FIXED_TRADER]}
        onChangeOption={handleChangeMode}
        agent={agent}
      />
    </Box>
  );
};

export default TraderControls;
