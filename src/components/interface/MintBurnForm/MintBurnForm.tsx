import React from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';
import isUndefined from 'lodash/isUndefined';

import { AgentProps } from '@components/contexts';
import { Button, Panel } from '@components/atomic';
import {
  IconLabel,
  ProtocolInformation,
  MaturityInformation,
  RateOptions,
  MarginAmount,
  NotionalAmount,
} from '@components/composite';
import { HandleSubmitMintBurnFormArgs } from './types';
import { MintBurnMinimumMarginAmount, SubmitMintBurnFormButton } from './components';

export type MintBurnFormProps = AgentProps & {
  protocol?: string;
  fixedApr?: number;
  startDate?: DateTime;
  endDate?: DateTime;
  defaultFixedLow?: number;
  defaultFixedHigh?: number;
  defaultNotional?: number;
  defaultMargin?: number;
  maxMargin?: number;
  fixedLow?: number;
  fixedHigh?: number;
  notional?: number;
  margin?: number;
  onChangeFixedLow: (value: number, increment: boolean | null) => void;
  onChangeFixedHigh: (value: number, increment: boolean | null) => void;
  onChangeNotional: (value: number) => void;
  onChangeMargin: (value: number) => void;
  onSubmit: (values: HandleSubmitMintBurnFormArgs) => void;
  onCancel: () => void;
};

const MintBurnForm: React.FunctionComponent<MintBurnFormProps> = ({
  protocol,
  startDate,
  endDate,
  defaultFixedLow,
  defaultFixedHigh,
  defaultNotional,
  defaultMargin,
  maxMargin,
  fixedLow,
  fixedHigh,
  notional,
  margin,
  onChangeFixedLow,
  onChangeFixedHigh,
  onChangeNotional,
  onChangeMargin,
  onSubmit,
  onCancel,
}) => {
  const handleSubmit = () => {
    if (
      isUndefined(fixedLow) ||
      isUndefined(fixedHigh) ||
      isUndefined(notional) ||
      isUndefined(margin)
    ) {
      return;
    }

    return onSubmit({
      fixedLow,
      fixedHigh,
      notional,
      margin,
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
        borderRadius: 2
      }}
    >
      <ProtocolInformation protocol={protocol} />
      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(4),
        }}
      >
        <MaturityInformation
          label={
            <IconLabel
              label="maturity"
              icon="information-circle"
              info="The proportion between the time elapsed since the initiation of the pool and the entire duration."
              removeIcon
            />
          }
          startDate={startDate}
          endDate={endDate}
        />
      </Box>
      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(4),
          display: 'flex',
        }}
      >
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
          label="provided liquidity"
          info="Choose the notional amount of liquidity you wish to provide."
          protocol={protocol}
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
        <MintBurnMinimumMarginAmount
          fixedLow={fixedLow}
          fixedHigh={fixedHigh}
          notional={notional}
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
      <Box sx={{ display: 'flex' }}>
        <SubmitMintBurnFormButton onSubmit={handleSubmit} />
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

export default MintBurnForm;
