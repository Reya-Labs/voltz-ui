import { LabelTokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import {
  selectNewPositionCompactNotional,
  selectUserInputFixedLower,
  selectUserInputFixedUpper,
} from '../../../../../app/features/forms/lp-form';
import { useAppSelector } from '../../../../../app/hooks';
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
          colorToken="wildStrawberry"
          label="New Position"
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
            token={compactNotional ? `${compactNotional.compactNotionalSuffix}${token}` : token}
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
            value={fixedLower ? fixedLower : '--'}
            value2={fixedUpper ? fixedUpper : '--'}
          />
        </BorderedBox>
      </PositionDetailsRightBox>
    </PositionDetailsBox>
  );
};
