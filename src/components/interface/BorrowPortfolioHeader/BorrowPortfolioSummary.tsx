import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { SystemStyleObject, Theme } from '../../../theme';
import { formatCurrency, formatNumber } from '../../../utilities/number';
import { Typography } from '../../atomic/Typography/Typography';

export type BorrowPortfolioSummaryProps = {
  currencyCode: string;
  currencySymbol: string;
  fixedDebt?: number;
  variableDebt?: number;
  fixedPositionsCount?: number;
  variablePositionsCount?: number;
};

export const BorrowPortfolioSummary = ({
  currencyCode,
  currencySymbol,
  fixedDebt,
  variableDebt,
  fixedPositionsCount,
  variablePositionsCount,
}: BorrowPortfolioSummaryProps) => {
  let percentageVariable: number = 100;
  let percentageFixed: number = 0;
  if (variableDebt !== undefined && fixedDebt !== undefined) {
    if (variableDebt + fixedDebt !== 0) {
      percentageVariable = (variableDebt / (variableDebt + fixedDebt)) * 100;
      percentageFixed = (fixedDebt / (variableDebt + fixedDebt)) * 100;
    } else {
      percentageVariable = 0;
      percentageFixed = 0;
    }
  }

  const sideWidth = (isVar: boolean, isLimit: boolean): SystemStyleObject<Theme> => {
    const varColor = colors.ultramarineBlue2;
    const fixColor = colors.skyBlueCrayola2;
    const height = '20px';
    // show small line eve if percentage is zero
    if (isLimit) {
      return {
        width: '0.5%',
        backgroundColor: isVar ? varColor : fixColor,
        height: height,
      };
    }

    const sum = percentageVariable + percentageFixed;
    const width = isVar ? (sum === 0 ? 100 : percentageVariable) : percentageFixed;

    return {
      width: `${(width * 0.99).toString()}%`,
      backgroundColor: isVar ? varColor : fixColor,
      height: height,
    };
  };

  const labelStyles: SystemStyleObject<Theme> = {
    textTransform: 'uppercase',
    fontWeight: 400,
    fontSize: 14,
    color: colors.lavenderWeb2,
    verticalAlign: 'middle',
    marginTop: (theme) => theme.spacing(1),
  };

  const renderDebt = (debt: number | undefined, percentage: number | undefined, isVar: boolean) => {
    const justify = isVar ? 'flex-end' : 'flex-start';
    const align = isVar ? 'right' : 'left';
    if (debt !== undefined && percentage !== undefined) {
      return (
        <Box sx={{ display: 'flex', justifyContent: justify, textAlign: align }}>
          {currencySymbol + formatCurrency(debt, true, false, 2, 2) + ' ' + currencyCode}
          <Box sx={{ color: colors.lavenderWeb2, fontWeight: 400 }}>
            {' '}
            &nbsp;
            {`(${formatNumber(percentage)}%)`}
          </Box>
        </Box>
      );
    }

    return <Box sx={{ display: 'flex', justifyContent: justify, textAlign: align }}>{'---'}</Box>;
  };

  const renderDebtSummary = () => {
    return (
      <Grid sx={{ marginBottom: (theme) => theme.spacing(4) }} container>
        <Grid xs={6} item>
          <Typography sx={{ ...labelStyles }} variant="subtitle1">
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', textAlign: 'left' }}>
              Fixed Debt
            </Box>
          </Typography>
        </Grid>
        <Grid xs={6} item>
          <Typography sx={{ ...labelStyles }} variant="subtitle1">
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
              Variable Debt
            </Box>
          </Typography>
        </Grid>

        <Grid xs={6} item>
          <Typography
            sx={{
              fontSize: 20,
              textTransform: 'uppercase',
              verticalAlign: 'middle',
              fontWeight: 700,
            }}
            variant="body2"
          >
            {renderDebt(fixedDebt, percentageFixed, false)}
          </Typography>
        </Grid>

        <Grid xs={6} item>
          <Typography
            sx={{
              fontSize: 20,
              textTransform: 'uppercase',
              verticalAlign: 'middle',
              fontWeight: 700,
            }}
            variant="body2"
          >
            {renderDebt(variableDebt, percentageVariable, true)}
          </Typography>
        </Grid>
      </Grid>
    );
  };
  const renderBar = () => {
    return (
      <Grid container>
        <Grid display="flex" xs={12} item>
          <Box sx={{ ...sideWidth(false, true) }}></Box>
          <Box sx={{ ...sideWidth(false, false) }}></Box>

          <Box sx={{ ...sideWidth(true, false) }}></Box>
          <Box sx={{ ...sideWidth(true, true) }}></Box>
        </Grid>
      </Grid>
    );
  };
  const renderPositionsCount = () => {
    return (
      <Grid container>
        <Grid xs={6} item>
          <Typography sx={{ ...labelStyles }} variant="subtitle1">
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', textAlign: 'left' }}>
              {fixedPositionsCount !== undefined ? fixedPositionsCount : '---'}{' '}
              {fixedPositionsCount === 1 ? 'POSITION' : 'POSITIONS'}
            </Box>
          </Typography>
        </Grid>

        <Grid xs={6} item>
          <Typography sx={{ ...labelStyles }} variant="body2">
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
              {variablePositionsCount !== undefined ? variablePositionsCount : '---'}{' '}
              {variablePositionsCount === 1 ? 'POSITION' : 'POSITIONS'}
            </Box>
          </Typography>
        </Grid>
      </Grid>
    );
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: colors.liberty6,
          borderRadius: '4px',
          border: `1px solid ${colors.liberty4}`,
          padding: (theme) => theme.spacing(4),
          marginTop: (theme) => theme.spacing(8),
        }}
      >
        {renderDebtSummary()}
        {renderBar()}
        {renderPositionsCount()}
      </Box>
    </>
  );
};
