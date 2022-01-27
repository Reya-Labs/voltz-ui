import React from 'react';
import isUndefined from 'lodash/isUndefined';
import Box from '@mui/material/Box';

import { Agents, AgentProps } from '@theme';
import { IntegerField } from '@components/composite';

export type RateOptionsProps = AgentProps & {
  defaultFixedLow?: number;
  defaultFixedHigh?: number;
  defaultLeverage?: number;
  fixedLow?: number;
  fixedHigh?: number;
  leverage?: number;
  onChangeFixedLow: (value: number) => void;
  onChangeFixedHigh: (value: number) => void;
  onChangeLeverage: (value: number) => void;
};

const RateOptions: React.FunctionComponent<RateOptionsProps> = ({
  agent,
  defaultFixedLow,
  defaultFixedHigh,
  defaultLeverage,
  fixedLow,
  fixedHigh,
  leverage,
  onChangeFixedLow,
  onChangeFixedHigh,
  onChangeLeverage,
}) => {
  const fixedLowValue = isUndefined(fixedLow) ? defaultFixedLow : fixedLow;
  const fixedHighValue = isUndefined(fixedHigh) ? defaultFixedHigh : fixedHigh;
  const leverageValue = isUndefined(leverage) ? defaultLeverage : leverage;

  const handleChangeFixedLow = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFixedLow(parseInt(event.target.value));
  };
  const handleChangeFixedHigh = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFixedHigh(parseInt(event.target.value));
  };
  const handleChangeLeverage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeLeverage(parseInt(event.target.value));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: agent === Agents.LIQUIDITY_PROVIDER ? 'space-around' : 'end',
        '& > *:not(:last-child)': { marginRight: (theme) => theme.spacing(10) },
        flexDirection: agent === Agents.LIQUIDITY_PROVIDER ? 'row' : 'column',
      }}
    >
      {agent === Agents.LIQUIDITY_PROVIDER && (
        <>
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
        </>
      )}
      <IntegerField
        size="small"
        label="Leverage"
        value={leverageValue}
        onChange={handleChangeLeverage}
      />
    </Box>
  );
};

export default RateOptions;
