import React from 'react';
import isUndefined from 'lodash/isUndefined';
import Box from '@mui/material/Box';

import { useAgentWithOverride } from '@hooks';
import { AgentProps, Agents } from '@components/contexts';
import IntegerField from '../IntegerField/IntegerField';

export type RateOptionsProps = AgentProps & {
  defaultFixedLow?: number;
  defaultFixedHigh?: number;
  fixedLow?: number;
  fixedHigh?: number;
  onChangeFixedLow: (value: number) => void;
  onChangeFixedHigh: (value: number) => void;
};

const RateOptions: React.FunctionComponent<RateOptionsProps> = ({
  agent: agentOverride,
  defaultFixedLow,
  defaultFixedHigh,
  fixedLow,
  fixedHigh,
  onChangeFixedLow,
  onChangeFixedHigh,
}) => {
  const { agent } = useAgentWithOverride(agentOverride);
  const fixedLowValue = isUndefined(fixedLow) ? defaultFixedLow : fixedLow;
  const fixedHighValue = isUndefined(fixedHigh) ? defaultFixedHigh : fixedHigh;

  const handleChangeFixedLow = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFixedLow(parseInt(event.target.value));
  };
  const handleChangeFixedHigh = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFixedHigh(parseInt(event.target.value));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        '& > *:not(:last-child)': { marginRight: (theme) => theme.spacing(10) },
        flexDirection: agent === Agents.LIQUIDITY_PROVIDER ? 'row' : 'column',
      }}
    >
      <IntegerField
        size="small"
        label="Fixed low"
        value={fixedLowValue}
        onChange={handleChangeFixedLow}
      />
      <IntegerField
        size="small"
        label="Fixed high"
        value={fixedHighValue}
        onChange={handleChangeFixedHigh}
      />
    </Box>
  );
};

export default RateOptions;
