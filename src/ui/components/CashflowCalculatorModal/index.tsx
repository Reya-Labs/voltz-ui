import { CurrencyField, LabelTokenTypography, Typography, TypographyToken } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app';
import { V2Pool } from '../../../app/features/aMMs';
import {
  getExpectedCashflowThunk,
  selectAdditionalCashflow,
  selectCashflowInfoStatus,
  selectCashflowPool,
  selectEstimatedVariableApy,
  selectPoolTokenFormatted,
  selectTotalCashflow,
  setCashflowPoolAction,
  setEstimatedVariableApyAction,
} from '../../../app/features/cashflow-calculator-modal';
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
} from './CashflowCalculatorModal.styled';

type CashflowCalculatorModalProps = {
  pool: V2Pool;
  mode: 'fixed' | 'variable';
};

export const CashflowCalculatorModal: React.FunctionComponent<CashflowCalculatorModalProps> = ({
  pool,
  mode,
}) => {
  const dispatch = useAppDispatch();
  const cashflowPool = useAppSelector(selectCashflowPool);
  const token = useAppSelector(selectPoolTokenFormatted);
  const { isLargeDesktopDevice } = useResponsiveQuery();
  const estimatedApy = useAppSelector(selectEstimatedVariableApy);
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
          setEstimatedVariableApyAction({
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
      setCashflowPoolAction({
        pool,
      }),
    );
  }, [dispatch, pool]);

  useEffect(() => {
    setLocalEstimatedApy(estimatedApy.toString());
  }, [estimatedApy]);

  useEffect(() => {
    if (!cashflowPool) {
      return;
    }
    void dispatch(getExpectedCashflowThunk());
  }, [dispatch, cashflowPool]);

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

  if (!cashflowPool) {
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
