import { CurrencyField, TypographyToken } from 'brokoli-ui';
import React from 'react';

import {
  selectLpFormAMM,
  selectUserInputFixedError,
  selectUserInputFixedLower,
  selectUserInputFixedUpper,
  setUserInputFixedLowerAction,
  setUserInputFixedUpperAction,
} from '../../../../../app/features/lp-form';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useResponsiveQuery } from '../../../../../hooks/useResponsiveQuery';
import { stringToBigFloat } from '../../../../../utilities/number';
import { FixedRangeFieldsBox } from './FixedRangeFields.styled';
type NotionalAmountProps = {};

export const FixedRangeFields: React.FunctionComponent<NotionalAmountProps> = () => {
  const aMM = useAppSelector(selectLpFormAMM);
  const dispatch = useAppDispatch();

  // define state for the inputs -> the below inputs should live in redux
  // because we want to be able to use them in other parts of the ui that depend on this data
  const fixedLower = useAppSelector(selectUserInputFixedLower);
  const fixedUpper = useAppSelector(selectUserInputFixedUpper);
  const fixedError = useAppSelector(selectUserInputFixedError);
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const labelTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodyMediumRegular'
    : 'primaryBodySmallRegular';

  if (!aMM) {
    return null;
  }

  // two fields in a box with a separator in between

  const handleFixedLowerOnChange = (value: string | undefined) => {
    // tell redux -> we have some value for you

    dispatch(
      setUserInputFixedLowerAction({
        value: value !== undefined ? stringToBigFloat(value) : null,
      }),
    );
  };

  const handleFixedUpperOnChange = (value: string | undefined) => {
    // tell redux -> we have some value for you
    dispatch(
      setUserInputFixedUpperAction({
        value: value !== undefined ? stringToBigFloat(value) : null,
      }),
    );
  };

  return (
    <FixedRangeFieldsBox>
      <CurrencyField
        allowNegativeValue={false}
        disabled={false}
        error={Boolean(fixedError)}
        label="Fixed Low"
        labelColorToken="lavenderWeb3"
        labelTypographyToken={labelTypographyToken}
        suffix="%"
        tooltip="TODO: MISSING TOOLTIP"
        tooltipColorToken="lavenderWeb3"
        value={fixedLower}
        onChange={handleFixedLowerOnChange}
      />
      <CurrencyField
        allowNegativeValue={false}
        disabled={false}
        label="Fixed High"
        labelColorToken="lavenderWeb3"
        labelTypographyToken={labelTypographyToken}
        suffix="%"
        tooltip="TODO: MISSING TOOLTIP"
        tooltipColorToken="lavenderWeb3"
        value={fixedUpper}
        onChange={handleFixedUpperOnChange}
      />
    </FixedRangeFieldsBox>
  );
};
