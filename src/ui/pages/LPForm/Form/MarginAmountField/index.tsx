import { TypographyToken } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  selectSwapFormAMM,
  selectSwapFormPosition,
  selectUserInputMarginInfo,
  setMarginAmountAction,
} from '../../../../../app/features/lp-form';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useResponsiveQuery } from '../../../../../hooks/useResponsiveQuery';
import { stringToBigFloat } from '../../../../../utilities/number';
import { EditMarginAmountFieldUI } from './EditMarginAmountFieldUI';
import { NewMarginAmountFieldUI } from './NewMarginAmountFieldUI';
type NotionalAmountProps = {};

export const MarginAmountField: React.FunctionComponent<NotionalAmountProps> = () => {
  const dispatch = useAppDispatch();
  const marginAmount = useAppSelector(selectUserInputMarginInfo);
  const position = useAppSelector(selectSwapFormPosition);
  const aMM = useAppSelector(selectSwapFormAMM);

  const [localEditMode, setLocalEditMode] = useState<'add' | 'remove'>('add');
  const [localMargin, setLocalMargin] = useState<string | null>(marginAmount.value.toString());
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const labelTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodyMediumRegular'
    : 'primaryBodySmallRegular';

  const bottomRightTextTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'secondaryBodySmallRegular'
    : 'secondaryBodyXSmallRegular';

  const bottomLeftTextTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  const topRightTextTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'secondaryBodySmallRegular'
    : 'secondaryBodyXSmallRegular';

  useEffect(() => {
    setLocalMargin(marginAmount.value.toString());
  }, [marginAmount.value]);

  const debouncedSetMarginAmount = useMemo(
    () =>
      debounce((value?: number, editMode?: 'add' | 'remove') => {
        dispatch(
          setMarginAmountAction({
            value,
            editMode,
          }),
        );
      }, 300),
    [dispatch],
  );

  const handleOnMarginChange = useCallback(
    (value?: string) => {
      setLocalMargin(value ?? null);

      const valueAsNumber = value !== undefined ? stringToBigFloat(value) : 0;
      debouncedSetMarginAmount(valueAsNumber, undefined);
    },
    [debouncedSetMarginAmount],
  );

  const handleOnSwitchChange = useCallback(
    (value: string) => {
      if (value !== 'add' && value !== 'remove') {
        return;
      }

      setLocalEditMode(value);
      debouncedSetMarginAmount(undefined, value);
    },
    [debouncedSetMarginAmount],
  );

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedSetMarginAmount.cancel();
    };
  }, []);

  if (!aMM) {
    return null;
  }

  return !position ? (
    <NewMarginAmountFieldUI
      bottomLeftTextTypographyToken={bottomLeftTextTypographyToken}
      bottomRightTextTypographyToken={bottomRightTextTypographyToken}
      handleOnMarginChange={handleOnMarginChange}
      labelTypographyToken={labelTypographyToken}
      localMargin={localMargin}
      topRightTextTypographyToken={topRightTextTypographyToken}
      underlyingTokenName={aMM.underlyingToken.name}
    />
  ) : (
    <EditMarginAmountFieldUI
      bottomLeftTextTypographyToken={bottomLeftTextTypographyToken}
      bottomRightTextTypographyToken={bottomRightTextTypographyToken}
      handleOnMarginChange={handleOnMarginChange}
      handleOnSwitchChange={handleOnSwitchChange}
      labelTypographyToken={labelTypographyToken}
      localEditMode={localEditMode}
      localMargin={localMargin}
      topRightTextTypographyToken={topRightTextTypographyToken}
      underlyingTokenName={aMM.underlyingToken.name}
    />
  );
};
