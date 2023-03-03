import { LabelTokenTypography } from 'brokoli-ui';
import React from 'react';

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
  mode: 'fixed' | 'variable';
  compactNotionalSuffix: string;
  compactNotionalNumber: string;
  receivingRate: string;
  payingRate: string;
  underlyingTokenName: string;
};
export const NewPositionDetailsUI: React.FunctionComponent<NewPositionDetailsUIProps> = ({
  mode,
  underlyingTokenName,
  receivingRate,
  compactNotionalSuffix,
  payingRate,
  compactNotionalNumber,
}) => (
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
          token={compactNotionalSuffix}
          typographyToken="secondaryBodySmallRegular"
          value={compactNotionalNumber}
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
          value={receivingRate}
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
          value={payingRate}
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
