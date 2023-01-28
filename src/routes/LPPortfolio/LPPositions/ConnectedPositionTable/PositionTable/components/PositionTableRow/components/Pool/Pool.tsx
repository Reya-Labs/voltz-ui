import React from 'react';

import {
  PoolAaveV3LabelTypography,
  PoolBorrowingLabelTypography,
  PoolBox,
  PoolLabelTypography,
  PoolValueTypography,
} from './Pool.styled';

export type PoolProps = {
  protocol: string;
  isBorrowing: boolean;
  isAaveV3: boolean;
};

export const Pool: React.FunctionComponent<PoolProps> = ({ isAaveV3, protocol, isBorrowing }) => {
  return (
    <PoolBox>
      <PoolLabelTypography>
        POOL
        {isBorrowing && (
          <PoolBorrowingLabelTypography>&nbsp; BORROWING</PoolBorrowingLabelTypography>
        )}
        {isAaveV3 && <PoolAaveV3LabelTypography>&nbsp; AAVE V3</PoolAaveV3LabelTypography>}
      </PoolLabelTypography>
      <PoolValueTypography>{protocol}</PoolValueTypography>
    </PoolBox>
  );
};
