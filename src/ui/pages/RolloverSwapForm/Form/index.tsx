import { Typography } from 'brokoli-ui';
import React from 'react';

import {
  FormBox,
  FormOuterBox,
  MarginAccountBox,
  TitleBox,
  TransactionDetailsBox,
} from './Form.styled';
import { LeverageField } from './LeverageField';
import { MarginAccount } from './MarginAccount';
import { MarginAmountField } from './MarginAmountField';
import { NotionalAmountField } from './NotionalAmountField';
import { NotionalSwap } from './NotionalSwap';
import { RolloverConfirmationFlow } from './RolloverConfirmationFlow';
import { SubmitButton } from './SubmitButton';
import { TransactionDetails } from './TransactionDetails';

export const Form: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <RolloverConfirmationFlow />
      <FormOuterBox>
        <MarginAccountBox>
          <MarginAccount />
        </MarginAccountBox>
        <TitleBox>
          <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Black">
            SWAP Rates
          </Typography>
        </TitleBox>
        <FormBox>
          <NotionalSwap />
          <NotionalAmountField />
          <LeverageField />
          <MarginAmountField />
          <SubmitButton />
        </FormBox>
        <TransactionDetailsBox>
          <TransactionDetails />
        </TransactionDetailsBox>
      </FormOuterBox>
    </React.Fragment>
  );
};
