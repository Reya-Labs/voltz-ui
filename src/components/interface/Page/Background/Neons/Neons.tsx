import React from 'react';

import { NeonBoxInner, NeonBoxOuter } from './Neons.styled';

export const Neons: React.FunctionComponent = React.memo(() => (
  <>
    <NeonBoxInner data-testid="Neons-NeonBoxInner" />
    <NeonBoxOuter data-testid="Neons-NeonBoxOuter" />
  </>
));
