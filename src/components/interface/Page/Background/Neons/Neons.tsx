import React from 'react';

import { NeonBoxInner, NeonBoxOuter } from './Neons.styled';

export const Neons: React.FunctionComponent = React.memo(() => {
  return (
    <>
      <NeonBoxInner />
      <NeonBoxOuter />
    </>
  );
});
