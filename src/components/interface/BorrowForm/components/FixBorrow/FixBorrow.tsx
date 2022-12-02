import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React from 'react';

import { UseAsyncFunctionResult } from '../../../../../hooks/useAsyncFunction';
import { colors } from '../../../../../theme';
import { formatNumber } from '../../../../../utilities/number';
import { Typography } from '../../../../atomic/Typography/Typography';
import { IconLabel } from '../../../../composite/IconLabel/IconLabel';
import { FixBorrowSlider } from '../FixBorrowSlider/FixBorrowSlider';

export type FixBorrowProps = {
  variableDebt: UseAsyncFunctionResult<unknown, number | void>;
  underlyingTokenName?: string;
  selectedFixedDebt: number;
  selectedFixedDebtPercentage: number;
  selectedVariableDebt: number;
  selectedVariableDebtPercentage: number;
  handleChange: (value: number) => void;
  swapSummaryLoading: boolean;
  error?: boolean;
  errorText?: string;
};

export const FixBorrow: React.FunctionComponent<FixBorrowProps> = ({
  variableDebt,
  underlyingTokenName = '',
  selectedFixedDebt,
  selectedFixedDebtPercentage,
  selectedVariableDebt,
  selectedVariableDebtPercentage,
  handleChange,
  swapSummaryLoading,
  error,
  errorText,
}) => {
  const renderValue = () => {
    if (variableDebt.loading) {
      return 'Loading...';
    }

    if (!variableDebt.result) {
      return `0 ${underlyingTokenName}`;
    }

    let decimals = 2;
    if (underlyingTokenName === 'ETH') {
      decimals = 4;
    }

    return `${formatNumber(variableDebt.result, decimals, decimals)} ${underlyingTokenName}`;
  };

  return (
    <Box>
      <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={1}>
        <Box>
          <Typography sx={{ fontSize: 20, fontWeight: 700 }} variant="body2">
            <IconLabel
              icon="information-circle"
              info="Your current variable debt on Aave or Compound that has not been set to a Voltz fixed rate yet"
              label="Variable Debt"
            />
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{ fontSize: 20, fontWeight: 700, color: colors.skyBlueCrayola }}
            variant="body2"
          >
            {renderValue()}
          </Typography>
        </Box>
      </Stack>

      <FixBorrowSlider
        error={error}
        errorText={errorText}
        handleSliderChange={handleChange}
        selectedFixedDebt={selectedFixedDebt}
        selectedFixedDebtPercentage={selectedFixedDebtPercentage}
        selectedVariableDebt={selectedVariableDebt}
        selectedVariableDebtPercentage={selectedVariableDebtPercentage}
        swapSummaryLoading={swapSummaryLoading}
        underlyingTokenName={underlyingTokenName}
        variableDebt={variableDebt}
      />
    </Box>
  );
};
