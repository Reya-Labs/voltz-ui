import React, { useEffect } from 'react';
import TableCell from '@mui/material/TableCell';

import { useAMMContext } from '@hooks';
import { Typography } from '@components/atomic';
import { isUndefined } from 'lodash';

export type CurrentMarginProps = {
  tickLower?: number;
  tickUpper?: number;
  token: string;
};

const CurrentMargin: React.FunctionComponent<CurrentMarginProps> = ({tickLower, tickUpper, token}) => {
  const { currentMargin } = useAMMContext();
  const { result, loading, call } = currentMargin;

  useEffect(() => {
    if (!isUndefined(tickLower) && !isUndefined(tickUpper)) {
      call({ tickLower, tickUpper });
    }
  }, [call, tickLower, tickUpper]);

  const renderValue = () => {
    if (loading) {
      return 'Loading...';
    }

    if (!result) {
      return 'No data';
    }

    
    return `${result.toFixed(2)} ${token}`;
  };

  return (
    <TableCell>
      <Typography variant="body2" label="Current Margin" sx={{ fontSize: 18 }}>
        {renderValue()}
      </Typography>
    </TableCell>
  );
};

export default CurrentMargin;
