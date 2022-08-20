import React from 'react';
import Box from '@mui/material/Box';

import { SwapSummary, SwapSummaryEditMargin } from './components';
import { colors, SystemStyleObject, Theme } from '@theme';
import { InfoPostSwap } from '@voltz-protocol/v1-sdk';
import { SwapFormActions, SwapFormModes } from '../SwapForm/types';
import { isUndefined } from 'lodash';
import { ExpectedAPY } from '@components/composite';
import { FormPanel } from '@components/interface';

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
  const bottomSpacing: SystemStyleObject<Theme> = {
    marginBottom: (theme) => theme.spacing(6)
  }

  return (
    <FormPanel noBackground>
      {(mode !== SwapFormModes.EDIT_MARGIN && mode !== SwapFormModes.FIX_BORROW) && (
        <>
        <ExpectedAPY 
          expectedAPY={swapSummary?.expectedApy}
        />
          {swapSummary?.expectedApy && (
            <Box component={'hr'} sx={{ 
              border: 'none',
              borderBottom: `1px solid ${colors.lavenderWeb.darken045}`,
              margin: (theme) => `${theme.spacing(4)} 0`,
            }}/>
          )}
        </>
        
      )}

      {(mode === SwapFormModes.NEW_POSITION || mode === SwapFormModes.ROLLOVER || mode === SwapFormModes.FIX_BORROW) && (swapSummary || swapSummaryLoading) && (
        <>
          <Box sx={bottomSpacing}>
            <SwapSummary
              data={swapSummary} 
              loading={swapSummaryLoading} 
              underlyingTokenName={underlyingTokenName}
              yieldBearingTokenName={protocol}
              formAction={formAction}
            />
          </Box>
        </>
      )}

      {mode === SwapFormModes.EDIT_MARGIN && !isUndefined(minRequiredMargin) && !isUndefined(positionMargin) && (
        <>
          {/* {mode !== SwapFormModes.EDIT_MARGIN && (
            <Box component={'hr'} sx={{ 
              border: 'none',
              borderBottom: `1px solid ${colors.lavenderWeb.darken045}`,
              margin: (theme) => `${theme.spacing(4)} 0`,
            }}/>
          )} */}
          <Box sx={bottomSpacing}>
            <SwapSummaryEditMargin 
              balance={balance}
              minRequiredMargin={minRequiredMargin}
              positionMargin={positionMargin}
              underlyingTokenName={underlyingTokenName}
            />
          </Box>
        </>
      )}
    </FormPanel>
  );
};

export default SwapInfo;
