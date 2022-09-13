import { Box, Grid, Tab, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

import { Typography } from '@components/atomic';
import { SystemStyleObject, Theme } from '@theme'; 
import { formatCurrency, formatNumber } from '@utilities';
import { DateTime } from 'luxon';
import { isUndefined } from 'lodash';

export type RankingUserSummaryProps = {
  seasonNumber?: number;
  seasonEndDate?: DateTime;
  userRank?: number;
  userAddress?: string;
  userPoints?: number;
  invitedTraders?: number;
};

const RankingUserSummary = ({ 
  seasonNumber,
  seasonEndDate,
  userRank,
  userAddress,
  userPoints,
  invitedTraders
}: RankingUserSummaryProps) => {

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
  const labelStyles: SystemStyleObject<Theme> = { 
    textTransform: "uppercase",
    fontWeight: 400, 
    fontSize: 14,
    color: "#A6A2B4",
    verticalAlign: 'middle',
    marginTop: (theme) => theme.spacing(1)
  };
  const titleStyles: SystemStyleObject<Theme> = { 
  fontSize: '24px', 
  lineHeight: '1.2', 
  marginTop: (theme) => theme.spacing(2)
  };

  const renderSeason = () => {
    return (
      <Box>
        {seasonNumber && (seasonNumber < 10 ? 'Season ' + '0' + seasonNumber.toString() : 'Season ' + seasonNumber.toString()) }
        {!seasonNumber && 'Loading...'}
       </Box>
    );
  }

  const renderPointsSystem = () => {
    return (
      <Box>
        <Typography variant='h1' sx={titleStyles}>
          Points System
        </Typography>
        <Typography variant='subtitle1' sx={labelStyles}>
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </Typography>
      </Box>
    );
  }

  const renderCurrentPosition = () => {
    return (
      <Box>
        <Typography variant='h1' sx={titleStyles}>
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
          <TableBody sx={{ position: 'relative', top: (theme) => `-${theme.spacing(3)}` }}>
          <TableRow sx={{backgroundColor: `#251F3F`, borderRadius: '8px' }}>
            <TableCell key={"protocol"} width="35%" >
                {userRank}
              </TableCell>
              <TableCell key={"protocol"} width="35%" >
                {userAddress}
              </TableCell>
              <TableCell key={"protocol"} width="35%" >
                {userPoints}
              </TableCell>
          </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    );
  }

  const renderBooster = () => {
    return (
      <Box>
        <Typography variant='h1' sx={titleStyles}>
          Points Booster
        </Typography>
        <Box>
          <Typography variant='subtitle1' sx={labelStyles}>
            Invite a Trader - Button
          </Typography>
          {!isUndefined(invitedTraders) && (
            <Typography variant='subtitle1' sx={labelStyles}> Active Invited Traders {(invitedTraders < 10 ? '0' + invitedTraders.toString() : invitedTraders.toString())}</Typography>
          )}
          {isUndefined(invitedTraders) && (
            <Typography variant='subtitle1' sx={labelStyles}> Loading...</Typography>
          )}
        </Box>
        
      </Box>
    );
  }
  return (
    <>
      <Box sx={{backgroundColor: `#19152A`, borderRadius: '4px', border:"1px solid #2D2B3D", padding: (theme) => theme.spacing(4), marginTop: (theme) => theme.spacing(8)}}>
      {renderSeason()}
      {renderPointsSystem()}
      {renderCurrentPosition()}
      {renderBooster()}
      </Box>
      
    </>
  )
};

export default RankingUserSummary;
