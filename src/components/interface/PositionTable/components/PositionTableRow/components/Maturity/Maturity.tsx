import { Position } from '@voltz-protocol/v1-sdk';
import { MaturityInformation } from '@components/composite';

type MaturityProps = {
  position: Position;
};

const Maturity = ({ position }: MaturityProps) => {
  return (
    <MaturityInformation
      label="Maturity"
      startDate={position.amm.startDateTime}
      endDate={position.amm.endDateTime}
    />
  );
};

export default Maturity;
