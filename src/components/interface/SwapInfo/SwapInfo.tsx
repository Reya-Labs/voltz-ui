import React from 'react';
import Box from '@mui/material/Box';
import { useAgent } from '@hooks';

import { SwapSummary, SwapSummaryEditMargin } from './components';
import { SystemStyleObject, Theme } from '@theme';
import { InfoPostSwap } from '@voltz-protocol/v1-sdk';
import { SwapFormActions, SwapFormModes } from '../SwapForm/types';
import { isUndefined } from 'lodash';

export type SwapInfoProps = {
  balance?: number;
  formAction: SwapFormActions;
  minRequiredMargin?: number;
  mode: SwapFormModes;
  positionMargin?: number;
  protocol?: string;
  swapSummary: InfoPostSwap | void | null;
  swapSummaryLoading: boolean;
  underlyingTokenName?: string;
};

const SwapInfo: React.FunctionComponent<SwapInfoProps> = ({
  balance,
  formAction,
  minRequiredMargin,
  mode,
  positionMargin,
  protocol,
  swapSummary,
  swapSummaryLoading,
  underlyingTokenName,
}) => {
  const { agent } = useAgent();
  const bottomSpacing: SystemStyleObject<Theme> = {
    marginBottom: (theme) => theme.spacing(6)
  }

  return (
    <Box
      sx={{
        marginTop: 12,
        marginLeft: 8,
        width: (theme) => theme.spacing(97),

      }}
    >
      {mode === SwapFormModes.NEW_POSITION && (swapSummary || swapSummaryLoading) && (
        <Box sx={bottomSpacing}>
          <SwapSummary
            data={swapSummary} 
            loading={swapSummaryLoading} 
            underlyingTokenName={underlyingTokenName}
            yieldBearingTokenName={protocol}
            formAction={formAction}
          />
        </Box>
      )}

      {mode === SwapFormModes.EDIT_MARGIN && !isUndefined(minRequiredMargin) && !isUndefined(positionMargin) && (
        <Box sx={bottomSpacing}>
          <SwapSummaryEditMargin 
            balance={balance}
            minRequiredMargin={minRequiredMargin}
            positionMargin={positionMargin}
            underlyingTokenName={underlyingTokenName}
          />
        </Box>
      )}
    </Box>
  );
};

export default SwapInfo;
