import React from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';
import { useAgent, useTokenApproval } from '../../../hooks';
import {
  Agents,
  SwapFormMarginAction,
  SwapFormState,
  SwapFormSubmitButtonHintStates,
  SwapFormSubmitButtonStates,
} from '../../../contexts';
import { FormPanel } from '@components/interface';
import {
  IconLabel,
  ProtocolInformation,
  MaturityInformation,
  NotionalAmount,
  MarginAmount,
} from '@components/composite';
import { TraderControls, MarginControls, SubmitControls, Leverage } from './components';
import { SystemStyleObject, Theme } from '@theme';
import { InfoPostSwap } from '@voltz-protocol/v1-sdk';
import { SwapFormActions, SwapFormModes } from './types';

export type SwapProps = {
  approvalsNeeded: boolean;
  balance?: number;
  currentPositionMarginRequirement?: number;
  endDate?: DateTime;
  errors: Record<string, string>;
  formState: SwapFormState;
  formAction: SwapFormActions;
  healthFactor?: number;
  hintState: SwapFormSubmitButtonHintStates;
  isFormValid: boolean;
  isTradeVerified: boolean;
  maxMargin?: number;
  mode: SwapFormModes;
  onCancel: () => void;
  onChangeLeverage: (value: number, resetToDefaultLeverage?: boolean) => void;
  onChangeMargin: (value: number | undefined) => void;
  onChangeMarginAction: (value: SwapFormMarginAction) => void;
  onChangeNotional: (value: number | undefined) => void;
  onSubmit: () => void;
  protocol?: string;
  gaButtonId?: string;
  startDate?: DateTime;
  swapInfo: InfoPostSwap | void | null;
  swapInfoLoading: boolean;
  submitButtonState: SwapFormSubmitButtonStates;
  tokenApprovals: ReturnType<typeof useTokenApproval>;
  tradeInfoErrorMessage?: string;
  underlyingTokenName?: string;
  variableApy?: number;
  fixedApr?: number;
};

const Swap: React.FunctionComponent<SwapProps> = ({
  approvalsNeeded,
  balance,
  currentPositionMarginRequirement,
  endDate,
  errors,
  formAction,
  formState,
  healthFactor,
  hintState,
  isFormValid,
  isTradeVerified,
  maxMargin,
  mode,
  onCancel,
  onChangeLeverage,
  onChangeMargin,
  onChangeMarginAction,
  onChangeNotional,
  onSubmit,
  protocol,
  gaButtonId,
  startDate,
  submitButtonState,
  swapInfo,
  swapInfoLoading,
  tokenApprovals,
  tradeInfoErrorMessage,
  underlyingTokenName,
  variableApy,
  fixedApr,
}) => {
  const { agent, onChangeAgent } = useAgent();
  const bottomSpacing: SystemStyleObject<Theme> = {
    marginBottom: (theme) => theme.spacing(6),
  };

  return (
    <FormPanel boxShadowType={agent === Agents.FIXED_TRADER ? 'FT' : 'VT'}>
      <ProtocolInformation protocol={protocol} variableApy={variableApy} fixedApr={fixedApr} />

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

      {mode === SwapFormModes.EDIT_MARGIN && (
        <Box sx={{ ...bottomSpacing, display: 'flex' }}>
          <MarginControls
            values={SwapFormMarginAction}
            value={formState.marginAction}
            onChange={onChangeMarginAction}
          />
        </Box>
      )}

      {mode !== SwapFormModes.EDIT_MARGIN && (
        <Box sx={{ ...bottomSpacing, display: 'flex' }}>
          <TraderControls
            agent={agent}
            isEdit={mode === SwapFormModes.EDIT_NOTIONAL}
            onChangeAgent={onChangeAgent}
          />
        </Box>
      )}

      {mode !== SwapFormModes.EDIT_MARGIN && (
        <Box sx={bottomSpacing}>
          <NotionalAmount
            error={errors['notional']}
            label="notional amount"
            defaultNotional={mode === SwapFormModes.EDIT_NOTIONAL ? 0 : undefined}
            isEditing={mode === SwapFormModes.EDIT_NOTIONAL}
            info={
              'Choose the notional you wish to trade. The notional amount is the total size of your trade.'
            }
            notional={formState.notional}
            onChangeNotional={onChangeNotional}
            underlyingTokenName={underlyingTokenName}
          />
        </Box>
      )}

      {(mode === SwapFormModes.NEW_POSITION || mode === SwapFormModes.ROLLOVER) &&
        (agent === Agents.FIXED_TRADER || agent === Agents.VARIABLE_TRADER) && (
          <Box sx={{ ...bottomSpacing, display: 'flex' }}>
            <Leverage
              availableNotional={swapInfo?.availableNotional ?? undefined}
              minMargin={swapInfo?.marginRequirement ?? undefined}
              notional={formState.notional}
              onChange={onChangeLeverage}
              value={formState.leverage}
              resetDeltaState={formState.resetDeltaState}
            />
          </Box>
        )}

      {mode === SwapFormModes.EDIT_NOTIONAL && (
        <Box sx={{ ...bottomSpacing, display: 'flex' }}>
          <MarginControls
            values={SwapFormMarginAction}
            value={formState.marginAction}
            onChange={onChangeMarginAction}
          />
        </Box>
      )}

      {(formAction === SwapFormActions.SWAP ||
        formAction === SwapFormActions.UPDATE ||
        formAction === SwapFormActions.ROLLOVER_SWAP) && (
        <Box sx={bottomSpacing}>
          <MarginAmount
            balance={balance}
            currentPositionMarginRequirement={currentPositionMarginRequirement}
            error={errors['margin']}
            healthFactor={healthFactor}
            isAdditional={formState.marginAction === SwapFormMarginAction.ADD}
            isEditing={mode === SwapFormModes.EDIT_MARGIN || mode === SwapFormModes.EDIT_NOTIONAL}
            defaultMargin={0}
            margin={formState.margin}
            maxMargin={maxMargin}
            onChangeMargin={onChangeMargin}
            underlyingTokenName={underlyingTokenName}
          />
        </Box>
      )}

      <SubmitControls
        approvalsNeeded={approvalsNeeded}
        hintState={hintState}
        isFormValid={isFormValid}
        isTradeVerified={isTradeVerified}
        mode={mode}
        onCancel={onCancel}
        onSubmit={onSubmit}
        gaButtonId={gaButtonId}
        submitButtonState={submitButtonState}
        swapInfoLoading={swapInfoLoading}
        tokenApprovals={tokenApprovals}
        tradeInfoErrorMessage={tradeInfoErrorMessage}
        underlyingTokenName={underlyingTokenName}
      />
    </FormPanel>
  );
};

export default Swap;
