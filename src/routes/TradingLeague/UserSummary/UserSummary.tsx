import Box from '@mui/material/Box';
import { DateTime } from 'luxon';
import React from 'react';

import { ProgressBarPercentageBox } from '../../../components/atomic/ProgressBar/ProgressBar.styled';
import { Typography } from '../../../components/atomic/Typography/Typography';
import { colors } from '../../../theme';
import { formatDateTime } from '../../../utilities/date';
import { Entry } from '../Entry/Entry';
import { Header } from '../Header/Header';
import { Percentage } from './Percentage/Percentage';

export type RankingUserSummaryProps = {
  seasonNumber: string;
  seasonStartDate: DateTime;
  seasonEndDate: DateTime;
  userRank?: number;
  userAddress?: string;
  userPoints?: number;
  invitedTraders?: number;
  loading: boolean;
};

export const UserSummary = ({
  loading,
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

  return (
    <Box
      sx={{
        backgroundColor: '#19152A',
        borderRadius: '16px',
        border: '1px solid #2D2B3D',
        padding: (theme) => theme.spacing(4),
        marginTop: (theme) => theme.spacing(6),
      }}
    >
      <Box sx={{ display: 'flex', width: '80%', marginBottom: '24px' }}>
        <Box
          sx={{
            border: `1px solid ${colors.wildStrawberry.base}`,
            padding: (theme) => theme.spacing(1, 2),
            marginRight: (theme) => theme.spacing(4),
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              color: colors.wildStrawberry.base,
              fontSize: '14px',
              lineHeight: '14px',
              fontWeight: 400,
            }}
            variant="subtitle1"
          >
            SEASON&nbsp;
            <span
              style={{
                color: colors.lavenderWeb.base,
                fontSize: '14px',
                lineHeight: '14px',
                fontWeight: 400,
              }}
            >
              {seasonNumber}
            </span>
          </Typography>
        </Box>

        <Box sx={{ width: '40%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              sx={{
                color: colors.lavenderWeb.base,
                fontSize: '14px',
                lineHeight: '14px',
                fontWeight: 400,
              }}
              variant="body2"
            >
              Ends: {formatDateTime(seasonEndDate)}
            </Typography>
            <Percentage percentage={percentage} />
          </Box>
          <Box
            sx={{
              width: '100%',
              background: colors.lavenderWeb.darken030,
              height: '4px',
              marginTop: (theme) => theme.spacing(1),
            }}
          >
            <ProgressBarPercentageBox percentage={Math.min(percentage, 100)} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ marginBottom: (theme) => theme.spacing(6) }}>
        <Typography
          sx={{
            fontSize: '16px',
            lineHeight: '120%',
            fontWeight: 700,
          }}
          variant="h1"
        >
          POINTZ SYSTEM
        </Typography>
        <Typography
          sx={{
            fontFamily: 'DM Sans',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '160%',
            color: colors.lavenderWeb.darken015,
            marginTop: (theme) => theme.spacing(2),
          }}
        >
          Earn pointz based on your trading activity on Voltz Protocol. Pointz are calculated based
          on notional traded, which is then time-weighted based on how far away your trade is from
          maturity.
        </Typography>
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: '16px',
            lineHeight: '120%',
            fontWeight: 700,
            marginBottom: (theme) => theme.spacing(2),
          }}
          variant="h1"
        >
          CURRENT POSITION
        </Typography>
        <Box
          sx={{
            display: 'flex',
            rowGap: (theme) => theme.spacing(2),
            flexDirection: 'column',
          }}
        >
          <Header />
          <Entry
            address={userAddress || ''}
            loading={loading}
            points={userPoints || 0}
            rank={userRank || 0}
            variant="me"
          />
        </Box>
      </Box>
    </Box>
  );
};
