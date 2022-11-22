import React, { FunctionComponent, useEffect, useState } from 'react';
import { elideAddress, getENSDetails } from '@utilities';
import Box from '@mui/material/Box';
import { colors, Theme } from '@theme';
import { Typography } from '@components/atomic';
import { MetaMaskAvatar } from './MetaMaskAvatar/MetaMaskAvatar';
import Skeleton from '@mui/material/Skeleton';
import { SxProps } from '@mui/system';

export const AvatarAddress: FunctionComponent<{
  address?: string | null;
  size: number;
  nameSx?: SxProps<Theme>;
}> = ({ address, size, nameSx }) => {
  const [name, setName] = useState(address);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const fetchENSDetails = async (addr: string) => {
    setLoading(true);
    const details = await getENSDetails(addr);
    setName(details?.name || addr);
    setAvatarUrl(details?.avatarUrl || '');
    setLoading(false);
  };

  useEffect(() => {
    if (!address) {
      setLoading(false);
      return;
    }
    void fetchENSDetails(address);
  }, [address]);

  if (!name) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        columnGap: (theme) => theme.spacing(4),
        alignItems: 'center',
      }}
    >
      {loading ? (
        <>
          <Skeleton
            variant="circular"
            sx={{
              width: size,
              height: size,
            }}
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: '18px', lineHeight: '24px', width: '120px', ...nameSx }}
          />
        </>
      ) : (
        <>
          {!avatarUrl ? (
            <MetaMaskAvatar address={address || ''} size={size} />
          ) : (
            <img
              style={{
                width: size,
                height: size,
                borderRadius: '50%',
              }}
              src={avatarUrl}
              alt="avatar"
            />
          )}
          <Typography
            variant="body2"
            sx={{
              color: colors.lavenderWeb.base,
              fontSize: '18px',
              lineHeight: '24px',
              fontWeight: 400,
              flex: '1',
              ...nameSx,
            }}
          >
            {elideAddress(name).toUpperCase()}
          </Typography>
        </>
      )}
    </Box>
  );
};
