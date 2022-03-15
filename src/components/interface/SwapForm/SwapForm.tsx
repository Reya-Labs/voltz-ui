import React from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';

import { AgentProps } from '@components/contexts';
import { Button, Panel } from '@components/atomic';
import {
  ProtocolInformation,
  MaturityInformation,
  RateOptions,
  NotionalAmount,
  MarginAmount,
  MinimumMarginAmount,
} from '@components/composite';
import { useAgentWithOverride } from '@hooks';
import { HandleSubmitSwapFormArgs } from './types';
import { TraderControls, SubmitSwapFormButton } from './components';

export type SwapFormProps = AgentProps & {
  isModifying?: boolean;
  protocol?: string;
  fixedApr?: number;
  variableApr?: number;
  startDate?: DateTime;
  endDate?: DateTime;
  defaultFixedLow?: number;
  defaultFixedHigh?: number;
  defaultNotional?: number;
  defaultMargin?: number;
  defaultPartialCollateralization?: boolean;
  maxMargin?: number;
  fixedLow?: number;
  fixedHigh?: number;
  notional?: number;
  margin?: number;
  partialCollateralization?: boolean;
  onChangeFixedLow: (value: number) => void;
  onChangeFixedHigh: (value: number) => void;
  onChangeNotional: (value: number) => void;
  onChangePartialCollateralization: (value: boolean) => void;
  onChangeMargin: (value: number) => void;
  onSubmit: (values: HandleSubmitSwapFormArgs) => Promise<void>;
  onCancel: () => void;
};

const SwapForm: React.FunctionComponent<SwapFormProps> = ({
  agent: agentOverride,
  isModifying = false,
  protocol,
  fixedApr,
  variableApr,
  startDate,
  endDate,
  defaultFixedLow,
  defaultFixedHigh,
  defaultNotional,
  defaultMargin,
  defaultPartialCollateralization,
  maxMargin,
  fixedLow,
  fixedHigh,
  notional,
  margin,
  partialCollateralization,
  onChangeFixedLow,
  onChangeFixedHigh,
  onChangeNotional,
  onChangePartialCollateralization,
  onChangeMargin,
  onSubmit,
  onCancel,
}) => {
  const { agent } = useAgentWithOverride(agentOverride);
  const minimumMargin = 0;
  const maxNotional = 0;
  const handleMaxNotional = () => {};
  const handleSubmit = async () => {
    return onSubmit({
      agent,
      fixedLow,
      fixedHigh,
      notional,
      margin,
      partialCollateralization: partialCollateralization || false,
    });
  };

  return (
    <Panel
      variant="darker"
      sx={{
        marginTop: 12,
        padding: 6,
        width: (theme) => theme.spacing(80),
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
          fixedLow={fixedLow}
          fixedHigh={fixedHigh}
          onChangeFixedLow={onChangeFixedLow}
          onChangeFixedHigh={onChangeFixedHigh}
        />
      </Box>
      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(4),
        }}
      >
        <NotionalAmount
          defaultNotional={defaultNotional}
          notional={notional}
          onChangeNotional={onChangeNotional}
        />
      </Box>
      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(4),
        }}
      >
        <MinimumMarginAmount minimumMargin={minimumMargin} />
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
      <Box sx={{ display: 'flex' }}>
        <SubmitSwapFormButton onSubmit={handleSubmit} />
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

export default SwapForm;
