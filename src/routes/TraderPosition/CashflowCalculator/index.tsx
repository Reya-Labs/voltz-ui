import { CurrencyField, LabelTokenTypography, Typography } from 'brokoli-ui';
import React, { useCallback, useEffect } from 'react';

import {
  selectAdditionalCashflow,
  selectCashflowCalculatorStatus,
  selectPredictedApy,
  selectTotalCashflow,
  setPredictedApyAction,
  updateCashflowCalculatorAction,
} from '../../../app/features/swap-form';
import { initialiseCashflowCalculator } from '../../../app/features/swap-form/thunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useAMMs } from '../../../hooks/useAMMs';
import { formatCurrency } from '../../../utilities/number';
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
  const dispatch = useAppDispatch();
  //TODO Alex: get AMM as selected for this swap form
  const { aMMs, loading, error } = useAMMs();

  const status = useAppSelector(selectCashflowCalculatorStatus);
  const predictedApy = useAppSelector(selectPredictedApy);

  const additonalCashflow = useAppSelector(selectAdditionalCashflow);
  const totalCashflow = useAppSelector(selectTotalCashflow);

  //TODO Alex
  useEffect(() => {
    if (!loading && !error && aMMs.length > 0 && status === 'idle') {
      void dispatch(initialiseCashflowCalculator({ amm: aMMs[0] }));
    }
  }, [aMMs, loading, error]);

  const handleOnChange = useCallback(
    (value?: string) => {
      if (!value) {
        return;
      }
      dispatch(
        setPredictedApyAction({
          value,
        }),
      );
      if (!loading && !error && aMMs.length > 0) {
        //TODO Alex
        dispatch(
          updateCashflowCalculatorAction({
            amm: aMMs[0],
          }),
        );
      }
    },
    [dispatch, aMMs],
  );

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
          <CurrencyField
            disabled={status === 'idle'}
            error={status === 'failed'}
            suffix="%"
            value={predictedApy}
            onChange={handleOnChange}
          />
        </ExpectedApyBox>
        <AdditionalCashFlowBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Additional Cashflow"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            token=" USDC"
            typographyToken="secondaryBodySmallRegular"
            value={formatCurrency(additonalCashflow, true, true, 2, 4)}
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
            value={formatCurrency(totalCashflow, true, true, 2, 4)}
          />
        </TotalCashFlowBox>
      </CashFlowCalculatorRightBox>
    </CashFlowCalculatorBox>
  );
};
