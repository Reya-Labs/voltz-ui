import { AMM, Position } from '@voltz-protocol/v1-sdk';
import { CurrencyField, LabelTokenTypography, Typography, TypographyToken } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app';
import {
  getExpectedCashflowInfoThunk,
  selectAdditionalCashflow,
  selectAMMTokenFormatted,
  selectCashflowAMM,
  selectCashflowInfoStatus,
  selectEstimatedApy,
  selectTotalCashflow,
  selectVariableRateInfo,
  setCashflowAMMAction,
  setEstimatedApyAction,
} from '../../../app/features/cashflow-calculator';
import { formFormatNumber } from '../../../app/features/forms/common';
import { stringToBigFloat } from '../../../utilities/number';
import { useResponsiveQuery } from '../../hooks/useResponsiveQuery';
import { useWallet } from '../../hooks/useWallet';
import {
  AdditionalCashFlowBox,
  CashFlowCalculatorBox,
  CashFlowCalculatorLeftBox,
  CashFlowCalculatorRightBox,
  ExpectedApyBox,
  TotalCashFlowBox,
} from './CashflowCalculator.styled';

type CashFlowCalculatorProps = {
  position: Position | null;
  aMM: AMM;
  averageFixedRate: number | null;
  variableTokenDeltaBalance: number | null;
  mode: 'fixed' | 'variable';
};

export const CashFlowCalculator: React.FunctionComponent<CashFlowCalculatorProps> = ({
  aMM,
  position,
  averageFixedRate,
  variableTokenDeltaBalance,
  mode,
}) => {
  const dispatch = useAppDispatch();
  const cashflowAMM = useAppSelector(selectCashflowAMM);
  const token = useAppSelector(selectAMMTokenFormatted);
  const { isLargeDesktopDevice } = useResponsiveQuery();
  const variableRateInfo = useAppSelector(selectVariableRateInfo);
  const estimatedApy = useAppSelector(selectEstimatedApy);
  const { account } = useWallet();

  const additionalCashflow = useAppSelector(selectAdditionalCashflow);
  const totalCashflow = useAppSelector(selectTotalCashflow);
  const [localEstimatedApy, setLocalEstimatedApy] = useState<string | undefined>(
    estimatedApy.toString(),
  );

  const cashflowInfoStatus = useAppSelector(selectCashflowInfoStatus);
  const debouncedChangePredictedApy = useMemo(
    () =>
      debounce((value: number) => {
        dispatch(
          setEstimatedApyAction({
            value,
            account: account || '',
            mode,
          }),
        );
      }, 300),
    [dispatch, mode, account],
  );

  useEffect(() => {
    dispatch(
      setCashflowAMMAction({
        amm: aMM,
      }),
    );
  }, [dispatch, aMM]);

  useEffect(() => {
    setLocalEstimatedApy(estimatedApy.toString());
  }, [estimatedApy]);

  useEffect(() => {
    if (variableRateInfo === undefined) {
      return;
    }
    debouncedChangePredictedApy(parseFloat(variableRateInfo.toFixed(2)));
  }, [debouncedChangePredictedApy, variableRateInfo]);

  useEffect(() => {
    if (!cashflowAMM) {
      return;
    }
    if (averageFixedRate === null || variableTokenDeltaBalance === null) {
      return;
    }
    void dispatch(
      getExpectedCashflowInfoThunk({
        position,
        averageFixedRate,
        variableTokenDeltaBalance,
      }),
    );
  }, [dispatch, cashflowAMM, position, averageFixedRate, variableTokenDeltaBalance]);

  const handleOnChange = useCallback(
    (value?: string) => {
      setLocalEstimatedApy(value);

      const valueAsNumber = value !== undefined ? stringToBigFloat(value) : 0;
      debouncedChangePredictedApy(valueAsNumber);
    },
    [debouncedChangePredictedApy],
  );

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedChangePredictedApy.cancel();
    };
  }, []);

  if (!cashflowAMM) {
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
    ? 'secondaryBodyMediumRegular'
    : 'secondaryBodySmallRegular';

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
            disabled={cashflowInfoStatus !== 'success'}
            suffix="%"
            value={localEstimatedApy}
            onChange={handleOnChange}
          />
        </ExpectedApyBox>
        <AdditionalCashFlowBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Additional Cashflow"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            prefixToken={additionalCashflow !== null ? (additionalCashflow > 0 ? '+' : '-') : ''}
            token={token}
            tooltip="This shows the cashflow you could generate from your new position."
            typographyToken={typographyToken}
            value={
              additionalCashflow !== null ? formFormatNumber(Math.abs(additionalCashflow)) : '--'
            }
          />
        </AdditionalCashFlowBox>
        <TotalCashFlowBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Total Cashflow"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            prefixToken={totalCashflow !== null ? (totalCashflow > 0 ? '+' : '-') : ''}
            token={token}
            tooltip="This shows the combined cashflow you could generate from your new position and your existing."
            typographyToken={typographyToken}
            value={totalCashflow !== null ? formFormatNumber(Math.abs(totalCashflow)) : '--'}
          />
        </TotalCashFlowBox>
      </CashFlowCalculatorRightBox>
    </CashFlowCalculatorBox>
  );
};
