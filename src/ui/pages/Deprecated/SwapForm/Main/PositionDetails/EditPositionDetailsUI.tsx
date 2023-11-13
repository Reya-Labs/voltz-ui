import { FromToTokenTypography, LabelTokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../../app';
import {
  selectEditPositionCompactNotional,
  selectEditPositionMode,
  selectEditPositionPayingRateFormatted,
  selectEditPositionRealizedPnLFromFeesFormatted,
  selectEditPositionRealizedPnLFromSwapsFormatted,
  selectEditPositionRealizedPnLTotalFormatted,
  selectEditPositionReceivingRateFormatted,
  selectEditPositionUnrealizedPnLFromSwapsFormatted,
  selectExistingPositionCompactNotional,
  selectExistingPositionMode,
  selectExistingPositionPayingRateFormatted,
  selectExistingPositionReceivingRateFormatted,
  selectSwapFormPosition,
} from '../../../../../../app/features/forms/trader/deprecated/swap';
import { PnLDetailsWithTooltip } from '../../../../../components/PnLDetailsWithTooltip';
import { UnrealizedPNLDetails } from '../../../../../components/UnrealizedPNLDetails';
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
  const receivingRateFrom = useAppSelector(selectExistingPositionReceivingRateFormatted);
  const payingRateFrom = useAppSelector(selectExistingPositionPayingRateFormatted);
  const existingPositionCompactNotional = useAppSelector(selectExistingPositionCompactNotional);

  const editPositionMode = useAppSelector(selectEditPositionMode);
  const receivingRateTo = useAppSelector(selectEditPositionReceivingRateFormatted);
  const payingRateTo = useAppSelector(selectEditPositionPayingRateFormatted);

  const realizedPnLTotal = useAppSelector(selectEditPositionRealizedPnLTotalFormatted);
  const realizedPnLFromFees = useAppSelector(selectEditPositionRealizedPnLFromFeesFormatted);
  const realizedPnLFromSwaps = useAppSelector(selectEditPositionRealizedPnLFromSwapsFormatted);
  const unrealizedPnLFromSwaps = useAppSelector(selectEditPositionUnrealizedPnLFromSwapsFormatted);

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

  return (
    <PositionDetailsBox>
      <PositionDetailsLeftBox>
        {sameMode ? (
          <LabelTokenTypography
            colorToken={MODE_COLOR_TOKEN_MAP[editPositionMode]}
            label="Editing Position"
            labelColorToken="white100"
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
            labelColorToken="white100"
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
              colorToken="white"
              label="Notional"
              labelColorToken="white400"
              labelTypographyToken={labelTypographyToken}
              token={
                editPositionCompactNotional
                  ? `${
                      editPositionCompactNotional.compactNotionalSuffix
                    } ${underlyingTokenName.toUpperCase()}`
                  : ` ${underlyingTokenName.toUpperCase()}`
              }
              typographyToken={typographyToken}
              value={editPositionCompactNotional.compactNotionalNumber}
            />
          ) : (
            <FromToTokenTypography
              fromColorToken="white"
              fromToken={existingPositionCompactNotional.compactNotionalSuffix}
              fromValue={existingPositionCompactNotional.compactNotionalNumber}
              label="Notional"
              labelColorToken="white400"
              labelTypographyToken={labelTypographyToken}
              toColorToken="white"
              toToken={editPositionCompactNotional.compactNotionalSuffix}
              toValue={editPositionCompactNotional.compactNotionalNumber}
              typographyToken={typographyToken}
            />
          )}
        </NotionalBox>
        <ReceivingBox>
          {receivingRateFrom === receivingRateTo ? (
            <LabelTokenTypography
              colorToken="white"
              label="Receiving"
              labelColorToken="white400"
              labelTypographyToken={labelTypographyToken}
              token="%"
              typographyToken={typographyToken}
              value={receivingRateTo}
            />
          ) : (
            <FromToTokenTypography
              fromColorToken="white"
              fromToken="%"
              fromValue={receivingRateFrom}
              label="Receiving"
              labelColorToken="white400"
              labelTypographyToken={labelTypographyToken}
              toColorToken="white"
              toToken="%"
              toValue={receivingRateTo}
              typographyToken={typographyToken}
            />
          )}
        </ReceivingBox>
        <PayingBox>
          {payingRateFrom === payingRateTo ? (
            <LabelTokenTypography
              colorToken="white"
              label="Paying"
              labelColorToken="white400"
              labelTypographyToken={labelTypographyToken}
              token="%"
              typographyToken={typographyToken}
              value={payingRateTo}
            />
          ) : (
            <FromToTokenTypography
              fromColorToken="white"
              fromToken="%"
              fromValue={payingRateFrom}
              label="Paying"
              labelColorToken="white400"
              labelTypographyToken={labelTypographyToken}
              toColorToken="white"
              toToken="%"
              toValue={payingRateTo}
              typographyToken={typographyToken}
            />
          )}
        </PayingBox>
        <CashFlowBox>
          <PnLDetailsWithTooltip
            labelTypographyToken={labelTypographyToken}
            realizedPnLFromFees={realizedPnLFromFees}
            realizedPnLFromSwaps={realizedPnLFromSwaps}
            realizedPnLTotal={realizedPnLTotal}
            typographyToken={typographyToken}
            underlyingTokenName={underlyingTokenName}
            variant="trader"
          />
        </CashFlowBox>
        <CashFlowBox>
          <LabelTokenTypography
            colorToken={
              unrealizedPnLFromSwaps === '--'
                ? 'white'
                : unrealizedPnLFromSwaps.indexOf('-') !== -1
                ? 'error'
                : 'primary'
            }
            label="Unrealized PnL"
            labelColorToken="white400"
            labelTypographyToken={labelTypographyToken}
            token={` ${underlyingTokenName.toUpperCase()}`}
            tooltip={<UnrealizedPNLDetails />}
            typographyToken={typographyToken}
            value={unrealizedPnLFromSwaps}
          />
        </CashFlowBox>
      </PositionDetailsRightBox>
    </PositionDetailsBox>
  );
};
