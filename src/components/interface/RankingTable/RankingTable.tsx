import React, { useEffect, useRef, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { SystemStyleObject, Theme } from '@theme';
import { Typography } from '@components/atomic';
import { Box, Button, TableCell, TableHead, TableRow } from '@mui/material';

import { Panel } from '@components/atomic';
import { RankingTableHeader, RankingTableRow } from './components';
import { RankType } from 'src/utilities/data';
import { DateTime } from 'luxon';
import { useWallet } from '@hooks';

export type RankingTableProps = {
  ranking: Map<string, number>;
  seasonNumber: string;
  seasonStartDate: DateTime;
  seasonEndDate: DateTime;
};

const RankingTable: React.FunctionComponent<RankingTableProps> = ({
  ranking,
  seasonNumber,
  seasonStartDate,
  seasonEndDate,
}) => {
  const [page, setPage] = useState<number>(0);
  const wallet = useWallet();

  const [userRank, setUserRank] = useState<number>();
  const [userPoints, setUserPoints] = useState<number>();
  const [userAddress, setUserAddress] = useState<string>();
  const allPages = useRef<number>(-2);

  const [sorted, setSorted] = useState<RankType[]>();

  useEffect(() => {
    const result: RankType[] = [];
    const keys = Array.from(ranking.keys());
    keys.forEach((address) => {
      const value = ranking.get(address);
      result.push({ address: address, points: value ?? 0 });
    });
    allPages.current = Math.round(result.length / 10) + 1;

    const s = result.sort((a, b) => b.points - a.points);
    setSorted(s);

    if (s) {
      for (let i = 0; i < s.length; i++) {
        const e = s[i];
        if (e.address === wallet.account) {
          setUserAddress(e.address);
          setUserPoints(e.points);
          setUserRank(i + 1);
        }
      }
    }
  }, []);

  const renderPageControl = () => {
    if (allPages.current !== -1) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleClickLeft} variant={'text'} sx={{ color: '#FF4AA9' }}>
            &larr; Previous Page
          </Button>
          <Typography variant="body2" sx={{ fontSize: 18, fontWeight: 400, margin: '5px' }}>
            {page + 1}/{allPages.current}
          </Typography>
          <Button onClick={handleClickRight} variant={'text'} sx={{ color: '#FF4AA9' }}>
            Next Page &rarr;
          </Button>
        </Box>
      );
    }
  };

  const handleClickRight = () => {
    if (page < allPages.current) {
      setPage(page + 1);
    }
  };

  const handleClickLeft = () => {
    if (page >= 1) {
      setPage(page - 1);
    }
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
      marginBottom: (theme) => theme.spacing(1),
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
    return (
      <>
        <TableContainer>
          <Table
            sx={{
              borderCollapse: 'separate',
              borderSpacing: '0px 16px',
              ...commonOverrides,
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
        {renderPageControl()}
      </>
    );
  };

  const renderVariableRows = () => {
    if (sorted) {
      return (
        <>
          <RankingTableRow page={page} ranking={sorted} />
        </>
      );
    }
  };

  const renderTableHead = () => {
    const labels = ['rank', 'trader', 'voltz pointz'];
    return (
      <TableHead>
        <TableRow>
          {labels.map((label) => (
            <TableCell key={label} align={'left'} padding="normal" sx={cellSx}>
              <Typography
                variant="subtitle1"
                sx={{ textTransform: 'uppercase', fontWeight: 400, fontSize: 12, color: '#9B97AD' }}
              >
                {label}
              </Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  return (
    <>
      <RankingTableHeader
        loading={false}
        seasonNumber={seasonNumber}
        seasonStartDate={seasonStartDate}
        seasonEndDate={seasonEndDate}
        userRank={userRank}
        userAddress={userAddress}
        userPoints={userPoints}
      />
      <Panel
        variant={'dark'}
        borderRadius="large"
        padding="container"
        sx={{ paddingTop: 0, paddingBottom: 0, background: 'transparent', marginTop: '40px' }}
      >
        <Typography
          variant="body2"
          sx={{ fontSize: '24px', fontWeight: 700, display: 'flex', alignContent: 'center' }}
        >
          SEASON {seasonNumber} LEADERBOARD
        </Typography>
        {renderTable()}
      </Panel>
    </>
  );
};

export default RankingTable;
