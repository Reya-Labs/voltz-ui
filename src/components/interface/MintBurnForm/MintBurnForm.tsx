import Box from '@mui/material/Box';
import { DateTime } from 'luxon';
import React from 'react';

import {
  MintBurnFormHintStates,
  MintBurnFormLiquidityAction,
  MintBurnFormMarginAction,
  MintBurnFormModes,
  MintBurnFormState,
  MintBurnFormSubmitButtonStates,
} from '../../../contexts/MintBurnFormContext/MintBurnFormContext';
import { useTokenApproval } from '../../../hooks/useTokenApproval';
import { SystemStyleObject, Theme } from '../../../theme';
import { IconLabel } from '../../composite/IconLabel/IconLabel';
import { MarginAmount } from '../../composite/MarginAmount/MarginAmount';
import { MaturityInformation } from '../../composite/MaturityInformation/MaturityInformation';
import { NotionalAmount } from '../../composite/NotionalAmount/NotionalAmount';
import { ProtocolInformation } from '../../composite/ProtocolInformation/ProtocolInformation';
import { FormPanel } from '../FormPanel/FormPanel';
import { MarginControls } from '../SwapForm/MarginControls/MarginControls';
import { LiquidityControls } from './LiquidityControls/LiquidityControls';
import { RateOptions } from './RateOptions/RateOptions';
import { SubmitControls } from './SubmitControls/SubmitControls';

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

export const MintBurnForm: React.FunctionComponent<MintBurnFormProps> = ({
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
      <ProtocolInformation fixedApr={fixedApr} protocol={protocol} variableApy={variableApy} />
      <Box sx={bottomSpacing}>
        <MaturityInformation
          endDate={endDate}
          label={
            <IconLabel
              icon="information-circle"
              info="The proportion between the time elapsed since the initiation of the pool and the entire duration."
              label="maturity"
              removeIcon
            />
          }
          startDate={startDate}
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
            value={formState.marginAction}
            values={MintBurnFormMarginAction}
            onChange={onChangeMarginAction}
          />
        </Box>
      )}

      <Box sx={{ ...bottomSpacing, display: 'flex' }}>
        <RateOptions
          fixedHigh={formState.fixedHigh}
          fixedHighDisabled={
            mode === MintBurnFormModes.EDIT_LIQUIDITY || mode === MintBurnFormModes.EDIT_MARGIN
          }
          fixedHighError={errors['fixedHigh']}
          fixedLow={formState.fixedLow}
          fixedLowDisabled={
            mode === MintBurnFormModes.EDIT_LIQUIDITY || mode === MintBurnFormModes.EDIT_MARGIN
          }
          fixedLowError={errors['fixedLow']}
          onChangeFixedHigh={onChangeFixedHigh}
          onChangeFixedLow={onChangeFixedLow}
        />
      </Box>

      {mode !== MintBurnFormModes.EDIT_MARGIN && (
        <Box sx={bottomSpacing}>
          <NotionalAmount
            error={errors['notional']}
            info={`Choose the notional amount of liquidity you wish to ${
              isAddingLiquidity ? 'provide' : 'remove'
            }.`}
            label={isAddingLiquidity ? 'Notional liquidity Provided' : 'Notional liquidity removed'}
            notional={formState.notional}
            underlyingTokenName={underlyingTokenName}
            onChangeNotional={onChangeNotional}
          />
        </Box>
      )}

      {isAddingLiquidity && (
        <Box sx={bottomSpacing}>
          <MarginAmount
            balance={balance}
            currentPositionMarginRequirement={currentPositionMarginRequirement}
            error={errors['margin']}
            healthFactor={healthFactor}
            isAdditional={formState.marginAction === MintBurnFormMarginAction.ADD}
            isEditing={mode === MintBurnFormModes.EDIT_MARGIN}
            margin={formState.margin}
            maxMargin={maxMargin}
            underlyingTokenName={underlyingTokenName}
            onChangeMargin={onChangeMargin}
          />
        </Box>
      )}

      <SubmitControls
        approvalsNeeded={approvalsNeeded}
        gaButtonId={gaButtonId}
        hintState={hintState}
        isFormValid={isFormValid}
        isTradeVerified={isTradeVierified}
        mode={mode}
        submitButtonState={submitButtonState}
        tokenApprovals={tokenApprovals}
        tradeInfoErrorMessage={tradeInfoErrorMessage}
        underlyingTokenName={underlyingTokenName}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </FormPanel>
  );
};
