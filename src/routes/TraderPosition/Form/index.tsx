import { Typography } from 'brokoli-ui';
import React, { useState } from 'react';

import { Ellipsis } from '../../../components/atomic/Ellipsis/Ellipsis';
import { FormBox } from './Form.styled';
import { NotionalSwap } from './NotionalSwap';

export const Form: React.FunctionComponent = () => {
  const [mode, setMode] = useState<'fixed' | 'variable'>('fixed');
  return (
    <FormBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Black">
        SWAP Rates
      </Typography>
      <NotionalSwap fixedRate={5.49} mode={mode} variableRate={2.49} onSwap={setMode} />

      <Typography typographyToken="primaryBodyExtraLargeRegular">
        Engineers at work 👨🛠📋 <Ellipsis />
      </Typography>
    </FormBox>
  );
};
