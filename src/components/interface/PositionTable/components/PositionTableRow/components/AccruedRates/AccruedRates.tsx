import { Typography } from '@components/atomic';
import { formatNumber } from '../../../../../../../utilities';

type AccruedRatesProps = {
  positionType: number;
  avgFixedRate?: number;
  variableRate?: number;
};

const AccruedRates = ({ positionType, avgFixedRate, variableRate }: AccruedRatesProps) => {
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
    <Typography variant="body2" label="Receiving x Paying" sx={{ fontSize: 18 }}>
      {renderValue()}
    </Typography>
  );
};

export default AccruedRates;
