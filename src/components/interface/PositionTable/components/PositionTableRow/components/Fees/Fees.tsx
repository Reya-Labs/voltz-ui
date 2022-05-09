import React from 'react';
import TableCell from '@mui/material/TableCell';
import { Typography } from '@components/atomic';

export type FeesProps = {
  value: string;
};

const Fees: React.FunctionComponent<FeesProps> = ({value}) => {
  return (
    <TableCell>
      <Typography variant="body2" label="Fees" sx={{ fontSize: 18 }}>
        {value}
      </Typography>
    </TableCell>
  );
};

export default Fees;