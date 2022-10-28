import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import isUndefined from 'lodash/isUndefined';

import { Agents, usePositionContext } from '@contexts';
import { IconLabel, ToggleButtonGroup } from '@components/composite';

export type TraderControlsProps = {
  agent: Agents;
  isFCMAvailable: boolean;
  isEdit?: boolean;
  defaultPartialCollateralization?: boolean;
  partialCollateralization?: boolean;
  onChangeAgent: (agent: Agents) => void;
  onChangePartialCollateralization: (value: boolean) => void;
};

const TraderControls: React.FunctionComponent<TraderControlsProps> = ({
  agent,
  isFCMAvailable,
  isEdit,
  defaultPartialCollateralization,
  partialCollateralization,
  onChangeAgent,
  onChangePartialCollateralization,
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
        disabled={!partialCollateralizationValue}
      />
      {agent === Agents.FIXED_TRADER && isFCMAvailable && (
        <ToggleButtonGroup
          label={
            <IconLabel
              label="TRADE WITH LEVERAGE"
              icon="information-circle"
              info={
                <>
                  Trading with leverage means you need to deposit less margin to cover your
                  position. However, it also means you may be at more risk of getting liquidated if
                  the market moves against you.
                  <br />
                  <br /> As a Fixed Taker you can also fully collateralise your position by
                  depositing the underlying of the pool (e.g. aUSDC). This means you won’t be at
                  risk of getting liquidated. Click No to enable this.
                </>
              }
            />
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
      )}
    </Box>
  );
};

export default TraderControls;
