import { FromToTokenTypography, LabelTokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../app';
import {
  selectEditLpPositionRealizedPnLFromFeesFormatted,
  selectEditLpPositionRealizedPnLFromSwapsFormatted,
  selectEditLpPositionRealizedPnLTotalFormatted,
  selectEditPositionCompactNotional,
  selectExistingPositionCompactNotional,
  selectExistingPositionFixedLower,
  selectExistingPositionFixedUpper,
  selectLpFormSelectedPosition,
} from '../../../../../app/features/forms/lps/lp';
import { formatNumber } from '../../../../../utilities/number';
import { PnLDetailsWithTooltip } from '../../../../components/PnLDetailsWithTooltip';
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
          colorToken="error"
          label="Editing Position"
          labelColorToken="white100"
          labelTypographyToken={actionLabelTypographyToken}
          token=""
          typographyToken={actionTypographyToken}
          value="Liquidity Provider"
        />
      </PositionDetailsLeftBox>
      <PositionDetailsRightBox>
        <NotionalBox>
          {sameNotional ? (
            <LabelTokenTypography
              colorToken="white"
              label="Notional"
              labelColorToken="white400"
              labelTypographyToken={labelTypographyToken}
              token={editPositionCompactNotional.compactNotionalSuffix}
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
        <BorderedBox>
          <LabelTokenTypography
            colorToken="white"
            label="Range"
            labelColorToken="white400"
            labelTypographyToken={labelTypographyToken}
            token="%"
            typographyToken={typographyToken}
            value={fixedLower !== null ? formatNumber(fixedLower) : '--'}
            value2={fixedUpper !== null ? formatNumber(fixedUpper) : '--'}
          />
        </BorderedBox>
        <BorderedBox>
          <PnLDetailsWithTooltip
            labelTypographyToken={labelTypographyToken}
            realizedPnLFromFees={realizedPnLFromFees}
            realizedPnLFromSwaps={realizedPnLFromSwaps}
            realizedPnLTotal={realizedPnLTotal}
            typographyToken={typographyToken}
            underlyingTokenName={underlyingTokenName}
            variant="lp"
          />
        </BorderedBox>
      </PositionDetailsRightBox>
    </PositionDetailsBox>
  );
};
