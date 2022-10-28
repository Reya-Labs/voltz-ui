import { Typography } from '@components/atomic';
import { Stack } from '@mui/material';
import { colors } from '@theme';

import { IconLabel } from '@components/composite';
import { Box } from '@mui/system';
import FixBorrowSlider from '../FixBorrowSlider/FixBorrowSlider';
import { UseAsyncFunctionResult } from '@hooks';
import { formatNumber } from '@utilities';

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

const FixBorrow: React.FunctionComponent<FixBorrowProps> = ({
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
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <Box>
          <Typography variant="body2" sx={{ fontSize: 20, fontWeight: 700 }}>
            <IconLabel
              label="Variable Debt"
              icon="information-circle"
              info="Your current variable debt on Aave or Compound that has not been set to a Voltz fixed rate yet"
            />
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="body2"
            sx={{ fontSize: 20, fontWeight: 700, color: colors.skyBlueCrayola.base }}
          >
            {renderValue()}
          </Typography>
        </Box>
      </Stack>

      <FixBorrowSlider
        variableDebt={variableDebt}
        selectedFixedDebt={selectedFixedDebt}
        selectedFixedDebtPercentage={selectedFixedDebtPercentage}
        selectedVariableDebt={selectedVariableDebt}
        selectedVariableDebtPercentage={selectedVariableDebtPercentage}
        handleSliderChange={handleChange}
        underlyingTokenName={underlyingTokenName}
        swapSummaryLoading={swapSummaryLoading}
        error={error}
        errorText={errorText}
      />
    </Box>
  );
};

export default FixBorrow;
