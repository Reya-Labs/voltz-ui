import React from 'react';

import { BackgroundBox, BackgroundNeonsBox } from './Background.styled';
import { Neons } from './Neons/Neons';

export const Background: React.FunctionComponent = ({ children }) => (
  <BackgroundBox data-testid="Background-BackgroundBox">
    <BackgroundNeonsBox data-testid="Background-BackgroundNeonsBox">
      <Neons />
    </BackgroundNeonsBox>
    {children}
  </BackgroundBox>
);
