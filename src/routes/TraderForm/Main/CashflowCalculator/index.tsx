import { CurrencyField, LabelTokenTypography, Typography, TypographyToken } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  initialiseCashflowCalculatorThunk,
  selectAdditionalCashflow,
  selectAMMTokenFormatted,
  selectCashflowCalculatorStatus,
  selectPredictedApy,
  selectSwapFormAMM,
  selectTotalCashflow,
  setPredictedApyAction,
} from '../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useResponsiveQuery } from '../../../../hooks/useResponsiveQuery';
import { formatCurrency } from '../../../../utilities/number';
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
  const aMM = useAppSelector(selectSwapFormAMM);
  const token = useAppSelector(selectAMMTokenFormatted);
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const status = useAppSelector(selectCashflowCalculatorStatus);

  const predictedApy = useAppSelector(selectPredictedApy);

  const additionalCashflow = useAppSelector(selectAdditionalCashflow);
  const totalCashflow = useAppSelector(selectTotalCashflow);
  const [localPredictedApyLocal, setLocalPredictedApyLocal] = useState<string | undefined>(
    predictedApy,
  );

  useEffect(() => {
    setLocalPredictedApyLocal(predictedApy);
  }, [predictedApy]);

  useEffect(() => {
    if (!aMM) {
      return;
    }
    void dispatch(initialiseCashflowCalculatorThunk());
  }, [dispatch, aMM]);

  const debouncedChangePredictedApy = useMemo(
    () =>
      debounce((value?: string) => {
        dispatch(
          setPredictedApyAction({
            value: value || '',
          }),
        );
      }, 300),
    [dispatch],
  );

  const handleOnChange = useCallback(
    (value?: string) => {
      setLocalPredictedApyLocal(value);
      debouncedChangePredictedApy(value);
    },
    [dispatch, debouncedChangePredictedApy],
  );

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedChangePredictedApy.cancel();
    };
  }, []);

  if (!aMM) {
    return null;
  }

  const titleTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodyLargeBold'
    : 'primaryBodyMediumBold';

  const expectedVariableApyTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  const labelTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  const typographyToken: TypographyToken = isLargeDesktopDevice
    ? 'secondaryBodySmallRegular'
    : 'secondaryBodyMediumRegular';

  return (
    <CashFlowCalculatorBox>
      <CashFlowCalculatorLeftBox>
        <Typography colorToken="lavenderWeb" typographyToken={titleTypographyToken}>
          Cashflow Simulator
        </Typography>
      </CashFlowCalculatorLeftBox>
      <CashFlowCalculatorRightBox>
        <ExpectedApyBox>
          <Typography
            colorToken="lavenderWeb3"
            typographyToken={expectedVariableApyTypographyToken}
          >
            Expected Variable APY
          </Typography>
          <CurrencyField
            allowNegativeValue={false}
            disabled={status !== 'success'}
            suffix="%"
            value={localPredictedApyLocal}
            onChange={handleOnChange}
          />
        </ExpectedApyBox>
        <AdditionalCashFlowBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Additional Cashflow"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token={token}
            tooltip="Calculated based on the notional amount and trade side specified in the form for swap."
            typographyToken={typographyToken}
            value={formatCurrency(additionalCashflow, true, true, 2, 4)}
          />
        </AdditionalCashFlowBox>
        <TotalCashFlowBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Total Cashflow"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token={token}
            tooltip="Calculated based on the current position plus the notional amount and trade side specified in the form for swap."
            typographyToken={typographyToken}
            value={formatCurrency(totalCashflow, true, true, 2, 4)}
          />
        </TotalCashFlowBox>
      </CashFlowCalculatorRightBox>
    </CashFlowCalculatorBox>
  );
};
