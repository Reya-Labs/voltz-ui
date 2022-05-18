import React from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';

import { Button, Panel } from '@components/atomic';
import {
  IconLabel,
  ProtocolInformation,
  MaturityInformation,
  RateOptions,
  MarginAmount,
  NotionalAmount,
} from '@components/composite';
import { MintBurnMinimumMarginAmount, LiquidityControls } from './components';
import { MarginControls } from '../SwapForm/components';
import { MintBurnFormLiquidityAction, MintBurnFormMarginAction, MintBurnFormState } from '@hooks';

export type MintBurnFormProps = {
  protocol?: string;
  fixedApr?: number;
  startDate?: DateTime;
  endDate?: DateTime;
  maxMargin?: number;
  isEditingMargin?: boolean;
  isEditingLiquidity?: boolean;
  formState: MintBurnFormState;
  errors: Record<string, string>;
  onChangeFixedLow: (value: number, increment: boolean | null) => void;
  onChangeFixedHigh: (value: number, increment: boolean | null) => void;
  onChangeNotional: (value: number) => void;
  onChangeMargin: (value: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onChangeMarginAction: (value: MintBurnFormMarginAction) => void;
  onChangeLiquidityAction: (value: MintBurnFormLiquidityAction) => void;
};

const MintBurnForm: React.FunctionComponent<MintBurnFormProps> = ({
  protocol,
  startDate,
  endDate,
  maxMargin,
  isEditingMargin = false,
  isEditingLiquidity = false,
  formState,
  errors,
  onChangeFixedLow,
  onChangeFixedHigh,
  onChangeNotional,
  onChangeMargin,
  onSubmit,
  onCancel,
  onChangeMarginAction,
  onChangeLiquidityAction,
}) => {
  const isAddingLiquidity = !isEditingLiquidity || formState.liquidityAction === MintBurnFormLiquidityAction.ADD;

  return (
    <Panel
      variant="darker"
      sx={{
        marginTop: 12,
        width: (theme) => theme.spacing(97),
        boxShadow: '0px 0px 60px rgba(255, 89, 156, 0.2)',
      }}
    >
      <ProtocolInformation protocol={protocol} />
      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(6),
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
      
      {isEditingLiquidity && (
        <Box
          sx={{
            marginBottom: (theme) => theme.spacing(6),
            display: 'flex',
          }}
        >
          <LiquidityControls 
            value={formState.liquidityAction}
            onChange={onChangeLiquidityAction}
          />          
        </Box>
      )}

      {isEditingMargin && (
        <Box
          sx={{
            marginBottom: (theme) => theme.spacing(6),
            display: 'flex',
          }}
        >
          <MarginControls 
            value={formState.marginAction}
            onChange={onChangeMarginAction} 
          />
        </Box>
      )}  

      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(6),
          display: 'flex',
        }}
      >
        <RateOptions
          fixedLow={formState.fixedLow}
          fixedLowError={errors['fixedLow']}
          fixedHigh={formState.fixedHigh}
          fixedHighError={errors['fixedHigh']}
          onChangeFixedLow={onChangeFixedLow}
          onChangeFixedHigh={onChangeFixedHigh}
        />
      </Box>
      
      {!isEditingMargin && (
        <Box
          sx={{
            marginBottom: (theme) => theme.spacing(6),
          }}
        >
          <NotionalAmount
            label={ isAddingLiquidity ? "provided liquidity" : "removed liquidity"} 
            info={`Choose the notional amount of liquidity you wish to ${isAddingLiquidity ? 'provide' : 'remove'}.`}
            protocol={protocol}
            notional={formState.notional}
            onChangeNotional={onChangeNotional}
            error={errors['notional']}
          />
        </Box>
      )}

      {(!isEditingMargin && isAddingLiquidity) && ( 
        <Box
          sx={{
            marginBottom: (theme) => theme.spacing(6),
          }}
        >
          <MintBurnMinimumMarginAmount
            fixedLow={formState.fixedLow}
            fixedHigh={formState.fixedHigh}
            notional={formState.notional}
          />
        </Box>
      )}

      {(!isEditingLiquidity || formState.liquidityAction === MintBurnFormLiquidityAction.ADD) && (
        <Box
          sx={{
            marginBottom: (theme) => theme.spacing(6),
          }}
        >
          <MarginAmount
            protocol={protocol}
            maxMargin={maxMargin}
            margin={formState.margin}
            isAdditional={formState.marginAction === MintBurnFormMarginAction.ADD}
            onChangeMargin={onChangeMargin}
            error={errors['margin']}
          />
        </Box>
      )}

      <Box sx={{ display: 'flex' }}>
        <Button size="large" onClick={onSubmit}>
          {isAddingLiquidity ? 'Provide Liquidity' : 'Burn Liquidity'}
        </Button>
        <Button
          sx={{ marginLeft: (theme) => theme.spacing(6) }}
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
