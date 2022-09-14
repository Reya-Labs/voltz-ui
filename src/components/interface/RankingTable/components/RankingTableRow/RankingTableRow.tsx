import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';
import { Typography } from '@components/atomic';

import { Button } from '@components/atomic';
import { AddressBox, PointsBox, Rank } from './components';
import { RankType} from 'src/utilities/data/rankingData';

export type RankingTableRowProps = {
  ranking: RankType[];
  page: number;
};


// todo: panel component, adjust the styling
const RankingTableRow: React.FunctionComponent<RankingTableRowProps> = ({ranking, page}) => {

  const typeStyleOverrides = (): SystemStyleObject<Theme> => {
      return {
        backgroundColor: `#262040`, // this affects the colour of the Pool table rows
        borderRadius: '10px'
      };
  };

  const handleClick = () => {
  };

  const loadButton = () => {
    return (
    <TableCell align="left" width="20%">
        <Button onClick={handleClick} sx={{
          backgroundColor: '#19152B',
          color: 'primary.light',
          '&:hover': {
            backgroundColor: '#19152B',
            borderStyle: 'none none solid none',
            borderColor: 'primary.light',
            borderRadius: '0px'
          },
          padding: '4px 1px',
          fontSize: 18,
          lineHeight: 1,
          boxShadow: 'none',
          borderStyle: 'none none none none',
          borderRadius: '0px'
        }}>
          FIX RATE
        </Button>
    </TableCell>
    );
  }

  const renderTable = () => {
    const button = loadButton(); 
    const labels = ["rank", "trader", "points"];
    const agag = Array.from({length: 40}, () => Math.floor(Math.random() * 40));
    return (
      <>
        { ranking.map((rank, index) => {
          if (index < page*10 || index >= page*10+10 ) {return <></>}
          return (
          <TableRow sx={{...typeStyleOverrides() }}>
            {labels.map((label) => {
                  if (label === 'rank') {
                    return <Rank points={index+1}/>;
                  }
                  if (label === 'points') {
                    return <PointsBox points={rank.points}/>;
                  }
                  if (label === 'trader') {
                    return <AddressBox address={rank.address}></AddressBox>;
                  }
          
              })}
          </TableRow> );
        })
        }
      </>
    );
    
  }

  return <>{renderTable()}</>;
  
};

export default RankingTableRow;
