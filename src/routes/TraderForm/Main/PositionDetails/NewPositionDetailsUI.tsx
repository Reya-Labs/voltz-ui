import { LabelTokenTypography } from 'brokoli-ui';
import React from 'react';

import {
  selectMode,
  selectNewPositionCompactNotional,
  selectNewPositionPayingRate,
  selectNewPositionReceivingRate,
} from '../../../../app/features/swap-form';
import { useAppSelector } from '../../../../app/hooks';
import { formatNumber } from '../../../../utilities/number';
import { MODE_COLOR_TOKEN_MAP } from '../../helpers';
import {
  CashFlowBox,
  NotionalBox,
  PayingBox,
  PositionDetailsBox,
  PositionDetailsLeftBox,
  PositionDetailsRightBox,
  ReceivingBox,
} from './PositionDetails.styled';

type NewPositionDetailsUIProps = {
  underlyingTokenName: string;
};

export const NewPositionDetailsUI: React.FunctionComponent<NewPositionDetailsUIProps> = ({
  underlyingTokenName,
}) => {
  const receivingRate = useAppSelector(selectNewPositionReceivingRate);
  const payingRate = useAppSelector(selectNewPositionPayingRate);
  const compactNotional = useAppSelector(selectNewPositionCompactNotional);
  const mode = useAppSelector(selectMode);

  return (
    <PositionDetailsBox>
      <PositionDetailsLeftBox>
        <LabelTokenTypography
          colorToken={MODE_COLOR_TOKEN_MAP[mode]}
          label="New position"
          labelColorToken="lavenderWeb"
          labelTypographyToken="primaryBodyMediumBold"
          token=""
          typographyToken="secondaryBodySmallRegular"
          value={mode === 'fixed' ? 'Fixed Taker' : 'Variable Taker'}
        />
      </PositionDetailsLeftBox>
      <PositionDetailsRightBox>
        <NotionalBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Notional"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            token={compactNotional ? compactNotional.compactNotionalSuffix : ''}
            typographyToken="secondaryBodySmallRegular"
            value={compactNotional ? compactNotional.compactNotionalNumber : '--'}
          />
        </NotionalBox>
        <ReceivingBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Receiving"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            token="%"
            typographyToken="secondaryBodySmallRegular"
            value={receivingRate ? formatNumber(receivingRate) : '--'}
          />
        </ReceivingBox>
        <PayingBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Paying"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            token="%"
            typographyToken="secondaryBodySmallRegular"
            value={payingRate ? formatNumber(payingRate) : '--'}
          />
        </PayingBox>
        <CashFlowBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Cash Flow"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            token={` ${underlyingTokenName.toUpperCase()}`}
            typographyToken="secondaryBodySmallRegular"
            value="0.00" //TODO: Alex maybe it might stay hard-coded (depends on how we implement edit position)
          />
        </CashFlowBox>
      </PositionDetailsRightBox>
    </PositionDetailsBox>
  );
};
