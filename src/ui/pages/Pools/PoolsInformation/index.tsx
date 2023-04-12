import { LabelTokenTypography, TypographyToken, TypographyWithTooltip } from 'brokoli-ui';
import React from 'react';

import {
  selectPoolFilterOptions,
  selectPoolsSize,
  togglePoolFilterAction,
} from '../../../../app/features/aMMs';
import { selectChainId } from '../../../../app/features/network';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useResponsiveQuery } from '../../../../hooks/useResponsiveQuery';
import {
  FilterBox,
  FiltersBox,
  InformationBox,
  PoolFilterPill,
  PoolsInformationBox,
  VerticalLine,
} from './PoolsInformation.styled';

export const PoolsInformation: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const chainId = useAppSelector(selectChainId);
  const poolsSize = useAppSelector(selectPoolsSize);
  const filterOptions = useAppSelector(selectPoolFilterOptions);
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const labelTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  const typographyToken: TypographyToken = isLargeDesktopDevice
    ? 'secondaryBodyLargeBold'
    : 'secondaryBodyMediumBold';

  // TODO: Filip move to store + Artur to provide SDK utility
  const tradingVolume7dValue = '$245';
  const tradingVolume7dToken = 'M';
  const totalLiquidityValue = '$245.004';
  const totalLiquidityToken = 'M';

  if (!chainId) {
    return null;
  }

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
          value={poolsSize}
        />
      </InformationBox>
      <VerticalLine />
      <InformationBox>
        <LabelTokenTypography
          colorToken="lavenderWeb"
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
          {filterOptions.map((filter) => (
            <PoolFilterPill
              key={filter.id}
              colorToken={filter.isActive ? 'lavenderWeb' : 'liberty'}
              typographyToken="primaryBodySmallRegular"
              variant="compact"
              onClick={() => {
                dispatch(
                  togglePoolFilterAction({
                    chainId,
                    filterId: filter.id,
                  }),
                );
              }}
            >
              {filter.label}
            </PoolFilterPill>
          ))}
        </FiltersBox>
      </FilterBox>
    </PoolsInformationBox>
  );
};
