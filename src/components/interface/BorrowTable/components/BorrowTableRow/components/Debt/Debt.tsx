import React, { useEffect } from 'react';
import TableCell from '@mui/material/TableCell';

import { useBorrowAMMContext, usePositionContext } from '@contexts';
import { Typography } from '@components/atomic';
import { Position } from '@voltz-protocol/v1-sdk/dist/types/entities';

export type DebtProps = {
  isFixedPositions: boolean;
};


const Debt: React.FunctionComponent<DebtProps> = ({isFixedPositions}) => {
  const { position } = usePositionContext();
  const { variableDebt, fixedDebt } = useBorrowAMMContext();
  const { result, loading, call } = (isFixedPositions ? fixedDebt : variableDebt);

  useEffect(() => {
    if (position) {
      call(position);
    }
  }, [call, position]);

  const renderValue = () => {
    if (loading) {
      return '---';
    }

    if (!result) {
      return '$0';
    }

    return `$${(result).toFixed(2)}`;
  };

  return (
    <TableCell>
      <Typography variant="body2" sx={{fontSize: 18}}>
        {renderValue()}
      </Typography>
    </TableCell>
  );
};

export default Debt;
