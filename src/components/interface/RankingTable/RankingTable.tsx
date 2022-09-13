import React, { useMemo, useRef, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { SystemStyleObject, Theme } from '@theme';
import { Typography } from '@components/atomic';
import { Box } from '@mui/material';

import { Panel } from '@components/atomic';
import RankingTableRow from './components/RankingTableRow/RankingTableRow';
import { RankingTableHeader } from './components';


export type RankingTableProps = {
};

const RankingTable: React.FunctionComponent<RankingTableProps> = ({
}) => {

  const replacementRowStyle: SystemStyleObject<Theme> = {
      fontSize: 18,
      fontWeight: '400',
      color: "#48435E",
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: `#151221`,
      borderRadius: 2,
      padding: '10px',
      marginTop: (theme) => theme.spacing(-3),
      marginBottom: (theme) => theme.spacing(8)
  };

  const renderVariableTable = () => {
  
    return ( <>
      <TableContainer>
        <Table
          sx={{
            borderCollapse: 'separate',
            borderSpacing: '0px 16px'
          }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <TableBody sx={{ position: 'relative', top: (theme) => `-${theme.spacing(3)}` }}>
          {renderVariableRows()}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    )
    
  }

  const renderVariableRows = () => {
    return <>
      <RankingTableRow/>
    </>
  }


  return (
    <>
    <RankingTableHeader loading={false} />
    <Panel variant={'dark'} borderRadius='large' padding='container' sx={{ paddingTop: 0, paddingBottom: 0, background:'transparent' }}>
      {/* VARIABLE POSITIONS TABLE */}
      <Typography variant="body2" sx={{ fontSize: '18px', fontWeight: 700, display: 'flex', alignContent: 'center'}}>
        <Box sx={{backgroundColor: "#2667FF", borderRadius: "5px", width: '4px', height: '4px', marginTop: '12px', marginRight: '8px'}}></Box>
         VARIABLE POSITIONS
      </Typography>
      {renderVariableTable()}
    </Panel>
    </>
    
  );

  
};

export default RankingTable;
