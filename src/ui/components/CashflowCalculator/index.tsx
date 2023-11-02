import { ToggleCaret, TokenField, TypographyToken, TypographyWithTooltip } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app';
import { V2Pool } from '../../../app/features/aMMs';
import {
  getExpectedCashflowThunk,
  selectCashflowCalculatorDisabled,
  selectCashflowCalculatorError,
  selectCashflowPool,
  selectEstimatedVariableApy,
  selectTotalCashflowFormatted,
  setCashflowPoolAction,
  setEstimatedVariableApyAction,
} from '../../../app/features/cashflow-calculator';
import { stringToBigFloat } from '../../../utilities/number';
import { useWallet } from '../../hooks/useWallet';
import { CashFlowCalculatorBox, ToggleCaretBox } from './CashflowCalculator.styled';

type CashflowCalculatorProps = {
  pool: V2Pool;
  mode: 'fixed' | 'variable';
};

export const CashflowCalculator: React.FunctionComponent<CashflowCalculatorProps> = ({
  pool,
  mode,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const disabled = useAppSelector(selectCashflowCalculatorDisabled);
  const cashflowPool = useAppSelector(selectCashflowPool);
  const estimatedApy = useAppSelector(selectEstimatedVariableApy);
  const { account } = useWallet();

  const totalCashflowFormatted = useAppSelector(selectTotalCashflowFormatted);
  const [localEstimatedApy, setLocalEstimatedApy] = useState<string | undefined>(
    estimatedApy.toString(),
  );
  const error = useAppSelector(selectCashflowCalculatorError);
  const handleOnToggleClick = () => setIsOpen(!isOpen);

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
    void dispatch(getExpectedCashflowThunk());
  }, [dispatch, estimatedApy]);

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

  const labelTypographyToken: TypographyToken = 'primaryBodySmallBold';
  if (!isOpen) {
    return (
      <CashFlowCalculatorBox>
        <TypographyWithTooltip
          colorToken="white100"
          tooltip="This shows the combined cashflow you could generate from your new position and your existing."
          typographyToken={labelTypographyToken}
        >
          Expected Variable APY - Calculator
        </TypographyWithTooltip>
        <ToggleCaretBox onClick={handleOnToggleClick}>
          <ToggleCaret isOpen={isOpen} />
        </ToggleCaretBox>
      </CashFlowCalculatorBox>
    );
  }
  return (
    <CashFlowCalculatorBox>
      <TokenField
        allowNegativeValue={false}
        bottomLeftText={error ? error : 'Total Expected Cashflow (Estimation)'}
        bottomLeftTextColorToken={error ? 'error100' : 'white100'}
        bottomRightTextColorToken="white"
        bottomRightTextToken=" "
        bottomRightTextValue={totalCashflowFormatted}
        disabled={disabled}
        label="Expected Variable APY - Calculator"
        labelColorToken="white100"
        labelTypographyToken={labelTypographyToken}
        max={{
          value: '100',
          showButton: false,
        }}
        token="%"
        tooltip="This shows the combined cashflow you could generate from your new position and your existing."
        value={localEstimatedApy}
        onChange={handleOnChange}
      />
      <ToggleCaretBox onClick={handleOnToggleClick}>
        <ToggleCaret isOpen={isOpen} />
      </ToggleCaretBox>
    </CashFlowCalculatorBox>
  );
};
