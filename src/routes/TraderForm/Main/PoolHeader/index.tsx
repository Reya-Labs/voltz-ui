import { LabelTokenTypography, MarketToken } from 'brokoli-ui';
import React from 'react';

import {
  FixedBox,
  MaturityBox,
  PoolHeaderBox,
  PoolHeaderDetailsBox,
  VariableBox,
} from './PoolHeader.styled';

type PoolHeaderProps = {};

export const PoolHeader: React.FunctionComponent<PoolHeaderProps> = () => {
  return (
    <PoolHeaderBox>
      <MarketToken market="Aave" token="usdc" />
      <PoolHeaderDetailsBox>
        <FixedBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Fixed"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            token="%"
            typographyToken="secondaryBodyMediumBold"
            value={5.33}
          />
        </FixedBox>
        <VariableBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            differenceValue={-2}
            label="Variable"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            token="%"
            tooltip="TODO: Missing tooltip"
            typographyToken="secondaryBodyMediumBold"
            value={2.49}
          />
        </VariableBox>
        <MaturityBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Maturity"
            labelColorToken="lavenderWeb3"
            labelTypographyToken="primaryBodyXSmallRegular"
            token=""
            typographyToken="secondaryBodyMediumBold"
            value="03 May 2023"
          />
        </MaturityBox>
      </PoolHeaderDetailsBox>
    </PoolHeaderBox>
  );
};
