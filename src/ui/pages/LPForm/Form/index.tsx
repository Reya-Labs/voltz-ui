import { Typography } from 'brokoli-ui';
import React from 'react';

import {
  FormBox,
  FormOuterBox,
  MarginAccountBox,
  TitleBox,
  TransactionDetailsBox,
} from '../../../components/_Deprecated/FormStyled';
import { FixedRangeFields } from './FixedRangeFields';
import { LeverageField } from './LeverageField';
import { LPConfirmationFlow } from './LPConfirmationFlow';
import { MarginAccount } from './MarginAccount';
import { MarginAmountField } from './MarginAmountField';
import { MarginUpdateConfirmationFlow } from './MarginUpdateConfirmationFlow';
import { NotionalAmountField } from './NotionalAmountField';
import { SubmitButton } from './SubmitButton';
import { TransactionDetails } from './TransactionDetails';

export const Form: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <LPConfirmationFlow />
      <MarginUpdateConfirmationFlow />
      <FormOuterBox>
        <MarginAccountBox>
          <MarginAccount />
        </MarginAccountBox>
        <TitleBox>
          <Typography colorToken="white100" typographyToken="primaryHeader3Black">
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
