import { CurrencyField, LabelTokenTypography, Typography } from 'brokoli-ui';
import React, { useEffect, useState } from 'react';

import {
  AdditionalCashFlowBox,
  CashFlowCalculatorBox,
  CashFlowCalculatorLeftBox,
  CashFlowCalculatorRightBox,
  ExpectedApyBox,
  TotalCashFlowBox,
} from './CashflowCalculator.styled';

type CashFlowCalculatorProps = {};

export const CashFlowCalculator: React.FunctionComponent<CashFlowCalculatorProps> = () => {
  const [expectedVariableAPY, setExpectedVariableAPY] = useState<string | undefined>('0');
  // todo: alex read the 3 variables from the swapForm feature
  useEffect(() => {
    // dispatch a thunk
    // todo: initialiseCashflowCalculatorThunk
  }, []);

  return (
    <CashFlowCalculatorBox>
      <CashFlowCalculatorLeftBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodyMediumBold">
          Cashflow Simulator
        </Typography>
      </CashFlowCalculatorLeftBox>
      <CashFlowCalculatorRightBox>
        <ExpectedApyBox>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
            Expected Variable APY
          </Typography>
          <CurrencyField suffix="%" value={expectedVariableAPY} onChange={setExpectedVariableAPY} />
        </ExpectedApyBox>
        <AdditionalCashFlowBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Additional Cashflow"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            token=" USDC"
            typographyToken="secondaryBodySmallRegular"
            value="+0.00"
          />
        </AdditionalCashFlowBox>
        <TotalCashFlowBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Total Cashflow"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            token=" USDC"
            typographyToken="secondaryBodySmallRegular"
            value="+0.00"
          />
        </TotalCashFlowBox>
      </CashFlowCalculatorRightBox>
    </CashFlowCalculatorBox>
  );
};
