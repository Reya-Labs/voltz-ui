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
  const [localNotional, setLocalNotional] = useState<string | null>(
    notionalAmount.value.toString(),
  );

  const dispatch = useAppDispatch();
  const aMM = useAppSelector(selectSwapFormAMM);
  const position = useAppSelector(selectSwapFormPosition);

  useEffect(() => {
    setLocalNotional(notionalAmount.value.toString());
  }, [notionalAmount.value]);

  const debouncedGetInfoPostSwap = useMemo(
    () =>
      debounce((value: number | null | undefined, editMode: 'add' | 'remove' | undefined) => {
        dispatch(
          setNotionalAmountAction({
            value: value === undefined ? undefined : value ?? 0,
            editMode: editMode,
          }),
        );
        void dispatch(getInfoPostSwapThunk());
      }, 300),
    [dispatch],
  );

  const handleOnNotionalChange = useCallback(
    (value?: string) => {
      setLocalNotional(value ?? null);

      const valueAsNumber = value !== undefined ? stringToBigFloat(value) : null;
      debouncedGetInfoPostSwap(valueAsNumber, undefined);
    },
    [debouncedGetInfoPostSwap],
  );

  const handleOnSwitchChange = useCallback(
    (value: string) => {
      if (value !== 'add' && value !== 'remove') {
        return;
      }

      setLocalEditMode(value);
      debouncedGetInfoPostSwap(undefined, value);
    },
    [debouncedGetInfoPostSwap],
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
