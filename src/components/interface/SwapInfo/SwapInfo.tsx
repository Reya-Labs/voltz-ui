import Box from '@mui/material/Box';
import { InfoPostSwap } from '@voltz-protocol/v1-sdk';
import isUndefined from 'lodash.isundefined';
import React from 'react';

import { colors, SystemStyleObject, Theme } from '../../../theme';
import { FormPanel } from '../FormPanel/FormPanel';
import { SwapFormActions, SwapFormModes } from '../SwapForm/types';
import { DescriptionBox } from './DescriptionBox/DescriptionBox';
import { ExpectedAPY } from './ExpectedAPY/ExpectedAPY';
import { SwapSummary } from './SwapSummary/SwapSummary';
import { SwapSummaryEditMargin } from './SwapSummary/SwapSummaryEditMargin';
import { WarningBox, WarningBoxProps } from './WarningBox/WarningBox';

export type SwapInfoProps = {
  balance?: number;
  formAction: SwapFormActions;
  currentPositionMarginRequirement?: number;
  mode: SwapFormModes;
  positionMargin?: number;
  protocol?: string;
  swapSummary: InfoPostSwap | void | null;
  swapSummaryLoading: boolean;
  underlyingTokenName?: string;
  warningBoxes?: WarningBoxProps[];
  maxAvailableNotional?: number;
  expectedApy?: number;
  expectedCashflow?: number;
  variableApy?: number;
  userSimulatedVariableApy?: number;
  onChangeUserSimulatedVariableApy?: (value: number, resetToDefault?: boolean) => void;
  userSimulatedVariableApyUpdated?: boolean;
};

export const SwapInfo: React.FunctionComponent<SwapInfoProps> = ({
  balance,
  formAction,
  currentPositionMarginRequirement,
  mode,
  positionMargin,
  protocol,
  swapSummary,
  swapSummaryLoading,
  underlyingTokenName,
  warningBoxes,
  maxAvailableNotional,
  expectedApy,
  expectedCashflow,
  userSimulatedVariableApy,
  onChangeUserSimulatedVariableApy,
  userSimulatedVariableApyUpdated,
}) => {
  const bottomSpacing: SystemStyleObject<Theme> = {
    marginBottom: (theme) => theme.spacing(6),
  };

  return (
    <FormPanel noBackground>
      {mode !== SwapFormModes.EDIT_NOTIONAL &&
        mode !== SwapFormModes.EDIT_MARGIN &&
        mode !== SwapFormModes.FIX_BORROW &&
        !isUndefined(onChangeUserSimulatedVariableApy) &&
        !isUndefined(userSimulatedVariableApyUpdated) && (
          <>
            <ExpectedAPY
              expectedApy={expectedApy}
              expectedCashflow={expectedCashflow}
              userSimulatedVariableApy={userSimulatedVariableApy}
              userSimulatedVariableApyUpdated={userSimulatedVariableApyUpdated}
              onChangeUserSimulatedVariableApy={onChangeUserSimulatedVariableApy}
            />
            <Box
              component={'hr'}
              sx={{
                border: 'none',
                borderBottom: `1px solid ${colors.lavenderWeb.darken045}`,
                margin: (theme) => `${theme.spacing(4)} 0`,
              }}
            />
          </>
        )}

      {mode === SwapFormModes.FIX_BORROW && (
        <>
          <Box sx={bottomSpacing}>
            <DescriptionBox
              descriptionText="Voltz Protocol lets you convert your variable borrowing costs into fixed borrowing costs. These will be fixed until the end of the pools term, as seen under 'Fixed Until'. To fix your existing borrowing, use the slider to determine what proportion you wish to fix and click 'Fix Rate'. This will trigger a transaction that will cover the fixed cost of borrowing upfront, along with fees paid to Liquidity Providers, who collectively cover your variable liabilities."
              titleText="Fixing your Borrowing Costs"
            />
          </Box>
        </>
      )}

      {(mode === SwapFormModes.NEW_POSITION || mode === SwapFormModes.FIX_BORROW) &&
        !isUndefined(warningBoxes) && (
          <>
            {warningBoxes.map((warningBox) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <Box sx={bottomSpacing}>
                  <WarningBox {...warningBox} />
                </Box>
              );
            })}
          </>
        )}

      {(mode === SwapFormModes.EDIT_NOTIONAL ||
        mode === SwapFormModes.NEW_POSITION ||
        mode === SwapFormModes.ROLLOVER ||
        mode === SwapFormModes.FIX_BORROW) &&
        (swapSummary || swapSummaryLoading) && (
          <>
            <Box sx={bottomSpacing}>
              <SwapSummary
                data={swapSummary}
                formAction={formAction}
                loading={swapSummaryLoading}
                maxAvailableNotional={maxAvailableNotional}
                underlyingTokenName={underlyingTokenName}
                yieldBearingTokenName={protocol}
              />
            </Box>
          </>
        )}

      {mode === SwapFormModes.EDIT_MARGIN &&
        !isUndefined(currentPositionMarginRequirement) &&
        !isUndefined(positionMargin) && (
          <Box sx={bottomSpacing}>
            <SwapSummaryEditMargin
              balance={balance}
              currentPositionMarginRequirement={currentPositionMarginRequirement}
              positionMargin={positionMargin}
              underlyingTokenName={underlyingTokenName}
            />
          </Box>
        )}
    </FormPanel>
  );
};
