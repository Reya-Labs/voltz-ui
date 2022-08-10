import { Typography } from '@components/atomic';
import { Stack, TableRow } from '@mui/material';
import TableCell from '@mui/material/TableCell';

import { formatCurrency, formatDateTime } from '@utilities';
import { upperCase } from 'lodash';

import { IconLabel } from '@components/composite';
import { Box } from '@mui/system';

export type VariableDebtProps = {
  variableDebt: number;
  currencyCode?: string;
  currencySymbol?: string;
}

const VariableDebt: React.FunctionComponent<VariableDebtProps> = ({
  variableDebt,
  currencyCode = '',
  currencySymbol = ''
}) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
      <Box>
        <Typography variant='h4'>
          <IconLabel label="Variable Debt" icon="information-circle" info="TBA" />
        </Typography>
      </Box>

      <Box>
        <Typography variant='h4'>
          {currencySymbol}{formatCurrency(variableDebt)} {currencyCode}
        </Typography>
      </Box>
      
    </Stack>
  );
};

export default VariableDebt;
