import React from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';
import { Panel } from '@components/atomic';
import {
  IconLabel,
  ProtocolInformation,
  MaturityInformation,
  RateOptions,
  MarginAmount,
  NotionalAmount,
} from '@components/composite';
import { LiquidityControls, MintInfo, SubmitControls } from './components';
import { MarginControls } from '../SwapForm/components';
import { useTokenApproval } from '@hooks';
import { MintBurnFormHintStates, MintBurnFormLiquidityAction, MintBurnFormMarginAction, MintBurnFormModes, MintBurnFormState, MintBurnFormSubmitButtonStates } from '@components/contexts';
import { isUndefined } from 'lodash';

export type MintBurnFormProps = {
  approvalsNeeded?: boolean;
  balance?: number; 
  fixedApr?: number;
  endDate?: DateTime;
  errors: Record<string, string>;
  formState: MintBurnFormState;
  hintState: MintBurnFormHintStates;
  isFormValid: boolean;
  isTradeVierified: boolean;
  maxMargin?: number;
  minRequiredMargin?: number;
  minRequiredMarginLoading: boolean;
  mode: MintBurnFormModes;
  onCancel: () => void;
  onChangeFixedLow: (value: number, increment: boolean | null) => void;
  onChangeFixedHigh: (value: number, increment: boolean | null) => void;
  onChangeLiquidityAction: (value: MintBurnFormLiquidityAction) => void;
  onChangeMargin: (value: number) => void;
  onChangeMarginAction: (value: MintBurnFormMarginAction) => void;
  onChangeNotional: (value: number) => void;
  onSubmit: () => void;
  protocol?: string;
  startDate?: DateTime;
  submitButtonState: MintBurnFormSubmitButtonStates;
  tokenApprovals: ReturnType<typeof useTokenApproval>;
  tradeInfoErrorMessage?: string;
  underlyingTokenName?: string;
};

const MintBurnForm: React.FunctionComponent<MintBurnFormProps> = ({
  approvalsNeeded = false,
  balance,
  endDate,
  errors,
  formState,
  hintState,
  isFormValid,
  isTradeVierified,
  maxMargin,
  minRequiredMargin,
  minRequiredMarginLoading,
  mode = MintBurnFormModes.NEW_POSITION,
  onCancel,
  onChangeFixedLow,
  onChangeFixedHigh,
  onChangeLiquidityAction,
  onChangeMargin,
  onChangeMarginAction,
  onChangeNotional,
  onSubmit,
  protocol,
  startDate,
  submitButtonState,
  tokenApprovals,
  tradeInfoErrorMessage,
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
            values={MintBurnFormMarginAction}
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
            balance={balance}
            protocol={protocol}
            maxMargin={maxMargin}
            margin={formState.margin}
            isAdditional={formState.marginAction === MintBurnFormMarginAction.ADD}
            isEditing={mode === MintBurnFormModes.EDIT_MARGIN}
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

      <SubmitControls 
        approvalsNeeded={approvalsNeeded}
        hintState={hintState}
        isFormValid={isFormValid}
        isTradeVerified={isTradeVierified}
        mode={mode}
        onCancel={onCancel} 
        onSubmit={onSubmit}
        submitButtonState={submitButtonState}
        tokenApprovals={tokenApprovals}
        tradeInfoErrorMessage={tradeInfoErrorMessage}
        underlyingTokenName={underlyingTokenName}
      />
    </Panel>
  );
};

export default MintBurnForm;
