import { Typography } from 'brokoli-ui';
import React from 'react';

import { FormBox, FormOuterBox, TitleBox } from './Form.styled';
import { LeverageField } from './LeverageField';
import { MarginAmountField } from './MarginAmountField';
import { NotionalAmountField } from './NotionalAmountField';
import { NotionalSwap } from './NotionalSwap';
import { SubmitButton } from './SubmitButton';
import { TransactionDetails } from './TransactionDetails';

export const Form: React.FunctionComponent = () => {
  return (
    <FormOuterBox>
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
      <TransactionDetails />
    </FormOuterBox>
  );
};
