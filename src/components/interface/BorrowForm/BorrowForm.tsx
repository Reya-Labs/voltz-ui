import Box from '@mui/material/Box';
import { DateTime } from 'luxon';
import React from 'react';

import { Agents } from '../../../contexts/AgentContext/types';
import {
  BorrowFormSubmitButtonHintStates,
  BorrowFormSubmitButtonStates,
} from '../../../contexts/BorrowFormContext/BorrowFormContext';
import { UseAsyncFunctionResult } from '../../../hooks/useAsyncFunction';
import { useTokenApproval } from '../../../hooks/useTokenApproval';
import { SystemStyleObject, Theme } from '../../../theme';
import { getPoolButtonId } from '../../../utilities/googleAnalytics/helpers';
import { formatCurrency } from '../../../utilities/number';
import { IconLabel } from '../../composite/IconLabel/IconLabel';
import { InputTokenLabel } from '../../composite/InputTokenLabel/InputTokenLabel';
import { MaskedIntegerField } from '../../composite/MaskedIntegerField/MaskedIntegerField';
import { ProtocolInformation } from '../../composite/ProtocolInformation/ProtocolInformation';
import { FormPanel } from '../FormPanel/FormPanel';
import { FixBorrow, SubmitControls } from './components';

export type BorrowProps = {
  protocol?: string;
  endDate?: DateTime;
  onChangeNotional: (value: number) => void;
  underlyingTokenName?: string;
  approvalsNeeded: boolean;
  isFormValid: boolean;
  isTradeVerified: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  tokenApprovals: ReturnType<typeof useTokenApproval>;
  tradeInfoErrorMessage?: string;
  variableDebt: UseAsyncFunctionResult<unknown, number | void>;
  selectedFixedDebt: number;
  selectedFixedDebtPercentage: number;
  selectedVariableDebt: number;
  selectedVariableDebtPercentage: number;
  errors: Record<string, string>;
  hintState: BorrowFormSubmitButtonHintStates;
  submitButtonState: BorrowFormSubmitButtonStates;
  margin: number;
  swapSummaryLoading: boolean;
  balance: number;
  variableApy?: number;
  fixedApr?: number;
};

export const BorrowForm: React.FunctionComponent<BorrowProps> = ({
  protocol,
  endDate,
  errors,
  onChangeNotional,
  underlyingTokenName,
  approvalsNeeded,
  isFormValid,
  isTradeVerified,
  onCancel,
  onSubmit,
  tokenApprovals,
  tradeInfoErrorMessage,
  variableDebt,
  selectedFixedDebt,
  selectedFixedDebtPercentage,
  selectedVariableDebt,
  selectedVariableDebtPercentage,
  hintState,
  submitButtonState,
  margin,
  swapSummaryLoading,
  balance,
  variableApy,
  fixedApr,
}) => {
  const bottomSpacing: SystemStyleObject<Theme> = {
    marginBottom: (theme) => theme.spacing(10),
  };

  let formattedBalance;
  if (protocol?.toUpperCase().includes('ETH')) {
    formattedBalance = formatCurrency(balance, false, false, 6, 6);
  } else {
    formattedBalance = formatCurrency(balance);
  }

  let formattedMargin;
  if (protocol?.toUpperCase().includes('ETH')) {
    formattedMargin = formatCurrency(margin, false, false, 6, 6);
  } else {
    formattedMargin = formatCurrency(margin);
  }

  return (
    <FormPanel isBorrowForm={true}>
      <Box sx={{ marginBottom: (theme) => theme.spacing(8) }}>
        <ProtocolInformation
          endDate={endDate}
          fixedApr={fixedApr}
          isBorrowForm={true}
          protocol={protocol}
          variableApy={variableApy}
        />
      </Box>

      <Box sx={{ marginBottom: (theme) => theme.spacing(2) }}>
        <FixBorrow
          error={!!errors['slider']}
          errorText={errors['slider']}
          handleChange={onChangeNotional}
          selectedFixedDebt={selectedFixedDebt}
          selectedFixedDebtPercentage={selectedFixedDebtPercentage}
          selectedVariableDebt={selectedVariableDebt}
          selectedVariableDebtPercentage={selectedVariableDebtPercentage}
          swapSummaryLoading={swapSummaryLoading}
          underlyingTokenName={underlyingTokenName}
          variableDebt={variableDebt}
        />
      </Box>

      <Box sx={bottomSpacing}>
        <MaskedIntegerField
          allowNegativeValue={false}
          disabled={true}
          error={!!errors['margin']}
          errorText={errors['margin']}
          label={
            <IconLabel
              icon="information-circle"
              info={
                'Margin required to enter position where you are paying the fixed rate on the selected amount (includes fees)'
              }
              label={'margin required to fix rate'}
            />
          }
          subtext={`WALLET BALANCE: ${formattedBalance}`}
          suffix={<InputTokenLabel tokenName={underlyingTokenName || ''} />}
          suffixPadding={90}
          value={formattedMargin}
          allowDecimals
        />
      </Box>
      <SubmitControls
        approvalsNeeded={approvalsNeeded}
        gaButtonId={getPoolButtonId('', '', '', Agents.VARIABLE_TRADER, true, '')}
        hintState={hintState}
        isFormValid={isFormValid}
        isTradeVerified={isTradeVerified}
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
