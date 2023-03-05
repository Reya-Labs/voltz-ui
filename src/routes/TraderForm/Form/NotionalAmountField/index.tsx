import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  getInfoPostSwapThunk,
  selectSwapFormAMM,
  selectSwapFormPosition,
  selectUserInputNotionalInfo,
  setNotionalAmountAction,
} from '../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { stringToBigFloat } from '../../../../utilities/number';
import { EditNotionalAmountFieldUI } from './EditNotionalAmountFieldUI';
import { NewNotionalAmountFieldUI } from './NewNotionalAmountFieldUI';

type NotionalAmountProps = {};
export const NotionalAmountField: React.FunctionComponent<NotionalAmountProps> = () => {
  const notionalAmount = useAppSelector(selectUserInputNotionalInfo);
  const [localEditMode, setLocalEditMode] = useState<'add' | 'remove'>('add');
  const [localNotional, setLocalNotional] = useState<number | null>(notionalAmount.value);

  const dispatch = useAppDispatch();
  const aMM = useAppSelector(selectSwapFormAMM);
  const position = useAppSelector(selectSwapFormPosition);

  useEffect(() => {
    setLocalNotional(notionalAmount.value);
  }, [notionalAmount.value]);

  const debouncedGetInfoPostSwap = useMemo(
    () =>
      debounce((value: number | null, editMode: 'add' | 'remove') => {
        dispatch(
          setNotionalAmountAction({
            value: value,
            editMode: editMode,
          }),
        );
        void dispatch(getInfoPostSwapThunk());
      }, 300),
    [dispatch],
  );

  const handleOnNotionalChange = useCallback(
    (value?: string) => {
      const valueAsNumber = value !== undefined ? stringToBigFloat(value) : null;
      setLocalNotional(valueAsNumber);
      debouncedGetInfoPostSwap(valueAsNumber, localEditMode);
    },
    [debouncedGetInfoPostSwap, localEditMode],
  );

  const handleOnSwitchChange = useCallback(
    (value: string) => {
      if (value !== 'add' && value !== 'remove') {
        return;
      }

      setLocalEditMode(value);
      debouncedGetInfoPostSwap(localNotional, value);
    },
    [debouncedGetInfoPostSwap, localNotional],
  );

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedGetInfoPostSwap.cancel();
    };
  }, []);

  if (!aMM) {
    return null;
  }

  return !position ? (
    <NewNotionalAmountFieldUI
      handleOnNotionalChange={handleOnNotionalChange}
      localNotional={localNotional}
      underlyingTokenName={aMM.underlyingToken.name}
    />
  ) : (
    <EditNotionalAmountFieldUI
      handleOnNotionalChange={handleOnNotionalChange}
      handleOnSwitchChange={handleOnSwitchChange}
      localEditMode={localEditMode}
      localNotional={localNotional}
      position={position}
      underlyingTokenName={aMM.underlyingToken.name}
    />
  );
};
