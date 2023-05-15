import { TypographyToken } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  selectRolloverLpFormAMM,
  selectUserInputMarginInfo,
  setMarginAmountAction,
} from '../../../../../app/features/forms/rollover-lp-form';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useResponsiveQuery } from '../../../../../hooks/useResponsiveQuery';
import { stringToBigFloat } from '../../../../../utilities/number';
import { NewMarginAmountFieldUI } from './NewMarginAmountFieldUI';
type NotionalAmountProps = {};

export const MarginAmountField: React.FunctionComponent<NotionalAmountProps> = () => {
  const dispatch = useAppDispatch();
  const marginAmount = useAppSelector(selectUserInputMarginInfo);
  const aMM = useAppSelector(selectRolloverLpFormAMM);

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
      debounce((value?: number) => {
        dispatch(
          setMarginAmountAction({
            value,
          }),
        );
      }, 300),
    [dispatch],
  );

  const handleOnMarginChange = useCallback(
    (value?: string) => {
      setLocalMargin(value ?? null);

      const valueAsNumber = value !== undefined ? stringToBigFloat(value) : 0;
      debouncedSetMarginAmount(valueAsNumber);
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

  return (
    <NewMarginAmountFieldUI
      bottomLeftTextTypographyToken={bottomLeftTextTypographyToken}
      bottomRightTextTypographyToken={bottomRightTextTypographyToken}
      handleOnMarginChange={handleOnMarginChange}
      labelTypographyToken={labelTypographyToken}
      localMargin={localMargin}
      topRightTextTypographyToken={topRightTextTypographyToken}
      underlyingTokenName={aMM.underlyingToken.name}
    />
  );
};
