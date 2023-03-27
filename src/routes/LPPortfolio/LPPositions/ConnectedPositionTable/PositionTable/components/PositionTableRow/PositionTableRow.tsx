import { Position } from '@voltz-protocol/v1-sdk';
import React, { useEffect } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import { MaturityInformation } from '../../../../../../../components/composite/MaturityInformation/MaturityInformation';
import { useAMMContext } from '../../../../../../../contexts/AMMContext/AMMContext';
import { generateAmmIdForRoute, generatePoolId } from '../../../../../../../utilities/amm';
import { MATURITY_WINDOW } from '../../../../../../../utilities/constants';
import { isLPExperienceFlowEnabled } from '../../../../../../../utilities/is-lp-experience-flow-enabled';
import { routes } from '../../../../../../paths';
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
  const navigate = useNavigate();

  useEffect(() => {
    callFixedApr();
  }, [callFixedApr]);

  const navigateToLPForm = () => {
    const path = generatePath(routes.LP_FORM, {
      form: 'liquidity',
      ammId: generateAmmIdForRoute(position.amm),
      poolId: generatePoolId(position.amm),
    });
    navigate(`/${path}`);
    return;
  };

  const handleEditMargin = () => {
    if (isLPExperienceFlowEnabled()) {
      navigateToLPForm();
      return;
    }
    onSelect('margin');
  };

  const handleEditLPNotional = () => {
    if (isLPExperienceFlowEnabled()) {
      navigateToLPForm();
      return;
    }
    onSelect('liquidity');
  };

  // Introduced this so margin and notional show the correct underlying token unit e.g. Eth not stEth, USDC not aUSDC
  const underlyingTokenName = position.amm.underlyingToken.name;
  const hideEdit = position.amm.endDateTime.toMillis() <= Date.now().valueOf() + MATURITY_WINDOW;

  return (
    <RowBox>
      <CellBox>
        <Pool
          isAaveV3={position.amm.market.tags.isAaveV3}
          isBorrowing={position.amm.market.tags.isBorrowing}
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
