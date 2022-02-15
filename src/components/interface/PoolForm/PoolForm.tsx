import React from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';

import { AgentProps } from '@components/contexts';
import { Button, Panel } from '@components/atomic';
import { MaturityInformation } from '@components/composite';
import { useAgentWithOverride } from '@hooks';
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
  isModifying?: boolean;
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
  onCancel: () => void;
};

const PoolForm: React.FunctionComponent<PoolFormProps> = ({
  agent: agentOverride,
  isModifying = false,
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
  onCancel,
}) => {
  const { agent } = useAgentWithOverride(agentOverride);
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
    <Panel
      variant="darker"
      sx={{
        marginTop: 12,
        padding: 6,
        minWidth: (theme) => theme.spacing(100),
        boxShadow: '0px 0px 60px rgba(255, 89, 156, 0.2)',
      }}
    >
      <ProtocolInformation protocol={protocol} fixedApr={fixedApr} variableApr={variableApr} />
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
          isModifying={isModifying}
          defaultPartialCollateralization={defaultPartialCollateralization}
          partialCollateralization={partialCollateralization}
          onChangePartialCollateralization={onChangePartialCollateralization}
        />
        <RateOptions
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
      <Box sx={{ display: 'flex' }}>
        <SubmitPoolFormButton onSubmit={handleSubmit} />
        <Button
          sx={{ marginLeft: (theme) => theme.spacing(4) }}
          variant="darker"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Box>
    </Panel>
  );
};

export default PoolForm;
