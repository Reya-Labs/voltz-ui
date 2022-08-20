import React, { useEffect } from 'react';

import { useAMMContext } from '@contexts';
import { Typography } from '@components/atomic';
import TableCell from '@mui/material/TableCell';
import { Box } from '@mui/system';

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
    <Box>
      <Typography variant="h3" label="Fixed APR" agentStyling sx={{ fontSize: 18 }}>
        {renderValue()}
      </Typography>
    </Box>
  );
};

export default FixedAPR;
