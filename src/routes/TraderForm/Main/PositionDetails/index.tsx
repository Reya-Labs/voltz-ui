import { LabelTokenTypography } from 'brokoli-ui';
import React from 'react';

import { selectMode } from '../../../../app/features/swap-form';
import { useAppSelector } from '../../../../app/hooks';
import {
  CashFlowBox,
  NotionalBox,
  PayingBox,
  PositionDetailsBox,
  PositionDetailsLeftBox,
  PositionDetailsRightBox,
  ReceivingBox,
} from './PositionDetails.styled';

type PositionDetailsProps = {};

export const PositionDetails: React.FunctionComponent<PositionDetailsProps> = () => {
  const mode = useAppSelector(selectMode);

  return (
    <PositionDetailsBox>
      <PositionDetailsLeftBox>
        <LabelTokenTypography
          colorToken={mode === 'fixed' ? 'skyBlueCrayola' : 'ultramarineBlue'}
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
            token="k"
            typographyToken="secondaryBodySmallRegular"
            value="0.00"
          />
        </NotionalBox>
        <PayingBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Paying"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            token="%"
            typographyToken="secondaryBodySmallRegular"
            value="--"
          />
        </PayingBox>
        <ReceivingBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Receiving"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            token="%"
            typographyToken="secondaryBodySmallRegular"
            value="--"
          />
        </ReceivingBox>
        <CashFlowBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Cash Flow"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            token=" USDC"
            typographyToken="secondaryBodySmallRegular"
            value="0.00"
          />
        </CashFlowBox>
      </PositionDetailsRightBox>
    </PositionDetailsBox>
  );
};
