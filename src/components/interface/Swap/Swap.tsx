import React from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';
import { SystemStyleObject, Theme } from '@mui/system';
import { useAgent, useTokenApproval } from '@hooks';
import { Agents, SwapFormMarginAction, SwapFormState, SwapFormSubmitButtonHintStates, SwapFormSubmitButtonStates, } from '@contexts';
import { Panel } from '@components/atomic';
import {
  IconLabel,
  ProtocolInformation,
  MaturityInformation,
  NotionalAmount,
  MarginAmount,
} from '@components/composite';
import { TraderControls, MarginControls, SwapInfo, SwapInfoEditMargin, SubmitControls, Leverage } from './components';
import { colors } from '@theme';
import { InfoPostSwap } from '@voltz-protocol/v1-sdk';
import { SwapFormActions, SwapFormModes } from './types';
import { PositionBadge } from '@components/interface';
import { isUndefined } from 'lodash';

export type SwapProps = {
  approvalsNeeded: boolean;
  balance?: number;
  endDate?: DateTime;
  errors: Record<string, string>;
  formState: SwapFormState;
  formAction: SwapFormActions;
  hintState: SwapFormSubmitButtonHintStates;
  isFCMAction: boolean;
  isFCMAvailable: boolean;
  isFormValid: boolean;
  isTradeVerified: boolean;
  maxMargin?: number;
  minRequiredMargin?: number;
  mode: SwapFormModes;
  onCancel: () => void;
  onChangeLeverage: (value: number) => void;
  onChangeMargin: (value: number | undefined) => void;
  onChangeMarginAction: (value: SwapFormMarginAction) => void;
  onChangeNotional: (value: number | undefined) => void;
  onChangePartialCollateralization: (value: boolean) => void;
  onSubmit: () => void;
  positionMargin?: number;
  protocol?: string;
  startDate?: DateTime;
  swapInfo: InfoPostSwap | void | null;
  swapInfoLoading: boolean;
  submitButtonState: SwapFormSubmitButtonStates;
  tokenApprovals: ReturnType<typeof useTokenApproval>;
  tradeInfoErrorMessage?: string;
  underlyingTokenName?: string;
};

const Swap: React.FunctionComponent<SwapProps> = ({
  approvalsNeeded,
  balance,
  endDate,
  errors,
  formAction,
  formState,
  hintState,
  isFCMAction,
  isFCMAvailable,
  isFormValid,
  isTradeVerified,
  maxMargin,
  minRequiredMargin,
  mode,
  onCancel,
  onChangeLeverage,
  onChangeMargin,
  onChangeMarginAction,
  onChangeNotional,
  onChangePartialCollateralization,
  onSubmit,
  positionMargin,
  protocol,
  startDate,
  submitButtonState,
  swapInfo,
  swapInfoLoading,
  tokenApprovals,
  tradeInfoErrorMessage,
  underlyingTokenName,
}) => {
  const { agent, onChangeAgent } = useAgent();
  const bottomSpacing: SystemStyleObject<Theme> = {
    marginBottom: (theme) => theme.spacing(6)
  }

  return (
    <Panel
      variant="dark"
      sx={{
        marginTop: 12,
        width: (theme) => theme.spacing(97),
        boxShadow: () => agent === Agents.FIXED_TRADER 
          ? '0px 0px 88px rgba(0, 131, 155, 0.2)' 
          : '0px 0px 88px rgba(38, 103, 255, 0.20)',
      }}
    >
      {!formState.partialCollateralization && (
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: (theme) => theme.spacing(6) }}>
          <PositionBadge variant='FC' sx={{ display: 'inline-block', marginLeft: 0 }} />
          <IconLabel 
            icon="information-circle" 
            label="" 
            info="Please note that for the initial phase of the Voltz protocol mainnet launch, users who have supplied assets to the FCM will not accrue underling protocol rewards (ie COMP and AAVE). The Voltz Labs team will push an update in the coming weeks to allow for accruing and claiming of underling protocol rewards going forward." 
            iconSx={{ color: colors.skyBlueCrayola.base, height: '14px', width: '14px', top: '0' }} 
          />
        </Box>
      )}

      <ProtocolInformation protocol={protocol}/>

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
            isFCMAvailable={isFCMAvailable}
            partialCollateralization={formState.partialCollateralization}
            onChangeAgent={onChangeAgent}
            onChangePartialCollateralization={onChangePartialCollateralization}
          />
        </Box>
      )}

      {mode !== SwapFormModes.EDIT_MARGIN && (
        <Box sx={bottomSpacing}>
          <NotionalAmount
            error={errors['notional']}
            label="notional amount"
            info={(formAction === SwapFormActions.FCM_SWAP || formAction === SwapFormActions.FCM_UNWIND)
              ? "Choose the notional you wish to trade. The notional amount is the total size of your trade and, since you're fully collateralising your position, is the amount of margin required too."
              : "Choose the notional you wish to trade. The notional amount is the total size of your trade."
            }
            notional={formState.notional}
            onChangeNotional={onChangeNotional}
            underlyingTokenName={underlyingTokenName}
          />
        </Box>
      )}

      {mode === SwapFormModes.NEW_POSITION && ((agent === Agents.FIXED_TRADER && formState.partialCollateralization) || agent === Agents.VARIABLE_TRADER) && (
        <Box sx={{ ...bottomSpacing, display: 'flex' }}>
          <Leverage 
            availableNotional={swapInfo?.availableNotional ?? undefined}
            minMargin={swapInfo?.marginRequirement ?? undefined}
            notional={formState.notional}
            onChange={onChangeLeverage}
            value={formState.leverage}
          />
        </Box>
      )}

      {(formAction === SwapFormActions.SWAP || formAction === SwapFormActions.UPDATE) && (
        <Box sx={bottomSpacing}>
          <MarginAmount
            balance={balance}
            error={errors['margin']}
            isAdditional={formState.marginAction === SwapFormMarginAction.ADD}
            isEditing={mode === SwapFormModes.EDIT_MARGIN}
            margin={formState.margin}
            maxMargin={maxMargin}
            onChangeMargin={onChangeMargin}
            underlyingTokenName={underlyingTokenName}
          />
        </Box>
      )}

      {mode === SwapFormModes.NEW_POSITION && (swapInfo || swapInfoLoading) && (
        <Box sx={bottomSpacing}>
          <SwapInfo
            data={swapInfo} 
            loading={swapInfoLoading} 
            underlyingTokenName={underlyingTokenName}
            yieldBearingTokenName={protocol}
            formAction={formAction}
          />
        </Box>
      )}

      {mode === SwapFormModes.EDIT_MARGIN && !isUndefined(minRequiredMargin) && !isUndefined(positionMargin) && (
        <Box sx={bottomSpacing}>
          <SwapInfoEditMargin 
            balance={balance}
            minRequiredMargin={minRequiredMargin}
            positionMargin={positionMargin}
            underlyingTokenName={underlyingTokenName}
          />
        </Box>
      )}

      <SubmitControls
        approvalsNeeded={approvalsNeeded}
        hintState={hintState}
        isFCMAction={isFCMAction}
        isFormValid={isFormValid}
        isTradeVerified={isTradeVerified}
        mode={mode}
        onCancel={onCancel}
        onSubmit={onSubmit}
        protocol={protocol}
        submitButtonState={submitButtonState}
        swapInfoLoading={swapInfoLoading}
        tokenApprovals={tokenApprovals}
        tradeInfoErrorMessage={tradeInfoErrorMessage}
        underlyingTokenName={underlyingTokenName}
      />
    </Panel>
  );
};

export default Swap;
