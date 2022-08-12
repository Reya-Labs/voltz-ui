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
  aggregatedDebt: UseAsyncFunctionResult<unknown, number | void>;
  currencyCode?: string;
  currencySymbol?: string;
  selectedFixedDebt?: number;
  selectedFixedDebtPercentage?: number;
  selectedVariableDebt?: number;
  selectedVariableDebtPercentage?: number;
  handleChange: (value: number) => void;
}

const FixBorrow: React.FunctionComponent<FixBorrowProps> = ({
  aggregatedDebt,
  currencyCode = '',
  currencySymbol = '',
  selectedFixedDebt,
  selectedFixedDebtPercentage,
  selectedVariableDebt,
  selectedVariableDebtPercentage,
  handleChange
}) => {
  const renderValue = () => {
    if (aggregatedDebt.loading) {
      return 'Loading...';
    }

    if (!aggregatedDebt.result) {
      return `${currencySymbol}0`;
    }

    return `${currencySymbol}${(aggregatedDebt.result).toFixed(2)}`;
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
        aggregatedDebt={aggregatedDebt}
        selectedFixedDebt={selectedFixedDebt}
        selectedFixedDebtPercentage={selectedFixedDebtPercentage}
        selectedVariableDebt={selectedVariableDebt}
        selectedVariableDebtPercentage={selectedVariableDebtPercentage}
        currencySymbol={'$'}
        handleChange={handleChange}
      />
    </Box>
  );
};

export default FixBorrow;
