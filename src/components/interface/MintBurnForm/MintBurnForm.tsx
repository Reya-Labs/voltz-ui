import React from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';
import { FormPanel } from '@components/interface';
import {
  IconLabel,
  ProtocolInformation,
  MaturityInformation,
  RateOptions,
  MarginAmount,
  NotionalAmount,
} from '@components/composite';
import { LiquidityControls, SubmitControls } from './components';
import { MarginControls } from '../SwapForm/components';
import { useTokenApproval } from '../../../hooks';
import {
  MintBurnFormHintStates,
  MintBurnFormLiquidityAction,
  MintBurnFormMarginAction,
  MintBurnFormModes,
  MintBurnFormState,
  MintBurnFormSubmitButtonStates,
} from '../../../contexts';
import { SystemStyleObject, Theme } from '../../../theme';

export type MintBurnFormProps = {
  approvalsNeeded?: boolean;
  balance?: number;
  currentPositionMarginRequirement?: number;
  endDate?: DateTime;
  errors: Record<string, string>;
  formState: MintBurnFormState;
  healthFactor?: number;
  hintState: MintBurnFormHintStates;
  isFormValid: boolean;
  isTradeVierified: boolean;
  maxMargin?: number;
  mode: MintBurnFormModes;
  gaButtonId?: string;
  onCancel: () => void;
  onChangeFixedLow: (value: number | undefined, increment: boolean | null) => void;
  onChangeFixedHigh: (value: number | undefined, increment: boolean | null) => void;
  onChangeLiquidityAction: (value: MintBurnFormLiquidityAction) => void;
  onChangeMargin: (value: number | undefined) => void;
  onChangeMarginAction: (value: MintBurnFormMarginAction) => void;
  onChangeNotional: (value: number | undefined) => void;
  onSubmit: () => void;
  protocol?: string;
  startDate?: DateTime;
  submitButtonState: MintBurnFormSubmitButtonStates;
  tokenApprovals: ReturnType<typeof useTokenApproval>;
  tradeInfoErrorMessage?: string;
  underlyingTokenName?: string;
  variableApy?: number;
  fixedApr?: number;
};

const MintBurnForm: React.FunctionComponent<MintBurnFormProps> = ({
  approvalsNeeded = false,
  balance,
  currentPositionMarginRequirement,
  endDate,
  errors,
  formState,
  healthFactor,
  hintState,
  isFormValid,
  isTradeVierified,
  maxMargin,
  mode = MintBurnFormModes.NEW_POSITION,
  gaButtonId,
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
  underlyingTokenName = '',
  variableApy,
  fixedApr,
}) => {
  const bottomSpacing: SystemStyleObject<Theme> = {
    marginBottom: (theme) => theme.spacing(6),
  };
  const isAddingLiquidity =
    mode !== MintBurnFormModes.EDIT_LIQUIDITY ||
    formState.liquidityAction === MintBurnFormLiquidityAction.ADD;

  return (
    <FormPanel boxShadowType="LP">
      <ProtocolInformation protocol={protocol} fixedApr={fixedApr} variableApy={variableApy} />
      <Box sx={bottomSpacing}>
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
        <Box sx={{ ...bottomSpacing, display: 'flex' }}>
          <LiquidityControls value={formState.liquidityAction} onChange={onChangeLiquidityAction} />
        </Box>
      )}

      {mode === MintBurnFormModes.EDIT_MARGIN && (
        <Box sx={{ ...bottomSpacing, display: 'flex' }}>
          <MarginControls
            values={MintBurnFormMarginAction}
            value={formState.marginAction}
            onChange={onChangeMarginAction}
          />
        </Box>
      )}

      <Box sx={{ ...bottomSpacing, display: 'flex' }}>
        <RateOptions
          fixedLow={formState.fixedLow}
          fixedLowDisabled={
            mode === MintBurnFormModes.EDIT_LIQUIDITY || mode === MintBurnFormModes.EDIT_MARGIN
          }
          fixedLowError={errors['fixedLow']}
          fixedHigh={formState.fixedHigh}
          fixedHighDisabled={
            mode === MintBurnFormModes.EDIT_LIQUIDITY || mode === MintBurnFormModes.EDIT_MARGIN
          }
          fixedHighError={errors['fixedHigh']}
          onChangeFixedLow={onChangeFixedLow}
          onChangeFixedHigh={onChangeFixedHigh}
        />
      </Box>

      {mode !== MintBurnFormModes.EDIT_MARGIN && (
        <Box sx={bottomSpacing}>
          <NotionalAmount
            label={isAddingLiquidity ? 'Notional liquidity Provided' : 'Notional liquidity removed'}
            info={`Choose the notional amount of liquidity you wish to ${
              isAddingLiquidity ? 'provide' : 'remove'
            }.`}
            notional={formState.notional}
            onChangeNotional={onChangeNotional}
            error={errors['notional']}
            underlyingTokenName={underlyingTokenName}
          />
        </Box>
      )}

      {isAddingLiquidity && (
        <Box sx={bottomSpacing}>
          <MarginAmount
            balance={balance}
            currentPositionMarginRequirement={currentPositionMarginRequirement}
            underlyingTokenName={underlyingTokenName}
            maxMargin={maxMargin}
            margin={formState.margin}
            healthFactor={healthFactor}
            isAdditional={formState.marginAction === MintBurnFormMarginAction.ADD}
            isEditing={mode === MintBurnFormModes.EDIT_MARGIN}
            onChangeMargin={onChangeMargin}
            error={errors['margin']}
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
        gaButtonId={gaButtonId}
        submitButtonState={submitButtonState}
        tokenApprovals={tokenApprovals}
        tradeInfoErrorMessage={tradeInfoErrorMessage}
        underlyingTokenName={underlyingTokenName}
      />
    </FormPanel>
  );
};

export default MintBurnForm;
