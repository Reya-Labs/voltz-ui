import React, { useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';

import { useAMMContext } from '@hooks';
import { Typography } from '@components/atomic';
import { IconLabel } from '@components/composite';
import { Box, SystemStyleObject, Theme } from '@mui/system';
import colors from '../../../../../theme/colors';

export type SwapInfoProps = {
  notional?: number;
  underlyingTokenName?: string; 
};

const SwapInfo: React.FunctionComponent<SwapInfoProps> = ({ notional, underlyingTokenName }) => {
  const { swapInfo } = useAMMContext();
  const { result, loading, call } = swapInfo;
  const containerStyles: SystemStyleObject<Theme> = {
    border: `1px solid ${colors.lavenderWeb.darken040}`,
    borderRadius: (theme) => theme.spacing(1),
    padding: (theme) => theme.spacing(4),
  };
  const rowStyles: SystemStyleObject<Theme> = {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-between',
    width: '100%',
  };
  const valueStyles: SystemStyleObject<Theme> = {
    whiteSpace: 'nowrap',
  };

  useEffect(() => {
    if (!isUndefined(notional)) {
      call({ notional });
    }
  }, [call, notional]);

  const renderSwapInfo = () => {
    if (loading) {
      return <Typography agentStyling variant="body2">Loading...</Typography>
    }

    if (!result) {
      return null;
    }

    return (
      <Box sx={containerStyles}>
        <Box sx={rowStyles}>
          <Typography variant="body2" label={<IconLabel
          label="trade information"
          icon="information-circle"
          info="Trade information"
        />}>
            NOTIONAL AVAILABLE:
          </Typography>
          <Typography agentStyling variant="body2" sx={valueStyles}>
            {Math.abs(result.availableNotional).toFixed(2)} {underlyingTokenName}
          </Typography>
        </Box>

        <Box sx={rowStyles}>
          <Typography variant="body2">
            AVERAGE FIXED RATE:
          </Typography>
          <Typography agentStyling variant="body2" sx={valueStyles}>
            {Math.abs(result.averageFixedRate).toFixed(2)} %
          </Typography>
        </Box>

        <Box sx={rowStyles}>
          <Typography variant="body2">
            FEES:
          </Typography>
          <Typography agentStyling variant="body2" sx={valueStyles}>
            {Math.abs(result.fee).toFixed(2)} {underlyingTokenName}
          </Typography>
        </Box>

        <Box sx={rowStyles}>
          <Typography variant="body2">
            ESTIMATED SLIPPAGE:
          </Typography>
          <Typography agentStyling variant="body2" sx={valueStyles}>
            {Math.abs(result.slippage).toFixed(2)} %
          </Typography>
        </Box>

        <Box sx={rowStyles}>
          <Typography variant="body2">
            ADDITIONAL MARGIN REQUIRED:
          </Typography>
          <Typography agentStyling variant="body2" sx={valueStyles}>
            {result.marginRequirement.toFixed(2)} {underlyingTokenName}
          </Typography>
        </Box>
      </Box>
    );
  };

  return renderSwapInfo()
};

export default SwapInfo;
