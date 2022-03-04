import React from 'react';
import Box from '@mui/material/Box';

import { data } from '@utilities';
import { Agents } from '@components/contexts';
import { Typography } from '@components/atomic';
import { ToggleButtonGroup } from '@components/composite';
import { useAgent } from '@hooks';

export type AMMTableControlsProps = {
  mode: data.Mode;
  quantity: number;
};

const AMMTableControls: React.FunctionComponent<AMMTableControlsProps> = ({ mode, quantity }) => {
  const { agent, onChangeAgent } = useAgent();
  if (mode === 'pools' || !agent) {
    return null;
  }

  const getTypographyLabel = () => {
    switch (agent) {
      case Agents.FIXED_TRADER:
        return 'FIXED RATE POSITIONS';

      case Agents.VARIABLE_TRADER:
        return 'VARIABLE RATE POSITIONS';

      case Agents.LIQUIDITY_PROVIDER:
        return 'ACTIVE FARMS';

      default:
        return undefined;
    }
  };
  const agentOptionTitles = {
    [Agents.FIXED_TRADER]: 'FIXED',
    [Agents.VARIABLE_TRADER]: 'VARIABLE',
  };
  const handleChangeAgent = (option: string) => {
    for (const [key, value] of Object.entries(agentOptionTitles)) {
      if (value === option) {
        onChangeAgent(key as Agents);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: 60 }}>
      {agent !== Agents.LIQUIDITY_PROVIDER && (
        <Box sx={{ width: 'auto', marginRight: (theme) => theme.spacing(4) }}>
          <ToggleButtonGroup
            label="Positions"
            options={Object.values(agentOptionTitles)}
            option={agentOptionTitles[agent]}
            defaultOption={agentOptionTitles[Agents.FIXED_TRADER]}
            onChangeOption={handleChangeAgent}
            agent={agent}
          />
        </Box>
      )}
      <Typography variant="body2" label={getTypographyLabel()}>
        {quantity}
      </Typography>
    </Box>
  );
};

export default AMMTableControls;
