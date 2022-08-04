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

        <Box sx={bottomSpacing}>
          <NotionalAmount
            error={errors['notional']}
            label="notional amount"
            info={"To be added."}
            notional={notional}
            onChangeNotional={onChangeNotional}
            underlyingTokenName={underlyingTokenName}
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
