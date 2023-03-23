import { Typography } from 'brokoli-ui';
import React from 'react';

import { FixedRangeFields } from './FixedRangeFields';
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
import { MarginUpdateConfirmationFlow } from './MarginUpdateConfirmationFlow';
import { MintConfirmationFlow } from './MintConfirmationFlow';
import { NotionalAmountField } from './NotionalAmountField';
import { SubmitButton } from './SubmitButton';
import { TransactionDetails } from './TransactionDetails';

export const Form: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <MintConfirmationFlow />
      <MarginUpdateConfirmationFlow />
      <FormOuterBox>
        <MarginAccountBox>
          <MarginAccount />
        </MarginAccountBox>
        <TitleBox>
          <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Black">
            Provide Liquidity
          </Typography>
        </TitleBox>
        <FormBox>
          <FixedRangeFields />
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
