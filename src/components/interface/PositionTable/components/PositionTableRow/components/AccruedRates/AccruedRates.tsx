import { Position, PositionInfo } from '@voltz-protocol/v1-sdk';
import { Typography } from '@components/atomic';
import { formatNumber } from '@utilities';

type AccruedRatesProps = {
  position: Position;
  positionInfo?: PositionInfo;
}

const AccruedRates = ({ position, positionInfo }: AccruedRatesProps) => {
  const renderValue = () => {  
    if (positionInfo?.variableRateSinceLastSwap && positionInfo?.fixedRateSinceLastSwap) {
      if (position.positionType === 1) {
        return `${formatNumber(positionInfo?.fixedRateSinceLastSwap)}% / ${formatNumber(positionInfo?.variableRateSinceLastSwap)}%`;
      }
      else {
        return `${formatNumber(positionInfo?.variableRateSinceLastSwap)}% / ${formatNumber(positionInfo?.fixedRateSinceLastSwap)}%`;
      }
    }
    else {
      return `- / -`;
    }
  }

  return (
    <Typography variant="body2" label='Receiving x Paying' sx={{ fontSize: 18 }}>
      {renderValue()}
    </Typography>
  );
}

export default AccruedRates;













