import Box from '@mui/material/Box';
import { InfoPostSwap } from '@voltz-protocol/v1-sdk';
import { DateTime } from 'luxon';
import React from 'react';

import { Agents } from '../../../contexts/AgentContext/types';
import {
  SwapFormMarginAction,
  SwapFormSubmitButtonHintStates,
  SwapFormSubmitButtonStates,
} from '../../../contexts/SwapFormContext/enums';
import { SwapFormState } from '../../../contexts/SwapFormContext/SwapFormContext';
import { useAgent } from '../../../hooks/useAgent';
import { useTokenApproval } from '../../../hooks/useTokenApproval';
import { SystemStyleObject, Theme } from '../../../theme';
import { IconLabel } from '../../composite/IconLabel/IconLabel';
import { MarginAmount } from '../../composite/MarginAmount/MarginAmount';
import { MaturityInformation } from '../../composite/MaturityInformation/MaturityInformation';
import { NotionalAmount } from '../../composite/NotionalAmount/NotionalAmount';
import { ProtocolInformation } from '../../composite/ProtocolInformation/ProtocolInformation';
import { FormPanel } from '../FormPanel/FormPanel';
import { Leverage, MarginControls, SubmitControls, TraderControls } from './components';
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

export const SwapForm: React.FunctionComponent<SwapProps> = ({
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

      {mode === SwapFormModes.EDIT_MARGIN && (
        <Box sx={{ ...bottomSpacing, display: 'flex' }}>
          <MarginControls
            value={formState.marginAction}
            values={SwapFormMarginAction}
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
            defaultNotional={mode === SwapFormModes.EDIT_NOTIONAL ? 0 : undefined}
            error={errors['notional']}
            info={
              'Choose the notional you wish to trade. The notional amount is the total size of your trade.'
            }
            isEditing={mode === SwapFormModes.EDIT_NOTIONAL}
            label="notional amount"
            notional={formState.notional}
            underlyingTokenName={underlyingTokenName}
            onChangeNotional={onChangeNotional}
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
              resetDeltaState={formState.resetDeltaState}
              value={formState.leverage}
              onChange={onChangeLeverage}
            />
          </Box>
        )}

      {mode === SwapFormModes.EDIT_NOTIONAL && (
        <Box sx={{ ...bottomSpacing, display: 'flex' }}>
          <MarginControls
            value={formState.marginAction}
            values={SwapFormMarginAction}
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
            defaultMargin={0}
            error={errors['margin']}
            healthFactor={healthFactor}
            isAdditional={formState.marginAction === SwapFormMarginAction.ADD}
            isEditing={mode === SwapFormModes.EDIT_MARGIN || mode === SwapFormModes.EDIT_NOTIONAL}
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
        isTradeVerified={isTradeVerified}
        mode={mode}
        submitButtonState={submitButtonState}
        swapInfoLoading={swapInfoLoading}
        tokenApprovals={tokenApprovals}
        tradeInfoErrorMessage={tradeInfoErrorMessage}
        underlyingTokenName={underlyingTokenName}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </FormPanel>
  );
};
