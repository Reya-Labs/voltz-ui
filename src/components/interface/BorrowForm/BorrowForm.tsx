import React from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';
import { UseAsyncFunctionResult, useTokenApproval } from '@hooks';
import { FormPanel } from '@components/interface';
import { MaskedIntegerField, InputTokenLabel } from '@components/composite';
import {
  IconLabel,
  ProtocolInformation,
  MaturityInformation,
  NotionalAmount,
} from '@components/composite';
import { SubmitControls } from './components';
import { SystemStyleObject, Theme } from '@theme';

import TableRow from '@mui/material/TableRow';
import { VariableAPY, FixedAPR, MaturityEndDate, FixBorrow, FixBorrowSlider } from './components';
import { Stack } from '@mui/material';
import { BorrowFormSubmitButtonHintStates, SwapFormSubmitButtonHintStates } from '@contexts';

export type BorrowProps = {
  protocol?: string;
  startDate?: DateTime;
  endDate?: DateTime;
  notional?: number;
  onChangeNotional: (value: number) => void;
  underlyingTokenName?: string;
  approvalsNeeded: boolean;
  isFormValid: boolean;
  isTradeVerified: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  tokenApprovals: ReturnType<typeof useTokenApproval>
  tradeInfoErrorMessage?: string;
  variableDebt: UseAsyncFunctionResult<unknown, number | void>;
  selectedFixedDebt?: number;
  selectedFixedDebtPercentage?: number;
  selectedVariableDebt?: number;
  selectedVariableDebtPercentage?: number;
  errors: Record<string, string>;
  hintState: BorrowFormSubmitButtonHintStates;
  margin: number;
};

const BorrowForm: React.FunctionComponent<BorrowProps> = ({
  protocol,
  startDate,
  endDate,
  errors,
  notional,
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
  margin
}) => {
  const bottomSpacing: SystemStyleObject<Theme> = {
    marginBottom: (theme) => theme.spacing(6)
  }

  return (
    <FormPanel>
      <ProtocolInformation protocol={protocol}/>
      
      <Box sx={bottomSpacing}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <FixedAPR />
          <VariableAPY />
          <MaturityEndDate endDate={endDate} />
        </Stack>
      </Box>

      <Box sx={bottomSpacing}>
        <FixBorrow
          variableDebt={variableDebt}
          currencySymbol={'$'}
          currencyCode={'USD'}
          selectedFixedDebt={selectedFixedDebt}
          selectedFixedDebtPercentage={selectedFixedDebtPercentage}
          selectedVariableDebt={selectedVariableDebt}
          selectedVariableDebtPercentage={selectedVariableDebtPercentage}
          handleChange={onChangeNotional}
        />
      </Box>

      <Box sx={bottomSpacing}>
        <MaskedIntegerField
          allowDecimals
          allowNegativeValue={false}
          suffix={<InputTokenLabel tokenName={underlyingTokenName || ''} />}
          suffixPadding={90}
          label={<IconLabel label={"margin required to fix rate"} icon="information-circle" info={"To be added."} />}
          value={margin}
          subtext={`BALANCE: 0`}
          disabled={true}
          error={!!errors['margin']}
          errorText={errors['margin']}
        />
      </Box>

      {/* <SubmitControls
        approvalsNeeded={approvalsNeeded}
        isFormValid={isFormValid}
        isTradeVerified={isTradeVerified}
        onCancel={onCancel}
        onSubmit={onSubmit}
        protocol={protocol}
        tokenApprovals={tokenApprovals}
        tradeInfoErrorMessage={tradeInfoErrorMessage}
        underlyingTokenName={underlyingTokenName}
      /> */}
      <SubmitControls
        approvalsNeeded={approvalsNeeded}
        hintState={hintState}
        isFormValid={isFormValid}
        isTradeVerified={isTradeVerified}
        onCancel={onCancel}
        onSubmit={onSubmit}
        protocol={protocol}
        // submitButtonState={submitButtonState}
        // swapInfoLoading={swapInfoLoading}
        tokenApprovals={tokenApprovals}
        tradeInfoErrorMessage={tradeInfoErrorMessage}
        underlyingTokenName={underlyingTokenName}
      />
    </FormPanel>
  );
};

export default BorrowForm;
