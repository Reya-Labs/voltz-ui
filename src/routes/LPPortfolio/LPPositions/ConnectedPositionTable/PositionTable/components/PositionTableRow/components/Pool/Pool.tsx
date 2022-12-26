import React from 'react';

import {
  PoolBorrowingLabelTypography,
  PoolBox,
  PoolLabelTypography,
  PoolValueTypography,
} from './Pool.styled';

export type PoolProps = {
  protocol: string;
  isBorrowing: boolean;
};

export const Pool: React.FunctionComponent<PoolProps> = ({ protocol, isBorrowing }) => {
  return (
    <PoolBox>
      <PoolLabelTypography>
        POOL
        {isBorrowing && (
          <PoolBorrowingLabelTypography>&nbsp; BORROWING</PoolBorrowingLabelTypography>
        )}
      </PoolLabelTypography>
      <PoolValueTypography>{protocol}</PoolValueTypography>
    </PoolBox>
  );
};
