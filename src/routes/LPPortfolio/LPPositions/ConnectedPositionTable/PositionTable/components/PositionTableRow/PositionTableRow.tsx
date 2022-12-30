import { Position } from '@voltz-protocol/v1-sdk';
import React, { useEffect } from 'react';

import { MaturityInformation } from '../../../../../../../components/composite/MaturityInformation/MaturityInformation';
import { useAMMContext } from '../../../../../../../contexts/AMMContext/AMMContext';
import { MATURITY_WINDOW } from '../../../../../../../utilities/constants';
import { isBorrowing } from '../../../../../../../utilities/isBorrowing';
import { AccruedRates } from './components/AccruedRates/AccruedRates';
import { Margin } from './components/Margin/Margin';
import { Notional } from './components/Notional/Notional';
import { Pool } from './components/Pool/Pool';
import { CellBox, MaturityLabelTypography, RowBox } from './PositionTableRow.styled';

export type PositionTableRowProps = {
  position: Position;
  onSelect: (mode: 'margin' | 'liquidity' | 'notional') => void;
};

export const PositionTableRow: React.FunctionComponent<PositionTableRowProps> = ({
  position,
  onSelect,
}) => {
  const { fixedApr } = useAMMContext();
  const { call: callFixedApr } = fixedApr;

  useEffect(() => {
    callFixedApr();
  }, [callFixedApr]);

  const handleEditMargin = () => {
    onSelect('margin');
  };

  const handleEditLPNotional = () => {
    onSelect('liquidity');
  };

  // Introduced this so margin and notional show the correct underlying token unit e.g. Eth not stEth, USDC not aUSDC
  const underlyingTokenName = position.amm.underlyingToken.name;
  const hideEdit = position.amm.endDateTime.toMillis() <= Date.now().valueOf() + MATURITY_WINDOW;

  return (
    <RowBox>
      <CellBox>
        <Pool
          isBorrowing={isBorrowing(position.amm.rateOracle.protocolId)}
          protocol={position.amm.protocol}
        />
      </CellBox>
      <CellBox>
        <Notional
          hideEdit={hideEdit}
          notional={position.notional}
          token={underlyingTokenName || ''}
          onEdit={handleEditLPNotional}
        />
      </CellBox>
      <CellBox>
        <Margin
          accruedCashflow={undefined}
          hideEdit={hideEdit}
          isSettled={position.isSettled}
          margin={position.margin}
          token={underlyingTokenName || ''}
          onSelect={handleEditMargin}
        />
      </CellBox>
      <CellBox>
        <AccruedRates
          fixedRateLower={position.fixedRateLower.toNumber()}
          fixedRateUpper={position.fixedRateUpper.toNumber()}
        />
      </CellBox>
      <CellBox>
        <MaturityLabelTypography>MATURITY</MaturityLabelTypography>
        <MaturityInformation
          endDate={position.amm.endDateTime}
          startDate={position.amm.startDateTime}
        />
      </CellBox>
    </RowBox>
  );
};
