import { Box, Grid } from '@mui/material';

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

  let percentageVariable: string = "99%";
  let percentageFixed: string = "0%";
  if( (variableDebt !== undefined) &&  (fixedDebt !== undefined) ) {
    if (variableDebt + fixedDebt !== 0) {
      const variable = ((variableDebt) / (variableDebt + fixedDebt)) * 100;
      const fixed = ((fixedDebt) / (variableDebt + fixedDebt)) * 100;
      percentageVariable = variable.toString() + "%";
      percentageFixed = fixed.toString() + "%";
    }
  }

  const sideWidth = (isVar: boolean, ): SystemStyleObject<Theme> => {
    if (isVar) {
      return {
        width: percentageVariable,
        backgroundColor: 'tertiary.darken010',
        height: '24px'
      }
    } else {
      return {
        width: percentageFixed,
        backgroundColor: 'primary.light',
        height: '24px'
      }
    }
  }

  const labelStyles: SystemStyleObject<Theme> = { 
    textTransform: "uppercase",
    fontWeight: 400, 
    fontSize: 16,
    color: "#5A576D",
    verticalAlign: 'middle',
    marginTop: (theme) => theme.spacing(1)
  };

  const renderDebtSummary = () => {
    return (
      <Grid container>
      <Grid item xs={6}>
        <Typography variant="body2" sx={{fontSize: 16, textTransform: "uppercase", verticalAlign: 'middle', fontWeight: "bold"}}>
          <Box sx={{display:'flex', justifyContent:"flex-start", textAlign: "left"}}>
            Fixed Debt
          </Box>
          <Box sx={{display:'flex', justifyContent:"flex-start", textAlign: "left"}}>
          {(fixedDebt !== undefined)  ? (currencySymbol + formatCurrency(fixedDebt) +" "+ currencyCode) : "---"}
          </Box>
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant="body2" sx={{fontSize: 16, textTransform: "uppercase", verticalAlign: 'middle', fontWeight: "bold"}}>
          <Box sx={{  display:'flex', justifyContent:"flex-end", textAlign: "right"}}>
            Variable Debt
          </Box>
          <Box sx={{display:'flex', justifyContent:"flex-end", textAlign: "right"}}>
          { (variableDebt !== undefined) ? (currencySymbol + formatCurrency(variableDebt) +" "+ currencyCode) : "---"}
          </Box>
        </Typography>
      </Grid>

      </Grid>
    );
  }
  const renderBar = () => {
    return (
      <Grid container>
        <Grid item xs={12} display="flex">
        <Box sx={{ ...sideWidth(false)}}>
        </Box>
        <Box sx={{ ...sideWidth(true)}}>
        </Box>
        </Grid>
      </Grid>
  );
  }
  const renderPositionsCount = () => {
    return (
      <Grid container>
      <Grid item xs={6}>
        <Typography variant="subtitle1" sx={{ ...labelStyles}}>
          <Box sx={{display:'flex', justifyContent:"flex-start", textAlign: "left"}}>
          {fixedPositionsCount} {(fixedPositionsCount == 1) ? "POSITION" : "POSITIONS"}
          </Box>
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant="body2" sx={{ ...labelStyles}}>
          <Box sx={{display:'flex', justifyContent:"flex-end", textAlign: "right"}}>
          {variablePositionsCount} {(variablePositionsCount == 1) ? "POSITION" : "POSITIONS"}
          </Box>
        </Typography>
      </Grid>
      </Grid>
    );
  }
  return (
    <>
      <Box sx={{backgroundColor: `secondary.darken040`, borderRadius: 2, border:"solid thin #5A576D", padding: 4, marginTop: (theme) => theme.spacing(8)}}>
      {renderDebtSummary()}
      {renderBar()}
      {renderPositionsCount()}
      </Box>
      
    </>
  )
};

export default BorrowPortfolioSummary;
