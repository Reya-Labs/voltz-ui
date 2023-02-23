import { Typography } from 'brokoli-ui';
import React, { useState } from 'react';

import { FormBox, FormOuterBox, TitleBox } from './Form.styled';
import { LeverageField } from './LeverageField';
import { MarginAmountField } from './MarginAmountField';
import { NotionalAmountField } from './NotionalAmountField';
import { NotionalSwap } from './NotionalSwap';
import { SubmitButton } from './SubmitButton';
import { TransactionDetails } from './TransactionDetails';

export const Form: React.FunctionComponent = () => {
  // TODO: move the mode to the redux store
  const [mode, setMode] = useState<'fixed' | 'variable'>('fixed');
  return (
    <FormOuterBox>
      <TitleBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Black">
          SWAP Rates
        </Typography>
      </TitleBox>
      <FormBox>
        <NotionalSwap fixedRate={5.49} mode={mode} variableRate={2.49} onSwap={setMode} />
        <NotionalAmountField />
        <LeverageField />
        <MarginAmountField />
        <SubmitButton />
      </FormBox>
      <TransactionDetails />
    </FormOuterBox>
  );
};
