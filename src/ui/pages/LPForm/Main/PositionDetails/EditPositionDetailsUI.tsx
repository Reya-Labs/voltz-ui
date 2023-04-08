import { FromToTokenTypography, LabelTokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import {
  selectEditLpPositionRealizedPnLFromSwapsFormatted,
  selectEditLpPositionUnrealizedPnLFromSwapsFormatted,
  selectEditPositionCompactNotional,
  selectExistingPositionCompactNotional,
  selectExistingPositionFixedLower,
  selectExistingPositionFixedUpper,
  selectLpFormSelectedPosition,
  selectEditLpPositionRealizedPnLTotalFormatted,
  selectEditLpPositionRealizedPnLFromFeesFormatted

} from '../../../../../app/features/lp-form';
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

  const editPositionCompactNotional = useAppSelector(selectEditPositionCompactNotional);
  const fixedLower = useAppSelector(selectExistingPositionFixedLower);
  const fixedUpper = useAppSelector(selectExistingPositionFixedUpper);

  // pnl

  const realizedPnLTotal = useAppSelector(selectEditLpPositionRealizedPnLTotalFormatted);
  const realizedPnLFromFees = useAppSelector(selectEditLpPositionRealizedPnLFromFeesFormatted);
  const realizedPnLFromSwaps = useAppSelector(selectEditLpPositionRealizedPnLFromSwapsFormatted);
  const unrealizedPnLFromSwaps = useAppSelector(
    selectEditLpPositionUnrealizedPnLFromSwapsFormatted,
  );

  const hidePNL = false;

  const existingPosition = useAppSelector(selectLpFormSelectedPosition);
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
            value={fixedLower !== null ? formatNumber(fixedLower) : '--'}
            value2={fixedUpper !== null ? formatNumber(fixedUpper) : '--'}
          />
        </BorderedBox>
        {!hidePNL && (
          <>
            <BorderedBox>
              <LabelTokenTypography
                colorToken="wildStrawberry"
                label="Realised PnL"
                labelColorToken="lavenderWeb3"
                labelTypographyToken={labelTypographyToken}
                token={` ${underlyingTokenName.toUpperCase()}`}
                tooltip={<PnLDetails 
                  pnlFromFees={realizedPnLFromFees}
                  pnlFromSwaps={realizedPnLFromSwaps}
                  underlyingTokenName={underlyingTokenName}
                />}
                typographyToken={typographyToken}
                value={realizedPnLTotal}
              />
            </BorderedBox>
            <BorderedBox>
              <LabelTokenTypography
                colorToken="skyBlueCrayola"
                label="Unrealised PnL"
                labelColorToken="lavenderWeb3"
                labelTypographyToken={labelTypographyToken}
                token={` ${underlyingTokenName.toUpperCase()}`}
                tooltip={"Profit or loss you would earn by fully closing your lp position"}
                typographyToken={typographyToken}
                value={unrealizedPnLFromSwaps}
              />
            </BorderedBox>
          </>
        )}
      </PositionDetailsRightBox>
    </PositionDetailsBox>
  );
};
