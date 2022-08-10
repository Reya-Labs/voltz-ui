import React, { useEffect } from 'react';

import { useAMMContext } from '@contexts';
import { Typography } from '@components/atomic';
import { Box } from '@mui/system';

const VariableAPY: React.FunctionComponent = () => {
  const { variableApy } = useAMMContext();
  const { result, loading, call } = variableApy;

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

    return `${(result * 100).toFixed(2)}%`;
  };

  return (
    <Box>
      <Typography variant="h3" label="Variable APY" agentStyling sx={{fontSize: 18}}>
        {renderValue()}
      </Typography>
    </Box>
  );
};

export default VariableAPY;
