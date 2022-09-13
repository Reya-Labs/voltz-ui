import React, { useMemo, useRef, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { SystemStyleObject, Theme } from '@theme';
import { Typography } from '@components/atomic';
import { Box, TableCell, TableHead, TableRow } from '@mui/material';

import { Panel } from '@components/atomic';
import RankingTableRow from './components/RankingTableRow/RankingTableRow';
import { RankingTableHeader } from './components';
import { getSortedRanking, RankType } from 'src/utilities/data';


export type RankingTableProps = {
  ranking: Map<string, number>;
};

const RankingTable: React.FunctionComponent<RankingTableProps> = ({
  ranking
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

  const commonOverrides: SystemStyleObject<Theme> = {
    '& .MuiTableCell-root': {
      borderColor: 'transparent',
      paddingRight: (theme) => theme.spacing(4),
      paddingLeft: (theme) => theme.spacing(4),
      paddingTop: (theme) => theme.spacing(2.5),
      paddingBottom: (theme) => theme.spacing(2.5),
      '&:first-of-type': {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
      },
      '&:last-of-type': {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      },
    },
    '.MuiInputLabel-root': {
      marginBottom: (theme) => theme.spacing(1)
    },
  };

  const cellSx: SystemStyleObject<Theme> = {
    '&.MuiTableCell-root': {
      borderBottom: 0,
      padding: 0,
      paddingLeft: (theme) => theme.spacing(5.1),
      paddingRight: (theme) => theme.spacing(4),
      paddingTop: (theme) => theme.spacing(1),
      paddingBottom: (theme) => theme.spacing(1),
    },
  };

  const renderTable = () => {
    return ( <>
      <TableContainer>
        <Table
          sx={{
            borderCollapse: 'separate',
            borderSpacing: '0px 16px',
            ...commonOverrides
          }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          {renderTableHead()}
          <TableBody sx={{ position: 'relative', top: (theme) => `-${theme.spacing(3)}` }}>
          {renderVariableRows()}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    )
    
  }

  const renderVariableRows = () => {
    const result: RankType[] = [];
    const keys = Array.from(ranking.keys());
    keys.forEach((address) => {
      const value = ranking.get(address);
      result.push({address: address, points: value ?? 0})
    });
    //ranking.forEach((points, address) => result.push({address: address, points: points}));
    const sorted = result.sort((a, b) => b.points - a.points);
    return <>
      <RankingTableRow ranking={sorted}/>
    </>
  }

  const renderTableHead = () => {
    const labels = ["rank", "trader", "points"];
    return (
    <TableHead>
      <TableRow>
        {
        labels.map((label) => (
          <TableCell
            align={"left"}
            padding="normal"
            sx={cellSx}
          >
            <Typography variant="subtitle1" sx={{textTransform: "uppercase", fontWeight: 400, fontSize: 12, color: "#9B97AD"}} >
              {label}
            </Typography>
            {/* </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    );
  }


  return (
    <>
    <RankingTableHeader loading={false} />
    <Panel variant={'dark'} borderRadius='large' padding='container' sx={{ paddingTop: 0, paddingBottom: 0, background:'transparent', marginTop: "40px"}}>
      <Typography variant="body2" sx={{ fontSize: '24px', fontWeight: 700, display: 'flex', alignContent: 'center'}}>
         SEASON 1 LEADERBOARD
      </Typography>
      {renderTable()}
    </Panel>
    </>
    
  );

  
};

export default RankingTable;
