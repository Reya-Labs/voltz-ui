import React from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';

import { Agents, VzMode } from '@theme';
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

export type PoolFormProps = VzMode & {
  onChangeMode: (mode: Agents) => void;
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
  mode,
  onChangeMode,
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
      mode,
      fixedLow,
      fixedHigh,
      leverage,
      margin,
      partialCollateralization,
    });

  return (
    <Box sx={{ padding: 3 }}>
      <ProtocolInformation
        mode={mode}
        protocol={protocol}
        fixedApr={fixedApr}
        variableApr={variableApr}
      />
      <MaturityInformation startDate={startDate} endDate={endDate} />
      <Box sx={{}}>
        <TraderControls
          mode={mode}
          onChangeMode={onChangeMode}
          defaultPartialCollateralization={defaultPartialCollateralization}
          partialCollateralization={partialCollateralization}
          onChangePartialCollateralization={onChangePartialCollateralization}
        />
        <RateOptions
          mode={mode}
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
      <MarginAmount
        protocol={protocol}
        defaultMargin={defaultMargin}
        maxMargin={maxMargin}
        margin={margin}
        onChangeMargin={onChangeMargin}
      />
      <NotionalAmount
        notional={notional}
        maxNotional={maxNotional}
        onMaxNotional={handleMaxNotional}
      />
      <SubmitPoolFormButton mode={mode} onSubmit={handleSubmit} />
    </Box>
  );
};

export default PoolForm;
