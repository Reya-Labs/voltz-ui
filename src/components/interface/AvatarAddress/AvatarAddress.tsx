import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { SxProps } from '@mui/system';
import React, { FunctionComponent, useEffect, useState } from 'react';

import { colors, Theme } from '../../../theme';
import { elideAddress } from '../../../utilities/elideAddress';
import { getENSDetails } from '../../../utilities/getENSDetails';
import { Typography } from '../../atomic/Typography/Typography';
import { MetaMaskAvatar } from './MetaMaskAvatar/MetaMaskAvatar';

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
      data-testid="AvatarAddress"
      sx={{
        display: 'flex',
        columnGap: (theme) => theme.spacing(4),
        alignItems: 'center',
      }}
    >
      {loading ? (
        <>
          <Skeleton
            sx={{
              width: size,
              height: size,
            }}
            variant="circular"
          />
          <Skeleton
            sx={{ fontSize: '18px', lineHeight: '24px', width: '120px', ...nameSx }}
            variant="text"
          />
        </>
      ) : (
        <>
          {!avatarUrl ? (
            <MetaMaskAvatar address={address || ''} size={size} />
          ) : (
            <img
              alt="avatar"
              src={avatarUrl}
              style={{
                width: size,
                height: size,
                borderRadius: '50%',
              }}
            />
          )}
          <Typography
            data-testid="AvatarAddress-AddressTypography"
            sx={{
              color: colors.lavenderWeb.base,
              fontSize: '18px',
              lineHeight: '24px',
              fontWeight: 400,
              flex: '1',
              ...nameSx,
            }}
            variant="body2"
          >
            {elideAddress(name).toUpperCase()}
          </Typography>
        </>
      )}
    </Box>
  );
};
