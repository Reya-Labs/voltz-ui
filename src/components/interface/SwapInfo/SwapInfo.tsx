import React from 'react';
import Box from '@mui/material/Box';

import { SwapSummary, SwapSummaryEditMargin, DescriptionBox, WarningBox } from './components';
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
  warningText?: string;
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
  warningText
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

      {(mode === SwapFormModes.FIX_BORROW) && (
        <>
          <Box sx={bottomSpacing}>
            <DescriptionBox titleText="Borrowing on Voltz" descriptionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec sit iaculis cras elit dictum massa. Sit metus amet, tincidunt odio. Tristique sagittis, nisl in eu eu vestibulum et. Ut sed mauris urna justo, dictumst molestie posuere." />
          </Box>
        </>
      )}

      {(mode == SwapFormModes.NEW_POSITION || mode === SwapFormModes.FIX_BORROW) && !isUndefined(warningText) && (
        <>
        <Box sx={bottomSpacing}>
          <WarningBox warningText={warningText} />
        </Box>
      </>
      )}

      {(mode === SwapFormModes.ROLLOVER || mode === SwapFormModes.FIX_BORROW) && (swapSummary || swapSummaryLoading) && (
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
