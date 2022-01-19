import React from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';

import { MaturityInformation } from '@components/composite';
import {
  MarginAmount,
  NotionalAmount,
  ProtocolInformation,
  RateOptions,
  TraderControls,
  SubmitPoolFormButton,
} from './components';

export type PoolFormProps = {
  mode: 'liquidity-provider' | 'fixed-trader' | 'variable-trader';
  onChangeMode: (mode: string) => void;
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
  onSubmit: (values: unknown) => void;
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
  const notional = 0;
  const maxNotional = 0;
  const handleMaxNotional = () => {};
  const handleSubmit = () => {};

  return (
    <Box sx={{ height: 300 }}>
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
