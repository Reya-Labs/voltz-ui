import { Box, Button, Skeleton, Typography } from '@mui/material';
import { formatCurrency } from '@utilities';
import { MellowLpVault } from '@voltz-protocol/v1-sdk';
import { isUndefined } from 'lodash';
import React from 'react';

export type MellowLPPositionProps = {
  lpVault: MellowLpVault;
  handleClick: () => void;
  disabled: boolean;
};

const MellowLPPosition: React.FunctionComponent<MellowLPPositionProps> = ({
  lpVault,
  handleClick,
  disabled,
}: MellowLPPositionProps) => {
  const getPositionInfo = () => {
    if (isUndefined(lpVault.userDeposit)) {
      return (
        <Skeleton
          variant="text"
          sx={{ width: '100%', fontSize: '14px', lineHeight: '20px', padding: '4px' }}
        />
      );
    }

    return (
      <>
        <Box sx={{ display: 'flex' }}>
          <Typography
            variant="h6"
            sx={{ fontSize: '14px', color: '#9B97AD', textTransform: 'uppercase' }}
          >
            Your position:
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: '14px',
              color: 'primary.light',
              textTransform: 'uppercase',
              marginLeft: '4px',
            }}
          >
            {formatCurrency(lpVault.userDeposit)} {lpVault.tokenName}
          </Typography>
        </Box>
        <Button
          onClick={handleClick}
          disabled={disabled}
          sx={{
            background: 'transparent',
            color: 'primary.light',
            '&:hover': {
              background: 'transparent',
              borderStyle: 'none none solid none',
              borderColor: 'primary.light',
              borderRadius: '0px',
            },
            padding: '4px 1px',
            fontSize: '14px',
            lineHeight: '20px',
            boxShadow: 'none',
            borderStyle: 'none none none none',
            borderRadius: '0px',
          }}
        >
          DEPOSIT
        </Button>
      </>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {getPositionInfo()}
    </Box>
  );
};

export default MellowLPPosition;
