import { LabelTokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import {
  MarketTokenInformation,
  MarketTokenInformationProps,
} from '../../../MarketTokenInformation';
import {
  FixedBox,
  MarketTokenInformationBox,
  MaturityBox,
  PoolHeaderBox,
  PoolHeaderDetailsBox,
  VariableBox,
} from './PoolItem.styled';

type PoolItemProps = {
  isAaveV3: boolean;
  isBorrowing: boolean;
  market: MarketTokenInformationProps['market'];
  token: MarketTokenInformationProps['token'];
  fixedRateFormatted: string;
  variableRate24hDelta: number | undefined;
  variableRateFormatted: string;
  aMMMaturity: string;
  onClick: () => void;
};

export const PoolItem: React.FunctionComponent<PoolItemProps> = ({
  isAaveV3,
  isBorrowing,
  market,
  token,
  fixedRateFormatted,
  variableRate24hDelta,
  variableRateFormatted,
  aMMMaturity,
  onClick,
}) => {
  const labelTypographyToken: TypographyToken = 'primaryBodyXSmallRegular';
  const typographyToken: TypographyToken = 'secondaryBodyMediumBold';

  return (
    <PoolHeaderBox onClick={onClick}>
      <MarketTokenInformationBox>
        <MarketTokenInformation
          colorToken="white100"
          iconSize={24}
          isAaveV3={isAaveV3}
          isBorrowing={isBorrowing}
          market={market}
          token={token}
          typographyToken="primaryHeader3Bold"
        />
      </MarketTokenInformationBox>
      <PoolHeaderDetailsBox>
        <FixedBox>
          <LabelTokenTypography
            colorToken="white"
            label="Fixed"
            labelColorToken="white400"
            labelTypographyToken={labelTypographyToken}
            token="%"
            typographyToken={typographyToken}
            value={fixedRateFormatted}
          />
        </FixedBox>
        <VariableBox>
          <LabelTokenTypography
            colorToken="white"
            differenceToken="%"
            differenceValue={variableRate24hDelta}
            label="Variable"
            labelColorToken="white400"
            labelTypographyToken={labelTypographyToken}
            token="%"
            tooltip="Variable rate and the absolute change in the past 24 hours."
            typographyToken={typographyToken}
            value={variableRateFormatted}
          />
        </VariableBox>
        <MaturityBox>
          <LabelTokenTypography
            colorToken="white"
            label="Maturity"
            labelColorToken="white400"
            labelTypographyToken={labelTypographyToken}
            token=""
            typographyToken={typographyToken}
            value={aMMMaturity}
          />
        </MaturityBox>
      </PoolHeaderDetailsBox>
    </PoolHeaderBox>
  );
};
