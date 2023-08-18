import { compactFormatToParts } from '../../../../../utilities/number';
import {
  AvailableAmountForMarginAccountWithdraw,
} from '../../thunks';
import { AvailableAmountsUI } from '../../types';

export const mapAvailableAmountMarginAccountWithdrawToAvailableAmountsUI = (
  availableAmount: AvailableAmountForMarginAccountWithdraw,
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
