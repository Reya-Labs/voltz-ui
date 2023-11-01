import { LabelTokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../app';
import {
  selectNewPositionCompactNotional,
  selectUserInputFixedLower,
  selectUserInputFixedUpper,
} from '../../../../../app/features/forms/lps/rollover-lp';
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
  actionLabelTypographyToken,
  actionTypographyToken,
  labelTypographyToken,
  typographyToken,
  underlyingTokenName,
}) => {
  const compactNotional = useAppSelector(selectNewPositionCompactNotional);
  const fixedLower = useAppSelector(selectUserInputFixedLower);
  const fixedUpper = useAppSelector(selectUserInputFixedUpper);
  const token = ` ${underlyingTokenName.toUpperCase()}`;

  return (
    <PositionDetailsBox>
      <PositionDetailsLeftBox>
        <LabelTokenTypography
          colorToken="error"
          label="New Position"
          labelColorToken="white100"
          labelTypographyToken={actionLabelTypographyToken}
          token=""
          typographyToken={actionTypographyToken}
          value="Liquidity Provider"
        />
      </PositionDetailsLeftBox>
      <PositionDetailsRightBox>
        <NotionalBox>
          <LabelTokenTypography
            colorToken="white"
            label="Notional"
            labelColorToken="white400"
            labelTypographyToken={labelTypographyToken}
            token={compactNotional ? `${compactNotional.compactNotionalSuffix}${token}` : token}
            typographyToken={typographyToken}
            value={compactNotional ? compactNotional.compactNotionalNumber : '--'}
          />
        </NotionalBox>
        <BorderedBox>
          <LabelTokenTypography
            colorToken="white"
            label="Range"
            labelColorToken="white400"
            labelTypographyToken={labelTypographyToken}
            token="%"
            typographyToken={typographyToken}
            value={fixedLower ? fixedLower : '--'}
            value2={fixedUpper ? fixedUpper : '--'}
          />
        </BorderedBox>
      </PositionDetailsRightBox>
    </PositionDetailsBox>
  );
};
