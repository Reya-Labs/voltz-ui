import { Typography } from '@components/atomic';
import { Stack, TableRow } from '@mui/material';
import TableCell from '@mui/material/TableCell';

import { formatCurrency, formatDateTime } from '@utilities';
import { upperCase } from 'lodash';

import { IconLabel } from '@components/composite';
import { Box } from '@mui/system';
import { useBorrowAMMContext, usePositionContext } from '@contexts';
import { useEffect } from 'react';
import FixBorrowSlider from '../FixBorrowSlider/FixBorrowSlider';
import { UseAsyncFunctionResult } from '@hooks';

export type FixBorrowProps = {
  variableDebt: UseAsyncFunctionResult<unknown, number | void>;
  currencyCode?: string;
  currencySymbol?: string;
  selectedFixedDebt?: number;
  selectedFixedDebtPercentage?: number;
  selectedVariableDebt?: number;
  selectedVariableDebtPercentage?: number;
  handleChange: (value: number) => void;
  swapSummaryLoading: boolean;
}

const FixBorrow: React.FunctionComponent<FixBorrowProps> = ({
  variableDebt,
  currencyCode = '',
  currencySymbol = '',
  selectedFixedDebt,
  selectedFixedDebtPercentage,
  selectedVariableDebt,
  selectedVariableDebtPercentage,
  handleChange,
  swapSummaryLoading
}) => {
  const renderValue = () => {
    if (variableDebt.loading) {
      return 'Loading...';
    }

    if (!variableDebt.result) {
      return `${currencySymbol}0`;
    }

    return `${currencySymbol}${(variableDebt.result).toFixed(2)}`;
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <Box>
          <Typography variant='h4'>
            <IconLabel label="Variable Debt" icon="information-circle" info="TBA" />
          </Typography>
        </Box>

        <Box>
          <Typography variant='h4'>
            {renderValue()} {currencyCode}
          </Typography>
        </Box>
        
      </Stack>

      <FixBorrowSlider 
        variableDebt={variableDebt}
        selectedFixedDebt={selectedFixedDebt}
        selectedFixedDebtPercentage={selectedFixedDebtPercentage}
        selectedVariableDebt={selectedVariableDebt}
        selectedVariableDebtPercentage={selectedVariableDebtPercentage}
        currencySymbol={'$'}
        handleChange={handleChange}
        swapSummaryLoading={swapSummaryLoading}
      />
    </Box>
  );
};

export default FixBorrow;
