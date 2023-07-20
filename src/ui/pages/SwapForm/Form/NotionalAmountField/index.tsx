import { TypographyToken } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  getInfoPostSwapThunk,
  resetInfoPostSwapAction,
  selectIsGetInfoPostSwapLoading,
  selectSwapFormAMM,
  selectSwapFormPosition,
  selectUserInputNotionalInfo,
  setNotionalAmountAction,
} from '../../../../../app/features/forms/trader/swap';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useResponsiveQuery } from '../../../../../hooks/useResponsiveQuery';
import { stringToBigFloat } from '../../../../../utilities/number';
import { EditNotionalAmountFieldUI } from './EditNotionalAmountFieldUI';
import { NewNotionalAmountFieldUI } from './NewNotionalAmountFieldUI';

type NotionalAmountProps = {};
export const NotionalAmountField: React.FunctionComponent<NotionalAmountProps> = () => {
  const notionalAmount = useAppSelector(selectUserInputNotionalInfo);
  const isGetInfoPostSwapLoading = useAppSelector(selectIsGetInfoPostSwapLoading);
  const [localEditMode, setLocalEditMode] = useState<'add' | 'remove'>('add');
  const [localNotional, setLocalNotional] = useState<string | null>(
    notionalAmount.value.toString(),
  );
  const [getInfoPostSwapNotional, setGetInfoPostSwapNotional] = useState<string | null>(null);
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const dispatch = useAppDispatch();
  const aMM = useAppSelector(selectSwapFormAMM);
  const position = useAppSelector(selectSwapFormPosition);

  useEffect(() => {
    setLocalNotional(notionalAmount.value.toString());
  }, [notionalAmount.value]);

  const getInfoPostSwap = useCallback(() => {
    setGetInfoPostSwapNotional(localNotional);
    dispatch(resetInfoPostSwapAction());
    void dispatch(getInfoPostSwapThunk());
  }, [localNotional, dispatch]);

  const debouncedSetNotionalAmount = useMemo(
    () =>
      debounce((value: number | null | undefined, editMode: 'add' | 'remove' | undefined) => {
        dispatch(
          setNotionalAmountAction({
            value: value === undefined ? undefined : value ?? 0,
            editMode: editMode,
          }),
        );
      }, 300),
    [dispatch],
  );

  const handleOnNotionalChange = useCallback(
    (value?: string) => {
      const valueAsNumber = value !== undefined && value !== null ? stringToBigFloat(value) : null;
      if (notionalAmount.value === valueAsNumber) {
        return;
      }
      setLocalNotional(value ?? null);
      debouncedSetNotionalAmount(valueAsNumber, undefined);
    },
    [notionalAmount.value, debouncedSetNotionalAmount],
  );

  const handleOnNotionalBlur = useCallback(() => {
    if (
      getInfoPostSwapNotional !== null &&
      localNotional !== null &&
      getInfoPostSwapNotional === localNotional
    ) {
      return;
    }
    getInfoPostSwap();
  }, [getInfoPostSwapNotional, localNotional, getInfoPostSwap]);

  const handleOnSwitchChange = useCallback(
    (value: string) => {
      if (value !== 'add' && value !== 'remove') {
        return;
      }
      if (localEditMode === value) {
        return;
      }

      setLocalEditMode(value);
      debouncedSetNotionalAmount(undefined, value);
      getInfoPostSwap();
    },
    [localEditMode, debouncedSetNotionalAmount, getInfoPostSwap],
  );

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedSetNotionalAmount.cancel();
    };
  }, []);

  if (!aMM) {
    return null;
  }

  const labelTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodyMediumRegular'
    : 'primaryBodySmallRegular';

  const bottomRightTextTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  const bottomLeftTextTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  return !position ? (
    <NewNotionalAmountFieldUI
      bottomLeftTextTypographyToken={bottomLeftTextTypographyToken}
      bottomRightTextTypographyToken={bottomRightTextTypographyToken}
      disabled={isGetInfoPostSwapLoading}
      handleOnNotionalBlur={handleOnNotionalBlur}
      handleOnNotionalChange={handleOnNotionalChange}
      labelTypographyToken={labelTypographyToken}
      localNotional={localNotional}
      underlyingTokenName={aMM.underlyingToken.name}
    />
  ) : (
    <EditNotionalAmountFieldUI
      bottomLeftTextTypographyToken={bottomLeftTextTypographyToken}
      bottomRightTextTypographyToken={bottomRightTextTypographyToken}
      disabled={isGetInfoPostSwapLoading}
      handleOnNotionalBlur={handleOnNotionalBlur}
      handleOnNotionalChange={handleOnNotionalChange}
      handleOnSwitchChange={handleOnSwitchChange}
      labelTypographyToken={labelTypographyToken}
      localEditMode={localEditMode}
      localNotional={localNotional}
      underlyingTokenName={aMM.underlyingToken.name}
    />
  );
};
