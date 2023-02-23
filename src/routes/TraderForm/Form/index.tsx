import { Typography } from 'brokoli-ui';
import React, { useState } from 'react';

import { FormBox } from './Form.styled';
import { LeverageField } from './LeverageField';
import { MarginAmountField } from './MarginAmountField';
import { NotionalAmountField } from './NotionalAmountField';
import { NotionalSwap } from './NotionalSwap';
import { SubmitButton } from './SubmitButton';

export const Form: React.FunctionComponent = () => {
  // TODO: move the mode to the redux store
  const [mode, setMode] = useState<'fixed' | 'variable'>('fixed');
  return (
    <FormBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Black">
        SWAP Rates
      </Typography>
      <NotionalSwap fixedRate={5.49} mode={mode} variableRate={2.49} onSwap={setMode} />
      <NotionalAmountField />
      <LeverageField />
      <MarginAmountField />
      <SubmitButton />
    </FormBox>
  );
};
