import { LabelTokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../app';
import {
  selectNewPositionCompactNotional,
  selectNewPositionPayingRate,
  selectNewPositionReceivingRate,
  selectProspectiveSwapMode,
} from '../../../../../app/features/forms/trader/rollover-swap';
import { formatNumber } from '../../../../../utilities/number';
import { MODE_TEXT_MAP } from '../../../Deprecated/SwapForm/helpers';
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
  const payingRate = useAppSelector(selectNewPositionPayingRate);
  const compactNotional = useAppSelector(selectNewPositionCompactNotional);
  const mode = useAppSelector(selectProspectiveSwapMode);

  return (
    <PositionDetailsBox>
      <PositionDetailsLeftBox>
        <LabelTokenTypography
          colorToken={MODE_COLOR_TOKEN_MAP[mode]}
          label="New Position"
          labelColorToken="white100"
          labelTypographyToken={actionLabelTypographyToken}
          token=""
          typographyToken={actionTypographyToken}
          value={MODE_TEXT_MAP[mode]}
        />
      </PositionDetailsLeftBox>
      <PositionDetailsRightBox>
        <NotionalBox>
          <LabelTokenTypography
            colorToken="white"
            label="Notional"
            labelColorToken="white400"
            labelTypographyToken={labelTypographyToken}
            token={
              compactNotional
                ? `${compactNotional.compactNotionalSuffix} ${underlyingTokenName.toUpperCase()}`
                : ` ${underlyingTokenName.toUpperCase()}`
            }
            typographyToken={typographyToken}
            value={compactNotional ? compactNotional.compactNotionalNumber : '--'}
          />
        </NotionalBox>
        <ReceivingBox>
          <LabelTokenTypography
            colorToken="white"
            label="Receiving"
            labelColorToken="white400"
            labelTypographyToken={labelTypographyToken}
            token="%"
            typographyToken={typographyToken}
            value={receivingRate !== null ? formatNumber(receivingRate) : '--'}
          />
        </ReceivingBox>
        <PayingBox>
          <LabelTokenTypography
            colorToken="white"
            label="Paying"
            labelColorToken="white400"
            labelTypographyToken={labelTypographyToken}
            token="%"
            typographyToken={typographyToken}
            value={payingRate !== null ? formatNumber(payingRate) : '--'}
          />
        </PayingBox>
        <CashFlowBox>
          <LabelTokenTypography
            colorToken="white"
            label="Cash Flow"
            labelColorToken="white400"
            labelTypographyToken={labelTypographyToken}
            token={` ${underlyingTokenName.toUpperCase()}`}
            typographyToken={typographyToken}
            value="0.00"
          />
        </CashFlowBox>
      </PositionDetailsRightBox>
    </PositionDetailsBox>
  );
};
