import React from 'react';
import Box from '@mui/material/Box';

import { SwapSummary, SwapSummaryEditMargin } from './components';
import { colors, SystemStyleObject, Theme } from '@theme';
import { InfoPostSwap } from '@voltz-protocol/v1-sdk';
import { SwapFormActions, SwapFormModes } from '../SwapForm/types';
import { isUndefined } from 'lodash';
import { ExpectedAPY } from '@components/composite';

export type SwapInfoProps = {
  balance?: number;
  formAction: SwapFormActions;
  minRequiredMargin?: number;
  mode: SwapFormModes;
  onChangeMovesRatesBy: (value: number) => void;
  positionMargin?: number;
  protocol?: string;
  ratesMoveBy: number;
  swapSummary: InfoPostSwap | void | null;
  swapSummaryLoading: boolean;
  underlyingTokenName?: string;
};

const SwapInfo: React.FunctionComponent<SwapInfoProps> = ({
  balance,
  formAction,
  minRequiredMargin,
  mode,
  onChangeMovesRatesBy,
  positionMargin,
  protocol,
  ratesMoveBy,
  swapSummary,
  swapSummaryLoading,
  underlyingTokenName,
}) => {
  const bottomSpacing: SystemStyleObject<Theme> = {
    marginBottom: (theme) => theme.spacing(6)
  }

  return (
    <Box
      sx={{
        marginTop: 12,
        marginLeft: 8,
        marginRight: 8,
        paddingTop: (theme) => theme.spacing(4),
        width: (theme) => theme.spacing(81),

      }}
    >
      <ExpectedAPY 
        expectedAPY={swapSummary?.expectedApy}
        onChangeMovesRatesBy={onChangeMovesRatesBy} 
        ratesMoveBy={ratesMoveBy}
      />

      <Box component={'hr'} sx={{ 
        border: 'none',
        borderBottom: `1px solid ${colors.lavenderWeb.darken045}`,
        margin: (theme) => `${theme.spacing(4)} 0`,
      }}/>

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
