import React from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';
import { useTokenApproval } from '@hooks';
import { FormPanel } from '@components/interface';
import {
  IconLabel,
  ProtocolInformation,
  MaturityInformation,
  NotionalAmount,
} from '@components/composite';
import { SubmitControls } from './components';
import { SystemStyleObject, Theme } from '@theme';

import TableRow from '@mui/material/TableRow';
import { VariableAPY, FixedAPR, MaturityEndDate, VariableDebt, FixBorrowSlider } from './components';
import { Stack } from '@mui/material';

export type BorrowProps = {
  protocol?: string;
  startDate?: DateTime;
  endDate?: DateTime;
  errors: Record<string, string>;
  notional: number;
  onChangeNotional: (value: number | undefined) => void;
  underlyingTokenName?: string;
  approvalsNeeded: boolean;
  isFormValid: boolean;
  isTradeVerified: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  tokenApprovals: {
    checkingApprovals: boolean;
    approving: boolean;
  };
  tradeInfoErrorMessage?: string;
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
  tradeInfoErrorMessage
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
        <VariableDebt 
          variableDebt={100}
          currencySymbol={'$'}
          currencyCode={'USD'}
        />

        <FixBorrowSlider 
          variableDebt={100}
          selectedFixedDebt={0}
          selectedFixedDebtPercentage={0}
          selectedVariableDebt={100}
          selectedVariableDebtPercentage={100}
          currencySymbol={'$'}
        />
      </Box>

      <Box sx={bottomSpacing}>
        <NotionalAmount
          error={errors['notional']}
          label="margin required to fix rate"
          info={"To be added."}
          notional={notional}
          onChangeNotional={onChangeNotional}
          underlyingTokenName={underlyingTokenName}
          subtext={`BALANCE: 0`}
          disabled={true}
        />
      </Box>

      <SubmitControls
        approvalsNeeded={approvalsNeeded}
        isFormValid={isFormValid}
        isTradeVerified={isTradeVerified}
        onCancel={onCancel}
        onSubmit={onSubmit}
        protocol={protocol}
        tokenApprovals={tokenApprovals}
        tradeInfoErrorMessage={tradeInfoErrorMessage}
        underlyingTokenName={underlyingTokenName}
      />
    </FormPanel>
  );
};

export default BorrowForm;
