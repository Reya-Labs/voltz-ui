import { CurrencyField, LabelTokenTypography, Typography } from 'brokoli-ui';
import React, { useCallback, useEffect } from 'react';

import {
  refreshCashflows,
  selectAdditionalCashflow,
  selectCashflowCalculatorErrorState,
  selectCashflowCalculatorInitialised,
  selectPredictedApy,
  selectTotalCashflow,
  setPredictedApyAction,
} from '../../../app/features/swap-form';
import { initialiseCashflowCalculator } from '../../../app/features/swap-form/thunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useAMMs } from '../../../hooks/useAMMs';
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

  const initialised = useAppSelector(selectCashflowCalculatorInitialised);
  const predictedApy = useAppSelector(selectPredictedApy);
  const cashflowCalculatorError = useAppSelector(selectCashflowCalculatorErrorState);

  const additonalCashflow = useAppSelector(selectAdditionalCashflow);
  const totalCashflow = useAppSelector(selectTotalCashflow);

  //TODO Alex
  useEffect(() => {
    if (!loading && !error && aMMs.length > 0 && !initialised) {
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
          refreshCashflows({
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
            disabled={!initialised}
            error={cashflowCalculatorError}
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
            value={additonalCashflow}
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
            value={totalCashflow}
          />
        </TotalCashFlowBox>
      </CashFlowCalculatorRightBox>
    </CashFlowCalculatorBox>
  );
};
