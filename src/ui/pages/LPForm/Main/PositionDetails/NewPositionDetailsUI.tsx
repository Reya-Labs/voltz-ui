import { LabelTokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import {
  selectNewPositionCompactNotional,
  selectUserInputFixedLowerRaw,
  selectUserInputFixedUpperRaw,
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
  const compactNotional = useAppSelector(selectNewPositionCompactNotional);
  const fixedLower = useAppSelector(selectUserInputFixedLowerRaw);
  const fixedUpper = useAppSelector(selectUserInputFixedUpperRaw);
  // TODO: Artur, Filip when SDK has support for PNL show it
  const hidePNL = true;

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
            value={fixedLower !== null ? formatNumber(fixedLower) : '--'}
            value2={fixedUpper !== null ? formatNumber(fixedUpper) : '--'}
          />
        </BorderedBox>
        {!hidePNL && (
          <>
            <BorderedBox>
              <LabelTokenTypography
                colorToken="skyBlueCrayola"
                label="Unrealised PnL"
                labelColorToken="lavenderWeb3"
                labelTypographyToken={labelTypographyToken}
                token={` ${underlyingTokenName.toUpperCase()}`}
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
                token={` ${underlyingTokenName.toUpperCase()}`}
                tooltip={<PnLDetails />}
                typographyToken={typographyToken}
                value="-40.00"
              />
            </BorderedBox>
          </>
        )}
      </PositionDetailsRightBox>
    </PositionDetailsBox>
  );
};
