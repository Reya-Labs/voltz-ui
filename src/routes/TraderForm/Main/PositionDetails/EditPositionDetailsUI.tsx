import { FromToTokenTypography, LabelTokenTypography } from 'brokoli-ui';
import React from 'react';

import {
  selectEditPositionCompactNotional,
  selectEditPositionMode,
  selectEditPositionPayingRate,
  selectEditPositionReceivingRate,
  selectExistingPositionCompactNotional,
  selectExistingPositionMode,
  selectExistingPositionPayingRate,
  selectExistingPositionReceivingRate,
  selectSwapFormPosition,
} from '../../../../app/features/swap-form';
import { useAppSelector } from '../../../../app/hooks';
import { formatNumber } from '../../../../utilities/number';
import { MODE_COLOR_TOKEN_MAP, MODE_TEXT_MAP } from '../../helpers';
import {
  CashFlowBox,
  NotionalBox,
  PayingBox,
  PositionDetailsBox,
  PositionDetailsLeftBox,
  PositionDetailsRightBox,
  ReceivingBox,
} from './PositionDetails.styled';

type EditPositionDetailsUIProps = {
  underlyingTokenName: string;
};

export const EditPositionDetailsUI: React.FunctionComponent<EditPositionDetailsUIProps> = ({
  underlyingTokenName,
}) => {
  const existingPositionMode = useAppSelector(selectExistingPositionMode);
  const existingPositionReceivingRate = useAppSelector(selectExistingPositionReceivingRate);
  const existingPositionPayingRate = useAppSelector(selectExistingPositionPayingRate);
  const existingPositionCompactNotional = useAppSelector(selectExistingPositionCompactNotional);

  const editPositionMode = useAppSelector(selectEditPositionMode);
  const editPositionReceivingRate = useAppSelector(selectEditPositionReceivingRate);
  const editPositionPayingRate = useAppSelector(selectEditPositionPayingRate);
  const editPositionCompactNotional = useAppSelector(selectEditPositionCompactNotional);

  const existingPosition = useAppSelector(selectSwapFormPosition);
  if (!existingPosition) {
    return null;
  }

  const sameMode = !existingPositionMode || existingPositionMode === editPositionMode;
  const sameNotional =
    !existingPositionCompactNotional ||
    (existingPositionCompactNotional.compactNotionalNumber ===
      editPositionCompactNotional.compactNotionalNumber &&
      existingPositionCompactNotional.compactNotionalSuffix ===
        editPositionCompactNotional.compactNotionalSuffix);
  const sameReceivingRate =
    !existingPositionReceivingRate || existingPositionReceivingRate === editPositionReceivingRate;
  const samePayingRate =
    !existingPositionPayingRate || existingPositionPayingRate === editPositionPayingRate;

  return (
    <PositionDetailsBox>
      <PositionDetailsLeftBox>
        {sameMode ? (
          <LabelTokenTypography
            colorToken={MODE_COLOR_TOKEN_MAP[editPositionMode]}
            label="Editing Position"
            labelColorToken="lavenderWeb"
            labelTypographyToken="primaryBodyMediumBold"
            token=""
            typographyToken="secondaryBodySmallRegular"
            value={MODE_TEXT_MAP[editPositionMode]}
          />
        ) : (
          <FromToTokenTypography
            fromColorToken={MODE_COLOR_TOKEN_MAP[existingPositionMode]}
            fromValue={MODE_TEXT_MAP[existingPositionMode]}
            label="Editing Position"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            toColorToken={MODE_COLOR_TOKEN_MAP[editPositionMode]}
            toValue={MODE_TEXT_MAP[editPositionMode]}
            typographyToken="secondaryBodySmallRegular"
          />
        )}
      </PositionDetailsLeftBox>
      <PositionDetailsRightBox>
        <NotionalBox>
          {sameNotional ? (
            <LabelTokenTypography
              colorToken="lavenderWeb"
              label="Notional"
              labelColorToken="lavenderWeb3"
              labelTypographyToken="primaryBodyXSmallRegular"
              token={editPositionCompactNotional.compactNotionalSuffix}
              typographyToken="secondaryBodySmallRegular"
              value={editPositionCompactNotional.compactNotionalNumber}
            />
          ) : (
            <FromToTokenTypography
              fromColorToken="lavenderWeb"
              fromToken={existingPositionCompactNotional.compactNotionalSuffix}
              fromValue={existingPositionCompactNotional.compactNotionalNumber}
              label="Notional"
              labelColorToken="lavenderWeb3"
              labelTypographyToken="primaryBodyXSmallRegular"
              toColorToken="lavenderWeb"
              toToken={editPositionCompactNotional.compactNotionalSuffix}
              toValue={editPositionCompactNotional.compactNotionalNumber}
              typographyToken="secondaryBodySmallRegular"
            />
          )}
        </NotionalBox>
        <ReceivingBox>
          {sameReceivingRate ? (
            <LabelTokenTypography
              colorToken="lavenderWeb"
              label="Receiving"
              labelColorToken="lavenderWeb3"
              labelTypographyToken="primaryBodyXSmallRegular"
              token="%"
              typographyToken="secondaryBodySmallRegular"
              value={editPositionReceivingRate ? formatNumber(editPositionReceivingRate) : '--'}
            />
          ) : (
            <FromToTokenTypography
              fromColorToken="lavenderWeb"
              fromToken="%"
              fromValue={
                existingPositionReceivingRate ? formatNumber(existingPositionReceivingRate) : '--'
              }
              label="Receiving"
              labelColorToken="lavenderWeb3"
              labelTypographyToken="primaryBodyXSmallRegular"
              toColorToken="lavenderWeb"
              toToken="%"
              toValue={editPositionReceivingRate ? formatNumber(editPositionReceivingRate) : '--'}
              typographyToken="secondaryBodySmallRegular"
            />
          )}
        </ReceivingBox>
        <PayingBox>
          {samePayingRate ? (
            <LabelTokenTypography
              colorToken="lavenderWeb"
              label="Paying"
              labelColorToken="lavenderWeb3"
              labelTypographyToken="primaryBodyXSmallRegular"
              token="%"
              typographyToken="secondaryBodySmallRegular"
              value={editPositionPayingRate ? formatNumber(editPositionPayingRate) : '--'}
            />
          ) : (
            <FromToTokenTypography
              fromColorToken="lavenderWeb"
              fromToken="%"
              fromValue={
                existingPositionPayingRate ? formatNumber(existingPositionPayingRate) : '--'
              }
              label="Paying"
              labelColorToken="lavenderWeb3"
              labelTypographyToken="primaryBodyXSmallRegular"
              toColorToken="lavenderWeb"
              toToken="%"
              toValue={editPositionPayingRate ? formatNumber(editPositionPayingRate) : '--'}
              typographyToken="secondaryBodySmallRegular"
            />
          )}
        </PayingBox>
        <CashFlowBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Cash Flow"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            token={` ${underlyingTokenName.toUpperCase()}`}
            typographyToken="secondaryBodySmallRegular"
            value={formatNumber(existingPosition.accruedCashflow)}
          />
        </CashFlowBox>
      </PositionDetailsRightBox>
    </PositionDetailsBox>
  );
};
