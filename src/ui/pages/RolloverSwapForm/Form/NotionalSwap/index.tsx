import React from 'react';

import {
  getInfoPostSwapThunk,
  selectFixedRateInfo,
  selectIsGetInfoPostSwapLoading,
  selectUserInputMode,
  selectVariableRateInfo,
  setUserInputModeAction,
} from '../../../../../app/features/forms/trader/rollover-swap';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { NotionalSwapUI } from '../../../../components/NotionalSwapUI';

export const NotionalSwap: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const isGetInfoPostSwapLoading = useAppSelector(selectIsGetInfoPostSwapLoading);

  const fixedRateInfo = useAppSelector(selectFixedRateInfo);
  const variableRateInfo = useAppSelector(selectVariableRateInfo);
  const mode = useAppSelector(selectUserInputMode);

  const handleOnModeChange = (value: 'fixed' | 'variable') => {
    dispatch(
      setUserInputModeAction({
        value,
      }),
    );
    void dispatch(getInfoPostSwapThunk());
  };

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
