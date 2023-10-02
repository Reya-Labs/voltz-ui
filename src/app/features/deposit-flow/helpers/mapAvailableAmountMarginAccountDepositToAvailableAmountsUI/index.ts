import { compactFormatToParts } from '../../../../../utilities/number';
import { AvailableAmountsUI } from '../../../portfolio/types';
import { AvailableAmountForMarginAccountDeposit } from '../../thunks';

export const mapAvailableAmountMarginAccountDepositToAvailableAmountsUI = (
  availableAmount: AvailableAmountForMarginAccountDeposit,
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
