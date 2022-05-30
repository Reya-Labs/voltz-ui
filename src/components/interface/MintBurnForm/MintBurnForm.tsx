import React, { ReactNode } from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';
import { Button, Panel, Typography } from '@components/atomic';
import {
  IconLabel,
  ProtocolInformation,
  MaturityInformation,
  RateOptions,
  MarginAmount,
  NotionalAmount,
} from '@components/composite';
import { LiquidityControls, MintInfo } from './components';
import { MarginControls } from '../SwapForm/components';
import { MintBurnFormLiquidityAction, MintBurnFormMarginAction, MintBurnFormState, useTokenApproval } from '@hooks';
import { colors } from '@theme';
import { isUndefined } from 'lodash';
import { MintBurnFormModes } from './types';

export type MintBurnFormProps = {
  balance?: number; 
  protocol?: string;
  fixedApr?: number;
  startDate?: DateTime;
  endDate?: DateTime;
  maxMargin?: number;
  isFormValid: boolean;
  formState: MintBurnFormState;
  errors: Record<string, string>;
  minRequiredMargin?: number;
  minRequiredMarginLoading: boolean;
  mode: MintBurnFormModes;
  onChangeFixedLow: (value: number, increment: boolean | null) => void;
  onChangeFixedHigh: (value: number, increment: boolean | null) => void;
  onChangeNotional: (value: number) => void;
  onChangeMargin: (value: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onChangeMarginAction: (value: MintBurnFormMarginAction) => void;
  onChangeLiquidityAction: (value: MintBurnFormLiquidityAction) => void;
  submitButtonHint: ReactNode;
  submitButtonText: ReactNode;
  tokenApprovals: ReturnType<typeof useTokenApproval>;
  underlyingTokenName?: string;
};

const MintBurnForm: React.FunctionComponent<MintBurnFormProps> = ({
  balance,
  protocol,
  startDate,
  endDate,
  maxMargin,
  isFormValid,
  formState,
  errors,
  minRequiredMargin,
  minRequiredMarginLoading,
  mode = MintBurnFormModes.NEW_POSITION,
  onChangeFixedLow,
  onChangeFixedHigh,
  onChangeNotional,
  onChangeMargin,
  onSubmit,
  onCancel,
  onChangeMarginAction,
  onChangeLiquidityAction,
  submitButtonHint,
  submitButtonText,
  tokenApprovals,
  underlyingTokenName = ''
}) => {
  const isAddingLiquidity = mode !== MintBurnFormModes.EDIT_LIQUIDITY || formState.liquidityAction === MintBurnFormLiquidityAction.ADD;

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
      
      {mode === MintBurnFormModes.EDIT_LIQUIDITY && (
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

      {mode === MintBurnFormModes.EDIT_MARGIN && (
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
          fixedLowDisabled={mode === MintBurnFormModes.EDIT_LIQUIDITY || mode === MintBurnFormModes.EDIT_MARGIN}
          fixedLowError={errors['fixedLow']}
          fixedHigh={formState.fixedHigh}
          fixedHighDisabled={mode === MintBurnFormModes.EDIT_LIQUIDITY || mode === MintBurnFormModes.EDIT_MARGIN}
          fixedHighError={errors['fixedHigh']}
          onChangeFixedLow={onChangeFixedLow}
          onChangeFixedHigh={onChangeFixedHigh}
        />
      </Box>
      
      {mode !== MintBurnFormModes.EDIT_MARGIN && (
        <Box
          sx={{
            marginBottom: (theme) => theme.spacing(6),
          }}
        >
          <NotionalAmount
            label={ isAddingLiquidity ? "Notional liquidity Provided" : "Notional liquidity removed"} 
            info={`Choose the notional amount of liquidity you wish to ${isAddingLiquidity ? 'provide' : 'remove'}.`}
            protocol={protocol}
            notional={formState.notional}
            onChangeNotional={onChangeNotional}
            error={errors['notional']}
          />
        </Box>
      )}

      {isAddingLiquidity && (
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

      {(mode !== MintBurnFormModes.EDIT_MARGIN && isAddingLiquidity && (!isUndefined(minRequiredMargin) || minRequiredMarginLoading)) && (
        <Box sx={{ marginBottom: (theme) => theme.spacing(6) }}>
          <MintInfo 
            balance={balance}
            minRequiredMargin={minRequiredMargin}
            loading={minRequiredMarginLoading} 
            underlyingTokenName={underlyingTokenName} 
          />
        </Box>
      )}

      <Box sx={{ display: 'flex' }}>
        <Button 
          disabled={!isFormValid || tokenApprovals.checkingApprovals || tokenApprovals.approving} 
          size="large" 
          onClick={onSubmit} 
          sx={{ flexGrow: 1 }}
        >
          {submitButtonText}
        </Button>
        <Button
          sx={{ marginLeft: (theme) => theme.spacing(6), flexGrow: 0 }}
          variant="dark"
          onClick={onCancel}
        >
          Back
        </Button>
      </Box>

      <Typography variant='body2' sx={{ 
        marginTop: (theme) => theme.spacing(2), 
        color: colors.lavenderWeb.darken015,
        fontSize: '12px'
      }}>
        {submitButtonHint}
      </Typography>
      
    </Panel>
  );
};

export default MintBurnForm;
