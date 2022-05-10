import { Position, PositionInfo } from '@voltz-protocol/v1-sdk';
import { Typography } from '@components/atomic';

type AccruedRatesProps = {
  position: Position;
  positionInfo?: PositionInfo;
}

const AccruedRates = ({ position, positionInfo }: AccruedRatesProps) => {
  const renderValue = () => {  
    if (positionInfo?.variableRateSinceLastSwap && positionInfo?.fixedRateSinceLastSwap) {
      if (position.positionType === 1) {
        return `${positionInfo?.fixedRateSinceLastSwap.toFixed(2)}% / ${positionInfo?.variableRateSinceLastSwap.toFixed(2)}%`;
      }
      else {
        return `${positionInfo?.variableRateSinceLastSwap.toFixed(2)}% / ${positionInfo?.fixedRateSinceLastSwap.toFixed(2)}%`;
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













