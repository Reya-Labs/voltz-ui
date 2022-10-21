import { colors } from '@theme';
import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@components/atomic';
import Skeleton from '@mui/material/Skeleton';
import { elideAddress } from '@utilities';
import { ReactComponent as Gold } from './icons/gold.svg';
import { ReactComponent as Silver } from './icons/silver.svg';
import { ReactComponent as Bronze } from './icons/bronze.svg';
import { Points } from './Points';

export type RankingEntryProps = {
  points: number;
  rank: number;
  address: string;
  loading?: boolean;
  variant: 'rank1' | 'rank2' | 'rank3' | 'other' | 'me';
};

const RANK_COLORS: Record<RankingEntryProps['variant'], string> = {
  rank1: '#2B2548',
  rank2: '#262040',
  rank3: '#1F1A34',
  other: '#19152B',
  me: '#251F3F',
};

export const RankingEntry: React.FunctionComponent<RankingEntryProps> = ({
  points,
  rank,
  address,
  loading,
  variant,
}) =>
  loading ? (
    <Skeleton
      variant="rectangular"
      sx={{
        padding: (theme) => theme.spacing(2, 2, 2, 8),
        borderRadius: '8px',
        fontSize: '18px',
        lineHeight: '24px',
      }}
    />
  ) : (
    <Box
      data-testid={`RankingEntry-${rank}`}
      sx={{
        backgroundColor: RANK_COLORS[variant],
        borderRadius: '8px',
        padding: (theme) => theme.spacing(2, 2, 2, 8),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '67px',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: colors.lavenderWeb.base,
            fontSize: '18px',
            lineHeight: '24px',
            fontWeight: 400,
          }}
        >
          {rank <= 0 ? '---' : rank}
          {rank === 1 && <Gold style={{ marginLeft: '8px' }} />}
          {rank === 2 && <Silver style={{ marginLeft: '8px' }} />}
          {rank === 3 && <Bronze style={{ marginLeft: '8px' }} />}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: colors.lavenderWeb.base,
          fontSize: '18px',
          lineHeight: '24px',
          fontWeight: 400,
          flex: '1',
        }}
      >
        {address ? elideAddress(address).toUpperCase() : '---'}
      </Typography>
      <Points points={points} />
    </Box>
  );
