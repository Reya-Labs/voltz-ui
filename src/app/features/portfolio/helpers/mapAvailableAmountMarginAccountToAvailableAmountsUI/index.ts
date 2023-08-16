import { compactFormatToParts } from '../../../../../utilities/number';
import { AvailableAmountForMarginAccount } from '../../thunks';
import { AvailableAmountsUI } from '../../types';

export const mapAvailableAmountMarginAccountToAvailableAmountsUI = (
  availableAmount: AvailableAmountForMarginAccount,
): AvailableAmountsUI => {
  const formatted = compactFormatToParts(availableAmount.value, 2, 2);

  return {
    token: availableAmount.token,
    value: availableAmount.value,
    valueUSD: availableAmount.valueUSD,
    valueSuffix: formatted.compactSuffix,
    valueFormatted: formatted.compactNumber.toString(),
  };
};
