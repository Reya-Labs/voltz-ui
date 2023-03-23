import { LabelTokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import {
  selectNewPositionCompactNotional,
  selectNewPositionReceivingRate,
} from '../../../../../app/features/swap-form';
import { useAppSelector } from '../../../../../app/hooks';
import { formatNumber } from '../../../../../utilities/number';
import { PnLDetails } from './PnLDetails';
import {
  BorderedBox,
  NotionalBox,
  PositionDetailsBox,
  PositionDetailsLeftBox,
  PositionDetailsRightBox,
} from './PositionDetails.styled';

type NewPositionDetailsUIProps = {
  underlyingTokenName: string;
  actionLabelTypographyToken: TypographyToken;
  actionTypographyToken: TypographyToken;
  labelTypographyToken: TypographyToken;
  typographyToken: TypographyToken;
};

export const NewPositionDetailsUI: React.FunctionComponent<NewPositionDetailsUIProps> = ({
  underlyingTokenName,
  actionLabelTypographyToken,
  actionTypographyToken,
  labelTypographyToken,
  typographyToken,
}) => {
  const receivingRate = useAppSelector(selectNewPositionReceivingRate);
  const compactNotional = useAppSelector(selectNewPositionCompactNotional);

  return (
    <PositionDetailsBox>
      <PositionDetailsLeftBox>
        <LabelTokenTypography
          colorToken="wildStrawberry"
          label="Your Position"
          labelColorToken="lavenderWeb"
          labelTypographyToken={actionLabelTypographyToken}
          token=""
          typographyToken={actionTypographyToken}
          value="Liquidity provider"
        />
      </PositionDetailsLeftBox>
      <PositionDetailsRightBox>
        <NotionalBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Notional"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token={compactNotional ? compactNotional.compactNotionalSuffix : ''}
            typographyToken={typographyToken}
            value={compactNotional ? compactNotional.compactNotionalNumber : '--'}
          />
        </NotionalBox>
        <BorderedBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Range"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token="%"
            typographyToken={typographyToken}
            value={receivingRate !== null ? formatNumber(receivingRate) : '--'}
            value2={receivingRate !== null ? formatNumber(receivingRate) : '--'}
          />
        </BorderedBox>
        <BorderedBox>
          <LabelTokenTypography
            colorToken="skyBlueCrayola"
            label="Unrealised PnL"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token=" USDC"
            tooltip={<PnLDetails />}
            typographyToken={typographyToken}
            value="+40.00"
          />
        </BorderedBox>
        <BorderedBox>
          <LabelTokenTypography
            colorToken="wildStrawberry"
            label="Realised PnL"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token=" USDC"
            tooltip={<PnLDetails />}
            typographyToken={typographyToken}
            value="-40.00"
          />
        </BorderedBox>
      </PositionDetailsRightBox>
    </PositionDetailsBox>
  );
};
