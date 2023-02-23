import { Typography } from 'brokoli-ui';
import React, { useState } from 'react';

import { Ellipsis } from '../../../components/atomic/Ellipsis/Ellipsis';
import { FormBox } from './Form.styled';
import { MarginAmountField } from './MarginAmountField';
import { NotionalAmountField } from './NotionalAmountField';
import { NotionalSwap } from './NotionalSwap';

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
      <MarginAmountField />
      <Typography colorToken="lavenderWeb" typographyToken="primaryBodyExtraLargeRegular">
        Engineers at work 👨🛠📋 <Ellipsis />
      </Typography>
    </FormBox>
  );
};
