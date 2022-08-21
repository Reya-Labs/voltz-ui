import { Typography } from '@components/atomic';
import { Stack, TableRow } from '@mui/material';
import { colors } from '@theme';

import { IconLabel } from '@components/composite';
import { Box } from '@mui/system';
import FixBorrowSlider from '../FixBorrowSlider/FixBorrowSlider';
import { UseAsyncFunctionResult } from '@hooks';

export type FixBorrowProps = {
  variableDebt: UseAsyncFunctionResult<unknown, number | void>;
  underlyingTokenName?: string;
  selectedFixedDebt?: number;
  selectedFixedDebtPercentage?: number;
  selectedVariableDebt?: number;
  selectedVariableDebtPercentage?: number;
  handleChange: (value: number) => void;
  swapSummaryLoading: boolean;
}

const FixBorrow: React.FunctionComponent<FixBorrowProps> = ({
  variableDebt,
  underlyingTokenName = '',
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
      return `0 ${underlyingTokenName}`;
    }

    return `${(variableDebt.result).toFixed(2)} ${underlyingTokenName}`;
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <Box>
          <Typography variant='body2' sx={{fontSize: 20, fontWeight: 700}}>
            <IconLabel label="Variable Debt" icon="information-circle" info="TBA" />
          </Typography>
        </Box>

        <Box>
          <Typography variant='body2' sx={{fontSize: 20, fontWeight: 700, color: colors.skyBlueCrayola.base }}>
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
        underlyingTokenName={underlyingTokenName}
        handleChange={handleChange}
        swapSummaryLoading={swapSummaryLoading}
      />
    </Box>
  );
};

export default FixBorrow;
