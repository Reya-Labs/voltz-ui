import { Box, Button, Skeleton, Typography } from '@mui/material';
import { formatCurrency } from '@utilities';
import { isUndefined } from 'lodash';
import React from 'react';

export type MellowLPPositionProps = {
  userDeposit?: number;
  tokenName: string;
  handleClick: () => void;
  dataLoading: boolean;
};

const MellowLPPosition: React.FunctionComponent<MellowLPPositionProps> = ({
  userDeposit,
  tokenName,
  handleClick,
  dataLoading,
}: MellowLPPositionProps) => {
  const getPositionInfo = () => {
    if (dataLoading) {
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
            {`Your position: ${isUndefined(userDeposit) ? ' ---' : ''}`}
          </Typography>
          {!isUndefined(userDeposit) && (<Typography
            variant="h6"
            sx={{
              fontSize: '14px',
              color: 'primary.light',
              textTransform: 'uppercase',
              marginLeft: '4px',
            }}
          >
            {(userDeposit) ?
              `${formatCurrency(userDeposit)} ${tokenName}`
              : "---"}
          </Typography>)}
        </Box>
        <Button
          onClick={handleClick}
          disabled={dataLoading}
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
