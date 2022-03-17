import React, { useEffect } from 'react';
import TableCell from '@mui/material/TableCell';

import { useAMMContext } from '@hooks';
import { Typography } from '@components/atomic';

export type VariableAPYProps = {};

const VariableAPY: React.FunctionComponent<VariableAPYProps> = () => {
  const { loadVariableApy, variableApy, variableApyLoading } = useAMMContext();

  useEffect(() => {
    loadVariableApy();
  }, [loadVariableApy]);

  return (
    <TableCell>
      <Typography variant="body2" label="Variable APY">
        {variableApyLoading ? 'Loading...' : `${variableApy || 0}%`}
      </Typography>
    </TableCell>
  );
};

export default VariableAPY;
