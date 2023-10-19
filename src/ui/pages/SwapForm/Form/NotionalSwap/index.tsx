import React, { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../app';
import {
  getMaxNotionalAvailableThunk,
  selectIsGetInfoPostSwapLoading,
  selectPayFixedRateInfo,
  selectReceiveFixedRateInfo,
  selectUserInputMode,
  selectVariableRateInfo,
  setUserInputModeAction,
  simulateSwapThunk,
} from '../../../../../app/features/forms/trader/swap';
import { NotionalSwapHorizontalUI } from '../../../../components/NotionalSwapHorizontalUI';

export const NotionalSwap: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const isGetInfoPostSwapLoading = useAppSelector(selectIsGetInfoPostSwapLoading);

  const receiveFixedRateInfo = useAppSelector(selectReceiveFixedRateInfo);
  const variableRateInfo = useAppSelector(selectVariableRateInfo);
  const payFixedRateInfo = useAppSelector(selectPayFixedRateInfo);
  const mode = useAppSelector(selectUserInputMode);

  const handleOnModeChange = useCallback(
    (value: 'fixed' | 'variable') => {
      dispatch(
        setUserInputModeAction({
          value,
        }),
      );
      void dispatch(simulateSwapThunk({}));
    },
    [dispatch],
  );

  useEffect(() => {
    void dispatch(
      getMaxNotionalAvailableThunk({
        mode,
      }),
    );
  }, [dispatch, mode]);

  return (
    <NotionalSwapHorizontalUI
      loading={isGetInfoPostSwapLoading}
      mode={mode}
      payFixedRateInfo={payFixedRateInfo}
      receiveFixedRateInfo={receiveFixedRateInfo}
      variableRateInfo={variableRateInfo}
      onModeChange={handleOnModeChange}
    />
  );
};
