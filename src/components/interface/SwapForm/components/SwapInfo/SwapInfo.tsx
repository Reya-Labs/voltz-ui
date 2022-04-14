import React, { useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';

import { useAMMContext } from '@hooks';
import { Typography } from '@components/atomic';

export type SwapInfoProps = {
  notional?: number;
};

const SwapInfo: React.FunctionComponent<SwapInfoProps> = ({ notional }) => {
  const { swapInfo } = useAMMContext();
  const { result, loading, call } = swapInfo;

  useEffect(() => {
    if (!isUndefined(notional)) {
      call({ notional });
    }
  }, [call, notional]);

  const renderSwapInfo = () => {
    if (loading) {
      return 'Loading...';
    }

    if (!result) {
      return '';
    }

    return (
      <>
        <Typography agentStyling variant="body2" label="Swap info">
          Available notional: {result.availableNotional.toFixed(2)}
        </Typography>
        <Typography agentStyling variant="body2">
          Average fixed rate: {result.averageFixedRate.toFixed(2)}%
        </Typography>
        <Typography agentStyling variant="body2">Estimated slippage: {result.slippage.toFixed(2)}%</Typography>
        <Typography agentStyling variant="body2">Fee: {result.fee.toFixed(2)} </Typography>
        <Typography agentStyling variant="body2">
          Additional margin required: {result.marginRequirement.toFixed(2)}
        </Typography>
      </>
    );
  };

  return <Typography agentStyling variant="body2"> {renderSwapInfo()} </Typography>
};

export default SwapInfo;
