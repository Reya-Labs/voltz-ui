import { CurrencyField, TypographyToken } from 'brokoli-ui';
import React, { useState } from 'react';

import { selectSwapFormAMM } from '../../../../../app/features/swap-form';
import { useAppSelector } from '../../../../../app/hooks';
import { useResponsiveQuery } from '../../../../../hooks/useResponsiveQuery';
import { FixedRangeFieldsBox } from './FixedRangeFields.styled';
type NotionalAmountProps = {};

export const FixedRangeFields: React.FunctionComponent<NotionalAmountProps> = () => {
  const aMM = useAppSelector(selectSwapFormAMM);

  const [localFixedLow, setLocalFixedLow] = useState<string | undefined>('');
  const [localFixedHigh, setLocalFixedHigh] = useState<string | undefined>('');
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const labelTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodyMediumRegular'
    : 'primaryBodySmallRegular';

  if (!aMM) {
    return null;
  }

  return (
    <FixedRangeFieldsBox>
      <CurrencyField
        allowNegativeValue={false}
        disabled={false}
        label="Fixed Low"
        labelColorToken="lavenderWeb3"
        labelTypographyToken={labelTypographyToken}
        suffix="%"
        tooltip="TODO: MISSING TOOLTIP"
        tooltipColorToken="lavenderWeb3"
        value={localFixedLow}
        onChange={setLocalFixedLow}
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
        value={localFixedHigh}
        onChange={setLocalFixedHigh}
      />
    </FixedRangeFieldsBox>
  );
};
