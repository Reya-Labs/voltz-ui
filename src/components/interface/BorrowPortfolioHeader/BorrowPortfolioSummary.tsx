import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';

import { Typography } from '@components/atomic';
import { SystemStyleObject, Theme } from '@theme';
import { formatCurrency } from '@utilities';

export type BorrowPortfolioSummaryProps = {
  commonOverrides: SystemStyleObject<Theme>;
  currencyCode: string;
  currencySymbol: string;
  fixedDebt?: number;
  variableDebt?: number;
  fixedPositionsCount?: number;
  variablePositionsCount?: number;
};

const BorrowPortfolioSummary = ({ 
  commonOverrides,
  currencyCode, 
  currencySymbol,
  fixedDebt,
  variableDebt,
  fixedPositionsCount,
  variablePositionsCount
}: BorrowPortfolioSummaryProps) => {

  const renderDebtSummary = () => {
    return (
    <TableRow key={'debtSummary'} sx={{backgroundColor: `primary.dark` }}>
      <TableCell key={"fixedDebt"} sx={{textAlign: 'left'}}>
        <Typography variant="body2" sx={{fontSize: 16, textTransform: "uppercase", verticalAlign: 'middle', fontWeight: "bold"}}>
          <Box sx={{display:'flex', alignContent: 'left'}}>
            Fixed Debt
          </Box>
          <Box sx={{display:'flex', alignContent: 'left'}}>
          {(fixedDebt !== undefined)  ? (currencySymbol + formatCurrency(fixedDebt) +" "+ currencyCode) : "---"}
          </Box>
        </Typography>
      </TableCell>

      <TableCell key={"variableDebt"} sx={{textAlign: 'right'}}>
        <Typography variant="body2" sx={{fontSize: 16, textTransform: "uppercase", verticalAlign: 'middle', fontWeight: "bold"}}>
          <Box sx={{display:'flex', alignContent: 'right'}}>
            Variable Debt
          </Box>
          <Box sx={{display:'flex', alignContent: 'right'}}>
          { (variableDebt !== undefined) ? (currencySymbol + formatCurrency(variableDebt) +" "+ currencyCode) : "---"}
          </Box>
        </Typography>
      </TableCell>
    </TableRow>);
  }
  const renderBar = () => {
    return <></>;
  }
  const renderPositionsCount = () => {
    return (
        <TableRow key={'debtSummary'} sx={{backgroundColor: `primary.dark` }}>
          <TableCell key={"fixedDebt"} sx={{textAlign: 'left'}}>
            <Typography variant="body2" sx={{fontSize: 16, textTransform: "uppercase", verticalAlign: 'middle', fontWeight: "bold"}}>
              <Box sx={{display:'flex', alignContent: 'left'}}>
                {fixedPositionsCount} {(fixedPositionsCount == 1) ? "POSITION" : "POSITIONS"}
              </Box>
            </Typography>
          </TableCell>
    
          <TableCell key={"variableDebt"} sx={{textAlign: 'right'}}>
            <Typography variant="body2" sx={{fontSize: 16, textTransform: "uppercase", verticalAlign: 'middle', fontWeight: "bold"}}>
              <Box sx={{display:'flex', alignContent: 'right'}}>
              {variablePositionsCount} {(variablePositionsCount == 1) ? "POSITION" : "POSITIONS"}
              </Box>
            </Typography>
          </TableCell>
        </TableRow>
    );
  }
  return (
    <>
      <TableContainer>
          <Table
            sx={{
              borderCollapse: 'separate',
              borderSpacing: '0px 16px',
              ...commonOverrides,
            }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableBody sx={{ position: 'relative', top: (theme) => `-${theme.spacing(3)}` }}>
            {renderDebtSummary()}
            {renderBar()}
            {renderPositionsCount()}
          </TableBody>
          </Table>
        </TableContainer>
      
    </>
  )
};

export default BorrowPortfolioSummary;
