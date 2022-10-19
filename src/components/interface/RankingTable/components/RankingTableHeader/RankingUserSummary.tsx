import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { Typography } from '@components/atomic';
import { SystemStyleObject, Theme } from '@theme';
import { formatDateTime, formatNumber } from '@utilities';
import { DateTime } from 'luxon';
import { ProgressBar } from '@components/composite';
import React from 'react';

export type RankingUserSummaryProps = {
  seasonNumber?: number;
  seasonStartDate: DateTime;
  seasonEndDate: DateTime;
  userRank?: number;
  userAddress?: string;
  userPoints?: number;
  invitedTraders?: number;
  handleInvite: () => void;
};

const RankingUserSummary = ({
  seasonNumber,
  seasonStartDate,
  seasonEndDate,
  userRank,
  userAddress,
  userPoints,
}: RankingUserSummaryProps) => {
  const percentage = React.useMemo(() => {
    const now = Date.now().valueOf();
    return Math.round(
      100 *
        ((now - seasonStartDate.toMillis()) /
          (seasonEndDate.toMillis() - seasonStartDate.toMillis())),
    );
  }, [seasonStartDate, seasonEndDate]);

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
  const labelStyles: SystemStyleObject<Theme> = {
    fontWeight: 400,
    fontSize: 14,
    color: '#A6A2B4',
    verticalAlign: 'middle',
    marginTop: (theme) => theme.spacing(1),
  };
  const titleStyles: SystemStyleObject<Theme> = {
    textTransform: 'uppercase',
    fontSize: '16px',
    lineHeight: '19.2px',
    marginTop: (theme) => theme.spacing(2),
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

  const renderSeason = () => {
    return (
      <Box sx={{ display: 'flex', width: '80%', marginBottom: '24px' }}>
        <Box
          sx={{
            borderStyle: 'solid',
            borderColor: '#FF4AA9',
            borderRadius: '4px',
            padding: '4px 8px',
            textTransform: 'uppercase',
            marginRight: '16px',
            width: '79px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {seasonNumber && (
            <Typography variant="subtitle1" sx={{ color: '#FF4AA9', fontSize: '14px' }}>
              Season
              <span style={{ color: '#E5E1F9', fontSize: '14px' }}>
                {seasonNumber < 10 ? ' 0' + seasonNumber.toString() : seasonNumber.toString()}
              </span>
            </Typography>
          )}
          {!seasonNumber && (
            <Typography variant="subtitle1" sx={{ color: '#FF4AA9' }}>
              {!seasonNumber && 'Loading...'}
            </Typography>
          )}
        </Box>

        <Box sx={{ width: '80%' }}>
          <ProgressBar
            isMaturity={true}
            leftContent={seasonEndDate ? <>{formatDateTime(seasonEndDate)}</> : undefined}
            rightContent={<>{percentage}%</>}
            percentageComplete={percentage}
          />
        </Box>
      </Box>
    );
  };

  const renderPointsSystem = () => {
    return (
      <Box sx={{ marginBottom: '24px' }}>
        <Typography variant="h1" sx={titleStyles}>
          Pointz System
        </Typography>
        <Typography sx={labelStyles}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
          consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </Typography>
      </Box>
    );
  };

  const renderTableHead = () => {
    const labels = ['rank', 'trader', 'voltz pointz'];
    return (
      <TableHead>
        <TableRow>
          {labels.map((label) => (
            <TableCell align={'left'} padding="normal" sx={cellSx}>
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

  const renderCurrentPosition = () => {
    return (
      <Box>
        <Typography variant="h1" sx={{ ...titleStyles, marginBottom: '-10px' }}>
          Current Position
        </Typography>
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
              <TableRow sx={{ backgroundColor: `#251F3F`, borderRadius: '8px' }}>
                <TableCell key={'protocol'} width="35%">
                  {userRank ?? '---'}
                </TableCell>
                <TableCell key={'protocol'} width="35%">
                  {userAddress
                    ? `${userAddress.substring(0, 8) + '...' + userAddress.substring(36)}`
                    : '---'}
                </TableCell>
                <TableCell key={'protocol'} width="35%">
                  {userPoints ? formatNumber(userPoints) : '---'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: `#19152A`,
          borderRadius: '4px',
          border: '1px solid #2D2B3D',
          padding: (theme) => theme.spacing(4),
          marginTop: (theme) => theme.spacing(8),
        }}
      >
        {renderSeason()}
        {renderPointsSystem()}
        {renderCurrentPosition()}
      </Box>
    </>
  );
};

export default RankingUserSummary;
