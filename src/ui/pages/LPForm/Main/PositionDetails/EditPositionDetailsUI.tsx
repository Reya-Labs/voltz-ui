import { FromToTokenTypography, LabelTokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import {
  selectAccruedCashflowEditPositionFormatted,
  selectAccruedCashflowExistingPositionFormatted,
  selectEditPositionCompactNotional,
  selectEditPositionPayingRateFormatted,
  selectEditPositionReceivingRateFormatted,
  selectExistingPositionCompactNotional,
  selectSwapFormPosition,
} from '../../../../../app/features/swap-form';
import { useAppSelector } from '../../../../../app/hooks';
import {
  BorderedBox,
  NotionalBox,
  PositionDetailsBox,
  PositionDetailsLeftBox,
  PositionDetailsRightBox,
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
  const existingPositionCompactNotional = useAppSelector(selectExistingPositionCompactNotional);

  const receivingRateTo = useAppSelector(selectEditPositionReceivingRateFormatted);
  const payingRateTo = useAppSelector(selectEditPositionPayingRateFormatted);
  const editPositionCompactNotional = useAppSelector(selectEditPositionCompactNotional);

  const accruedCashflowFrom = useAppSelector(selectAccruedCashflowExistingPositionFormatted);
  const accruedCashflowTo = useAppSelector(selectAccruedCashflowEditPositionFormatted);

  const existingPosition = useAppSelector(selectSwapFormPosition);
  if (!existingPosition) {
    return null;
  }

  const sameNotional =
    !existingPositionCompactNotional ||
    (existingPositionCompactNotional.compactNotionalNumber ===
      editPositionCompactNotional.compactNotionalNumber &&
      existingPositionCompactNotional.compactNotionalSuffix ===
        editPositionCompactNotional.compactNotionalSuffix);

  return (
    <PositionDetailsBox>
      <PositionDetailsLeftBox>
        <LabelTokenTypography
          colorToken="wildStrawberry"
          label="Editing Position"
          labelColorToken="lavenderWeb"
          labelTypographyToken={actionLabelTypographyToken}
          token=""
          typographyToken={actionTypographyToken}
          value="Liquidity provider"
        />
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
        <BorderedBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Range"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token="%"
            typographyToken={typographyToken}
            value={receivingRateTo !== null ? receivingRateTo : '--'}
            value2={receivingRateTo !== null ? receivingRateTo : '--'}
          />
        </BorderedBox>
        <BorderedBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Generated Fees"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token=" USDC"
            typographyToken={typographyToken}
            value={payingRateTo}
          />
        </BorderedBox>
        <BorderedBox>
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
        </BorderedBox>
      </PositionDetailsRightBox>
    </PositionDetailsBox>
  );
};
