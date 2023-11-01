import { FromToTokenTypography, MarketToken, MarketTokenProps } from 'brokoli-ui';
import React from 'react';

import { TitleBox, VaultFieldBox, VaultMetricsBox } from './VaultField.styled';

type VaultFieldProps = {
  title: string;
  token: string;
  expectedApys: [number, number][];
  weights: number[];
};

export const VaultField: React.FunctionComponent<VaultFieldProps> = ({
  title,
  token,
  expectedApys,
  weights,
}: VaultFieldProps) => {
  const apySum: [number, number] = [0, 0];

  for (let i = 0; i < expectedApys.length; i++) {
    apySum[0] += expectedApys[i][0] * weights[i];
    apySum[1] += expectedApys[i][1] * weights[i];
  }

  const averageApyFrom = apySum[0] / 100;
  const averageApyTo = apySum[1] / 100;

  return (
    <VaultFieldBox>
      <TitleBox>
        <MarketToken
          colorToken="white100"
          iconSize={24}
          infoFormatter={() => title}
          token={token.toLowerCase() as MarketTokenProps['token']}
          typographyToken="primaryBodyExtraLargeBold"
        ></MarketToken>
      </TitleBox>
      <VaultMetricsBox>
        <FromToTokenTypography
          fromColorToken="error"
          fromToken="%"
          fromValue={Number(Math.round(averageApyFrom))}
          label="Historic Estimated APY Ranging From"
          labelColorToken="white400"
          labelTypographyToken="primaryBodySmallRegular"
          toColorToken="error"
          tooltip="Estimated return of this strategy had it been running during the last quarter of 2022, depending on when the deposit was made."
          toToken="%"
          toValue={Number(Math.round(averageApyTo))}
          typographyToken="secondaryBodyExtraLargeBold"
        />
      </VaultMetricsBox>
    </VaultFieldBox>
  );
};
