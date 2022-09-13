import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';

import { Button } from '@components/atomic';
import { useWallet } from '@hooks';

export type RankingTableRowProps = {
};


// todo: panel component, adjust the styling
const RankingTableRow: React.FunctionComponent<RankingTableRowProps> = ({}) => {
  const wallet = useWallet();
  const variant = 'main';

  const typeStyleOverrides = (): SystemStyleObject<Theme> => {
    if (!variant) {
      return {
        backgroundColor: `primary.dark`,
      };
    }
    if (variant == 'main') {
      return {
        backgroundColor: `#19152B`, // this affects the colour of the Pool table rows
        borderRadius: '8px'
      };
    }
    return {};
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
    return (
      // todo: <TableRow key={index} sx={{...anotherObject,  ...typeStyleOverrides() }}>
      <TableRow sx={{...typeStyleOverrides() }}>
      {button}
      </TableRow> );
    
  }

  return <>{renderTable()}</>;

  
};

export default RankingTableRow;
