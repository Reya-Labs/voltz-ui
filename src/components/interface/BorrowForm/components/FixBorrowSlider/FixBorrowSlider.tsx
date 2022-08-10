import { Typography } from '@components/atomic';
import { Slider, Stack, TableRow } from '@mui/material';
import TableCell from '@mui/material/TableCell';

import { formatCurrency, formatNumber } from '@utilities';
import { upperCase } from 'lodash';

import { IconLabel } from '@components/composite';
import { Box } from '@mui/system';

export type FixBorrowSliderProps = {
  variableDebt: number;
  currencySymbol: string;
  selectedFixedDebt: number;
  selectedFixedDebtPercentage: number;
  selectedVariableDebt: number;
  selectedVariableDebtPercentage: number;
}

const FixBorrowSlider: React.FunctionComponent<FixBorrowSliderProps> = ({
  variableDebt,
  currencySymbol,
  selectedFixedDebt,
  selectedFixedDebtPercentage,
  selectedVariableDebt,
  selectedVariableDebtPercentage
}) => {
  return (
    <Box>
      <Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant='body2'>
            {upperCase('Fixed Debt')}
          </Typography>
          <Typography variant='body2'>
              {upperCase('Variable Debt')}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant='body2'>
            {currencySymbol}{formatCurrency(selectedFixedDebt)} ({formatNumber(selectedFixedDebtPercentage)}%)
          </Typography>
          <Typography variant='body2'>
            {currencySymbol}{formatCurrency(selectedVariableDebt)} ({formatNumber(selectedVariableDebtPercentage)}%)
          </Typography>
        </Stack>
      </Stack>

      <Slider
        defaultValue={50}
        valueLabelDisplay="auto"
        step={2.5}
        marks
        min={0}
        max={100}
      />
    </Box>
  );
};

export default FixBorrowSlider;
