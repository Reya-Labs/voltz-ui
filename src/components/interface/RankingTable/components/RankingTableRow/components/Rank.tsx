import React from 'react';
import TableCell from '@mui/material/TableCell';
import { Typography } from '@components/atomic';
import { ReactComponent as Silver } from './icons/silver.svg';
import { ReactComponent as Gold } from './icons/gold.svg';
import { ReactComponent as Bronze } from './icons/bronze.svg';

export type RankProps = {
  points: number;
};

const Rank: React.FunctionComponent<RankProps> = ({points}) => {

  const renderValue = () => {
      return `${points}`;
  };

  return (
    <TableCell align='left'>
      <Typography variant="body2" sx={{fontSize: 18, fontWeight: 400, letterSpacing: '0.02em',lineHeight: '130%'}}>
        {renderValue()} &thinsp;
        {points === 1 && (<Gold/>)}
        {points === 2 && (<Silver/>)}
        {points === 3 && (<Bronze/>)}
      </Typography>
    </TableCell>
  );
};

export default Rank;