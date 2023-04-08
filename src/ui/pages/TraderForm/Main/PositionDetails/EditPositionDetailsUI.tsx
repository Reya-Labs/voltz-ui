import { FromToTokenTypography, LabelTokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import {
  selectEditPositionCompactNotional,
  selectEditPositionMode,
  selectEditPositionPayingRateFormatted,
  selectEditPositionRealizedPnLFromSwapsFormatted,
  selectEditPositionRealizedPnLFromFeesFormatted,
  selectEditPositionRealizedPnLTotalFormatted,
  selectEditPositionReceivingRateFormatted,
  selectEditPositionUnrealizedPnLFromSwapsFormatted,
  selectExistingPositionCompactNotional,
  selectExistingPositionMode,
  selectExistingPositionPayingRateFormatted,
  selectExistingPositionReceivingRateFormatted,
  selectSwapFormPosition,
} from '../../../../../app/features/swap-form';
import { useAppSelector } from '../../../../../app/hooks';
import { MODE_COLOR_TOKEN_MAP, MODE_TEXT_MAP } from '../../helpers';
import { PnLDetails } from './PnLDetails';
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
          <LabelTokenTypography
            colorToken="wildStrawberry"
            label="Realised PnL"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token={` ${underlyingTokenName.toUpperCase()}`}
            tooltip={<PnLDetails 
              underlyingTokenName={underlyingTokenName}
              pnlFromSwaps={realizedPnLFromSwaps}
              pnlFromFees={realizedPnLFromFees}
            />}
            typographyToken={typographyToken}
            value={realizedPnLTotal}
          />
        </CashFlowBox>
        <CashFlowBox>
          <LabelTokenTypography
            colorToken="skyBlueCrayola"
            label="Unrealised PnL"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token={` ${underlyingTokenName.toUpperCase()}`}
            tooltip="Profit or loss you would earn by closing your position now"
            typographyToken={typographyToken}
            value={unrealizedPnLFromSwaps}
          />
        </CashFlowBox>
      </PositionDetailsRightBox>
    </PositionDetailsBox>
  );
};
