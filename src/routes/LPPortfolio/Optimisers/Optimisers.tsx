import React from 'react';

import { Entry } from './Entry/Entry';
import { Header } from './Header/Header';
import { LPOptimisersTypography, OptimisersBox } from './Optimisers.styled';

export const Optimisers: React.FunctionComponent = () => {
  return (
    <OptimisersBox>
      <LPOptimisersTypography>LP OPTIMISERS</LPOptimisersTypography>
      <Header />
      <Entry />
    </OptimisersBox>
  );
};
