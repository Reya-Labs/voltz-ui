import { LabelTokenTypography, Pill, TypographyToken, TypographyWithTooltip } from 'brokoli-ui';
import React from 'react';

import { useResponsiveQuery } from '../../../../hooks/useResponsiveQuery';
import {
  FilterBox,
  FiltersBox,
  InformationBox,
  PoolsInformationBox,
  VerticalLine,
} from './PoolsInformation.styled';

export const PoolsInformation: React.FunctionComponent = () => {
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const labelTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  const typographyToken: TypographyToken = isLargeDesktopDevice
    ? 'secondaryBodyLargeBold'
    : 'secondaryBodyMediumBold';

  const numberOfPools = 12;
  const tradingVolume7dValue = '$245';
  const tradingVolume7dToken = 'M';
  const tradingVolume7dDifference = -2;
  const totalLiquidityValue = '$245.004';
  const totalLiquidityToken = 'M';

  return (
    <PoolsInformationBox>
      <InformationBox>
        <LabelTokenTypography
          colorToken="lavenderWeb"
          label="Markets"
          labelColorToken="lavenderWeb3"
          labelTypographyToken={labelTypographyToken}
          token=""
          typographyToken={typographyToken}
          value={numberOfPools}
        />
      </InformationBox>
      <VerticalLine />
      <InformationBox>
        <LabelTokenTypography
          colorToken="lavenderWeb"
          differenceToken="%"
          differenceValue={tradingVolume7dDifference}
          label="Trading Volume 7d"
          labelColorToken="lavenderWeb3"
          labelTypographyToken={labelTypographyToken}
          token={tradingVolume7dToken}
          tooltip="TODO: Tooltip"
          typographyToken={typographyToken}
          value={tradingVolume7dValue}
        />
      </InformationBox>
      <VerticalLine />
      <InformationBox>
        <LabelTokenTypography
          colorToken="lavenderWeb"
          differenceValue={tradingVolume7dDifference}
          label="Total Liquidity"
          labelColorToken="lavenderWeb3"
          labelTypographyToken={labelTypographyToken}
          token={totalLiquidityToken}
          typographyToken={typographyToken}
          value={totalLiquidityValue}
        />
      </InformationBox>
      <VerticalLine />
      <FilterBox>
        <TypographyWithTooltip
          colorToken="lavenderWeb3"
          tooltip="TODO: Missing tooltip"
          typographyToken={labelTypographyToken}
        >
          Filter by
        </TypographyWithTooltip>
        <FiltersBox>
          <Pill colorToken="lavenderWeb" typographyToken={labelTypographyToken}>
            Borrow
          </Pill>
          <Pill colorToken="liberty" typographyToken={labelTypographyToken}>
            ETH
          </Pill>
          <Pill colorToken="lavenderWeb" typographyToken={labelTypographyToken}>
            v2
          </Pill>
          <Pill colorToken="liberty" typographyToken={labelTypographyToken}>
            Lending
          </Pill>
        </FiltersBox>
      </FilterBox>
    </PoolsInformationBox>
  );
};
