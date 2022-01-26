import React from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';

import { Agents, AgentProps } from '@theme';
import { MaturityInformation } from '@components/composite';
import { calculateNotionalAmount } from './utilities';
import {
  MarginAmount,
  NotionalAmount,
  ProtocolInformation,
  RateOptions,
  TraderControls,
  SubmitPoolFormButton,
} from './components';

export type PoolFormProps = AgentProps & {
  onChangeAgent: (agent: Agents) => void;
  protocol?: string;
  fixedApr?: number;
  variableApr?: number;
  startDate?: DateTime;
  endDate?: DateTime;
  defaultFixedLow?: number;
  defaultFixedHigh?: number;
  defaultLeverage?: number;
  defaultMargin?: number;
  defaultPartialCollateralization?: boolean;
  maxMargin?: number;
  fixedLow?: number;
  fixedHigh?: number;
  leverage?: number;
  margin?: number;
  partialCollateralization?: boolean;
  onChangeFixedLow: (value: number) => void;
  onChangeFixedHigh: (value: number) => void;
  onChangeLeverage: (value: number) => void;
  onChangePartialCollateralization: (value: boolean) => void;
  onChangeMargin: (value: number) => void;
  onSubmit: (values: Record<string, unknown>) => void;
};

const PoolForm: React.FunctionComponent<PoolFormProps> = ({
  agent,
  onChangeAgent,
  protocol,
  fixedApr,
  variableApr,
  startDate,
  endDate,
  defaultFixedLow,
  defaultFixedHigh,
  defaultLeverage,
  defaultMargin,
  defaultPartialCollateralization,
  maxMargin,
  fixedLow,
  fixedHigh,
  leverage,
  margin,
  partialCollateralization,
  onChangeFixedLow,
  onChangeFixedHigh,
  onChangeLeverage,
  onChangePartialCollateralization,
  onChangeMargin,
  onSubmit,
}) => {
  const notional = calculateNotionalAmount(margin, leverage);
  const maxNotional = 0;
  const handleMaxNotional = () => {};
  const handleSubmit = () =>
    onSubmit({
      agent,
      fixedLow,
      fixedHigh,
      leverage,
      margin,
      partialCollateralization,
    });

  return (
    <Box sx={{ padding: 3 }}>
      <ProtocolInformation
        agent={agent}
        protocol={protocol}
        fixedApr={fixedApr}
        variableApr={variableApr}
      />
      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(4),
        }}
      >
        <MaturityInformation label="Maturity" startDate={startDate} endDate={endDate} />
      </Box>
      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(4),
          display: 'flex',
        }}
      >
        <TraderControls
          agent={agent}
          onChangeAgent={onChangeAgent}
          defaultPartialCollateralization={defaultPartialCollateralization}
          partialCollateralization={partialCollateralization}
          onChangePartialCollateralization={onChangePartialCollateralization}
        />
        <RateOptions
          agent={agent}
          defaultFixedLow={defaultFixedLow}
          defaultFixedHigh={defaultFixedHigh}
          defaultLeverage={defaultLeverage}
          fixedLow={fixedLow}
          fixedHigh={fixedHigh}
          leverage={leverage}
          onChangeFixedLow={onChangeFixedLow}
          onChangeFixedHigh={onChangeFixedHigh}
          onChangeLeverage={onChangeLeverage}
        />
      </Box>
      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(4),
        }}
      >
        <MarginAmount
          protocol={protocol}
          defaultMargin={defaultMargin}
          maxMargin={maxMargin}
          margin={margin}
          onChangeMargin={onChangeMargin}
        />
      </Box>
      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(4),
        }}
      >
        <NotionalAmount
          notional={notional}
          maxNotional={maxNotional}
          onMaxNotional={handleMaxNotional}
        />
      </Box>
      <SubmitPoolFormButton agent={agent} onSubmit={handleSubmit} />
    </Box>
  );
};

export default PoolForm;
