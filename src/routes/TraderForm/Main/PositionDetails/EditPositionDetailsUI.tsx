import { FromToTokenTypography, LabelTokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import {
  selectAccruedCashflowEditPositionFormatted,
  selectAccruedCashflowExistingPositionFormatted,
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
  actionLabelTypographyToken: TypographyToken;
  actionTypographyToken: TypographyToken;
  labelTypographyToken: TypographyToken;
  typographyToken: TypographyToken;
};

export const EditPositionDetailsUI: React.FunctionComponent<EditPositionDetailsUIProps> = ({
  underlyingTokenName,
  actionTypographyToken,
  actionLabelTypographyToken,
  labelTypographyToken,
  typographyToken,
}) => {
  const existingPositionMode = useAppSelector(selectExistingPositionMode);
  const existingPositionReceivingRate = useAppSelector(selectExistingPositionReceivingRate);
  const existingPositionPayingRate = useAppSelector(selectExistingPositionPayingRate);
  const existingPositionCompactNotional = useAppSelector(selectExistingPositionCompactNotional);

  const editPositionMode = useAppSelector(selectEditPositionMode);
  const editPositionReceivingRate = useAppSelector(selectEditPositionReceivingRate);
  const editPositionPayingRate = useAppSelector(selectEditPositionPayingRate);
  const editPositionCompactNotional = useAppSelector(selectEditPositionCompactNotional);

  const accruedCashflowFrom = useAppSelector(selectAccruedCashflowExistingPositionFormatted);
  const accruedCashflowTo = useAppSelector(selectAccruedCashflowEditPositionFormatted);

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

  const receivingRateFrom =
    existingPositionReceivingRate !== null ? formatNumber(existingPositionReceivingRate) : '--';
  const receivingRateTo =
    editPositionReceivingRate !== null ? formatNumber(editPositionReceivingRate) : '--';

  const payingRateFrom =
    existingPositionPayingRate !== null ? formatNumber(existingPositionPayingRate) : '--';
  const payingRateTo =
    editPositionPayingRate !== null ? formatNumber(editPositionPayingRate) : '--';

  return (
    <PositionDetailsBox>
      <PositionDetailsLeftBox>
        {sameMode ? (
          <LabelTokenTypography
            colorToken={MODE_COLOR_TOKEN_MAP[editPositionMode]}
            label="Editing Position"
            labelColorToken="lavenderWeb"
            labelTypographyToken={actionLabelTypographyToken}
            token=""
            typographyToken={actionTypographyToken}
            value={MODE_TEXT_MAP[editPositionMode]}
          />
        ) : (
          <FromToTokenTypography
            fromColorToken={MODE_COLOR_TOKEN_MAP[existingPositionMode]}
            fromValue={MODE_TEXT_MAP[existingPositionMode]}
            label="Editing Position"
            labelColorToken="lavenderWeb"
            labelTypographyToken={actionLabelTypographyToken}
            toColorToken={MODE_COLOR_TOKEN_MAP[editPositionMode]}
            toValue={MODE_TEXT_MAP[editPositionMode]}
            typographyToken={actionTypographyToken}
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
              labelTypographyToken={labelTypographyToken}
              token={editPositionCompactNotional.compactNotionalSuffix}
              typographyToken={typographyToken}
              value={editPositionCompactNotional.compactNotionalNumber}
            />
          ) : (
            <FromToTokenTypography
              fromColorToken="lavenderWeb"
              fromToken={existingPositionCompactNotional.compactNotionalSuffix}
              fromValue={existingPositionCompactNotional.compactNotionalNumber}
              label="Notional"
              labelColorToken="lavenderWeb3"
              labelTypographyToken={labelTypographyToken}
              toColorToken="lavenderWeb"
              toToken={editPositionCompactNotional.compactNotionalSuffix}
              toValue={editPositionCompactNotional.compactNotionalNumber}
              typographyToken={typographyToken}
            />
          )}
        </NotionalBox>
        <ReceivingBox>
          {receivingRateFrom === receivingRateTo ? (
            <LabelTokenTypography
              colorToken="lavenderWeb"
              label="Receiving"
              labelColorToken="lavenderWeb3"
              labelTypographyToken={labelTypographyToken}
              token="%"
              typographyToken={typographyToken}
              value={receivingRateTo}
            />
          ) : (
            <FromToTokenTypography
              fromColorToken="lavenderWeb"
              fromToken="%"
              fromValue={receivingRateFrom}
              label="Receiving"
              labelColorToken="lavenderWeb3"
              labelTypographyToken={labelTypographyToken}
              toColorToken="lavenderWeb"
              toToken="%"
              toValue={receivingRateTo}
              typographyToken={typographyToken}
            />
          )}
        </ReceivingBox>
        <PayingBox>
          {payingRateFrom === payingRateTo ? (
            <LabelTokenTypography
              colorToken="lavenderWeb"
              label="Paying"
              labelColorToken="lavenderWeb3"
              labelTypographyToken={labelTypographyToken}
              token="%"
              typographyToken={typographyToken}
              value={payingRateTo}
            />
          ) : (
            <FromToTokenTypography
              fromColorToken="lavenderWeb"
              fromToken="%"
              fromValue={payingRateFrom}
              label="Paying"
              labelColorToken="lavenderWeb3"
              labelTypographyToken={labelTypographyToken}
              toColorToken="lavenderWeb"
              toToken="%"
              toValue={payingRateTo}
              typographyToken={typographyToken}
            />
          )}
        </PayingBox>
        <CashFlowBox>
          {accruedCashflowFrom === accruedCashflowTo ? (
            <LabelTokenTypography
              colorToken="lavenderWeb"
              label="Cash Flow"
              labelColorToken="lavenderWeb3"
              labelTypographyToken={labelTypographyToken}
              token={` ${underlyingTokenName.toUpperCase()}`}
              typographyToken={typographyToken}
              value={accruedCashflowTo}
            />
          ) : (
            <FromToTokenTypography
              fromColorToken="lavenderWeb"
              fromToken=""
              fromValue={accruedCashflowFrom}
              label="Cash Flow"
              labelColorToken="lavenderWeb3"
              labelTypographyToken={labelTypographyToken}
              toColorToken="lavenderWeb"
              toToken={` ${underlyingTokenName.toUpperCase()}`}
              toValue={accruedCashflowTo}
              typographyToken={typographyToken}
            />
          )}
        </CashFlowBox>
      </PositionDetailsRightBox>
    </PositionDetailsBox>
  );
};
