import { formatNumber } from '../../../../../../../utilities/number';
import { Typography } from '../../../../../../atomic/Typography/Typography';

type AccruedRatesProps = {
  positionType: number;
  avgFixedRate?: number;
  variableRate?: number;
};

export const AccruedRates = ({ positionType, avgFixedRate, variableRate }: AccruedRatesProps) => {
  const renderValue = () => {
    if (variableRate && avgFixedRate) {
      if (positionType === 1) {
        return `${formatNumber(avgFixedRate)}% / ${formatNumber(variableRate)}%`;
      } else {
        return `${formatNumber(variableRate)}% / ${formatNumber(avgFixedRate)}%`;
      }
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
