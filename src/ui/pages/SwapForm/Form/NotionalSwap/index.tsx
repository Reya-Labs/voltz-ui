import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../app';
import {
  selectFixedRateInfo,
  selectIsGetInfoPostSwapLoading,
  selectUserInputMode,
  selectVariableRateInfo,
  setUserInputModeAction,
  simulateSwapThunk,
} from '../../../../../app/features/forms/trader/swap';
import { NotionalSwapUI } from '../../../../components/NotionalSwapUI';

export const NotionalSwap: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const isGetInfoPostSwapLoading = useAppSelector(selectIsGetInfoPostSwapLoading);

  const fixedRateInfo = useAppSelector(selectFixedRateInfo);
  const variableRateInfo = useAppSelector(selectVariableRateInfo);
  const mode = useAppSelector(selectUserInputMode);

  const handleOnModeChange = useCallback(
    (value: 'fixed' | 'variable') => {
      dispatch(
        setUserInputModeAction({
          value,
        }),
      );
      void dispatch(simulateSwapThunk());
    },
    [dispatch],
  );

  return (
    <NotionalSwapUI
      fixedRateInfo={fixedRateInfo}
      loading={isGetInfoPostSwapLoading}
      mode={mode}
      variableRateInfo={variableRateInfo}
      onModeChange={handleOnModeChange}
    />
  );
};
