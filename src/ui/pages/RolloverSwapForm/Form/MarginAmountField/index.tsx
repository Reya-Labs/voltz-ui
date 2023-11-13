import { TypographyToken } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../app';
import {
  selectRolloverSwapFormAMM,
  selectUserInputMarginInfo,
  setMarginAmountAction,
} from '../../../../../app/features/forms/trader/rollover-swap';
import { stringToBigFloat } from '../../../../../utilities/number';
import { NewMarginAmountFieldUI } from './NewMarginAmountFieldUI';
type NotionalAmountProps = {};

export const MarginAmountField: React.FunctionComponent<NotionalAmountProps> = () => {
  const dispatch = useAppDispatch();
  const marginAmount = useAppSelector(selectUserInputMarginInfo);
  const aMM = useAppSelector(selectRolloverSwapFormAMM);

  const [localMargin, setLocalMargin] = useState<string | null>(marginAmount.value.toString());

  const labelTypographyToken: TypographyToken = 'primaryBodySmallRegular';
  const bottomRightTextTypographyToken: TypographyToken = 'secondaryBodyXSmallRegular';
  const bottomLeftTextTypographyToken: TypographyToken = 'primaryBodyXSmallRegular';
  const topRightTextTypographyToken: TypographyToken = 'secondaryBodyXSmallRegular';

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
