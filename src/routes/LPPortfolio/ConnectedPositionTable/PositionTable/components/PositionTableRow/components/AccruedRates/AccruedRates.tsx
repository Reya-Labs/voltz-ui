import { formatNumber } from '../../../../../../../../utilities/number';
import {
  AccruedRatesBox,
  AccruedRatesLabelTypography,
  AccruedRatesValueTypography,
} from './AccruedRates.styled';

type AccruedRatesProps = {
  fixedRateUpper?: number;
  fixedRateLower?: number;
};

export const AccruedRates = ({ fixedRateUpper, fixedRateLower }: AccruedRatesProps) => {
  const renderValue = () => {
    if (fixedRateLower && fixedRateUpper) {
      return `${formatNumber(fixedRateLower)}% / ${formatNumber(fixedRateUpper)}%`;
    } else {
      return `- / -`;
    }
  };

  return (
    <AccruedRatesBox>
      <AccruedRatesLabelTypography>Receiving / Paying</AccruedRatesLabelTypography>
      <AccruedRatesValueTypography>{renderValue()}</AccruedRatesValueTypography>
    </AccruedRatesBox>
  );
};
