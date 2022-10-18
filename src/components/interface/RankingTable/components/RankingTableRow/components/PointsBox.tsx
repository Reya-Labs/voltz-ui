import React from 'react';
import TableCell from '@mui/material/TableCell';
import { Typography } from '@components/atomic';
import { formatNumber } from '@utilities';

export type PointsBoxProps = {
  points: number;
};

const PointsBox: React.FunctionComponent<PointsBoxProps> = ({points}) => {

  const renderValue = () => {
      return `${formatNumber(points)}`;
  };

  return (
    <TableCell align='left'>
      <Typography variant="body2" sx={{fontSize: 18, fontWeight: 400, letterSpacing: '0.02em',lineHeight: '130%'}}>
        {renderValue()}
      </Typography>
    </TableCell>
  );
};

export default PointsBox;