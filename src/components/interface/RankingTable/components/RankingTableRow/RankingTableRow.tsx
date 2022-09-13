import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';

import { Button } from '@components/atomic';
import { useWallet } from '@hooks';
import { AddressBox, PointsBox, Rank } from './components';
import { formatNumber } from '@utilities';

export type RankingTableRowProps = {
};


// todo: panel component, adjust the styling
const RankingTableRow: React.FunctionComponent<RankingTableRowProps> = ({}) => {
  const wallet = useWallet();
  const variant = 'main';

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
        { agag.map(() => {
          return (
          <TableRow sx={{...typeStyleOverrides() }}>
            {labels.map((label) => {
                  if (label === 'rank') {
                    return <Rank points={parseInt((Math.random() * 10 + 1).toFixed(0))}/>;
                  }
                  if (label === 'points') {
                    return <PointsBox points={parseInt((Math.random() * 100 + 1).toFixed(0))}/>;
                  }
                  if (label === 'trader') {
                    return <AddressBox address={"0x27h276399n990hg9i9920984ff90"}></AddressBox>;
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
