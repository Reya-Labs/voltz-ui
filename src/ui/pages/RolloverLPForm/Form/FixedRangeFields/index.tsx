import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../app';
import {
  getInfoPostLpThunk,
  selectUserInputFixedError,
  selectUserInputFixedLower,
  selectUserInputFixedUpdateCount,
  selectUserInputFixedUpper,
  setUserInputFixedLowerAction,
  setUserInputFixedUpperAction,
} from '../../../../../app/features/forms/lps/rollover-lp';
import { FixedRangeFieldsUI } from '../../../../components/FixedRangeFieldsUI';

export const FixedRangeFields: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const fixedLower = useAppSelector(selectUserInputFixedLower);
  const fixedUpper = useAppSelector(selectUserInputFixedUpper);
  const fixedUpdateCount = useAppSelector(selectUserInputFixedUpdateCount);
  const fixedError = useAppSelector(selectUserInputFixedError);

  const handleOnChangeFixedLower = (value: number | null) => {
    dispatch(
      setUserInputFixedLowerAction({
        value,
      }),
    );
    void dispatch(getInfoPostLpThunk());
  };

  const handleOnChangeFixedUpper = (value: number | null) => {
    dispatch(
      setUserInputFixedUpperAction({
        value,
      }),
    );
    void dispatch(getInfoPostLpThunk());
  };

  return (
    <FixedRangeFieldsUI
      error={Boolean(fixedError)}
      fixedLower={fixedLower}
      fixedUpdateCount={fixedUpdateCount}
      fixedUpper={fixedUpper}
      onChangeFixedLower={handleOnChangeFixedLower}
      onChangeFixedUpper={handleOnChangeFixedUpper}
    />
  );
};
