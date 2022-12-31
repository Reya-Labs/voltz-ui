import { formatNumber } from '../../../../../../../utilities/number';
import { Typography } from '../../../../../../atomic/Typography/Typography';

type AccruedRatesProps = {
  receivingRate: number;
  payingRate: number;
};

export const AccruedRates = ({ receivingRate, payingRate }: AccruedRatesProps) => {
  const renderValue = () => {
    if (receivingRate && payingRate) {
      return `${formatNumber(receivingRate)}% / ${formatNumber(payingRate)}%`;
    } else {
      return `- / -`;
    }
  };

  return (
    <Typography label="Receiving x Paying" sx={{ fontSize: 18 }} variant="body2">
      {renderValue()}
    </Typography>
  );
};
