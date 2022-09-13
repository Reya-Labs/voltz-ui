import React from 'react';
import TableCell from '@mui/material/TableCell';
import { Typography } from '@components/atomic';

export type RankProps = {
  points: number;
};

const Rank: React.FunctionComponent<RankProps> = ({points}) => {

  const renderValue = () => {
      return `${points}`;
  };

  return (
    <TableCell align='center' width="20%">
      <Typography variant="body2" sx={{fontSize: 18, color: '#2667FF', fontWeight: 700, letterSpacing: '0.02em',lineHeight: '130%'}}>
        {renderValue()}
      </Typography>
    </TableCell>
  );
};

export default Rank;