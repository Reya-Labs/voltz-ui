import React, { useEffect } from 'react';

import { useAMMContext } from '@contexts';
import { Typography } from '@components/atomic';
import TableCell from '@mui/material/TableCell';

const FixedAPR: React.FunctionComponent = () => {
  const { fixedApr } = useAMMContext();
  const { result, loading, call } = fixedApr;

  useEffect(() => {
    call();
  }, [call]);

  const renderValue = () => {
    if (loading) {
      return 'Loading...';
    }

    if (!result) {
      return '0%';
    }

    return `${result.toFixed(2)}%`;
  };

  return (
    <TableCell>
      <Typography variant="body2" label="Fixed APR" agentStyling sx={{ fontSize: 18 }}>
        {renderValue()}
      </Typography>
    </TableCell>
  );
};

export default FixedAPR;
