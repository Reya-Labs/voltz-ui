import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';

import { Typography } from '../../../components/atomic/Typography/Typography';
import { AvatarAddress } from '../../../components/interface/AvatarAddress/AvatarAddress';
import { colors } from '../../../theme';
import { ReactComponent as Bronze } from './icons/bronze.svg';
import { ReactComponent as Gold } from './icons/gold.svg';
import { ReactComponent as Silver } from './icons/silver.svg';
import { Points } from './Points/Points';

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

export const Entry: React.FunctionComponent<RankingEntryProps> = ({
  points,
  rank,
  address,
  loading,
  variant,
}) =>
  loading ? (
    <Skeleton
      sx={{
        padding: (theme) => theme.spacing(2, 2, 2, 8),
        borderRadius: '8px',
        fontSize: '18px',
        lineHeight: '24px',
      }}
      variant="rectangular"
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
          sx={{
            color: colors.lavenderWeb.base,
            fontSize: '18px',
            lineHeight: '24px',
            fontWeight: 400,
          }}
          variant="body2"
        >
          {rank <= 0 ? '---' : rank}
          {rank === 1 && <Gold style={{ marginLeft: '8px' }} />}
          {rank === 2 && <Silver style={{ marginLeft: '8px' }} />}
          {rank === 3 && <Bronze style={{ marginLeft: '8px' }} />}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: '1',
        }}
      >
        {address ? (
          <AvatarAddress address={address} size={24} />
        ) : (
          <Typography
            sx={{
              color: colors.lavenderWeb.base,
              fontSize: '18px',
              lineHeight: '24px',
              fontWeight: 400,
            }}
            variant="body2"
          >
            ---
          </Typography>
        )}
      </Box>
      <Points points={points} />
    </Box>
  );
