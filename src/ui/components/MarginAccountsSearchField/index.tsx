import styled from '@emotion/styled';
import { Highlight, SearchField, SearchFieldProps, Typography } from 'brokoli-ui';
import React, { useMemo } from 'react';

import { MarginAccountUI } from '../../../app/features/portfolio/types';
import { ChainIcon } from '../ChainIcon';
import { TokenCompactTypography } from '../TokenCompactTypography';

type MarginAccountListItemProps = SearchFieldProps['items'][0] & MarginAccountUI;

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LeftWrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const RightWrapper = styled('div')`
  width: 150px;
`;

const MarginAccountListItem: SearchFieldProps['itemRenderer'] = (props) => {
  const { item, searchedValue } = props as {
    item: MarginAccountListItemProps;
    searchedValue?: string;
  };
  const { chainId, name, settlementToken, balanceCompactFormatted, balanceUSDCompactFormatted } =
    item;
  const chainIcon = <ChainIcon chainId={chainId} hideForChains={[]} />;
  return (
    <Wrapper>
      <LeftWrapper>
        {chainIcon}
        <Typography colorToken="white300" typographyToken="primaryBodySmallRegular">
          <Highlight highlight={searchedValue}>{name}</Highlight>
        </Typography>
      </LeftWrapper>
      <RightWrapper>
        <TokenCompactTypography
          colorToken="white"
          compactData={!settlementToken ? balanceUSDCompactFormatted : balanceCompactFormatted}
          token={!settlementToken ? '$' : settlementToken}
          typographyToken="secondaryBodySmallRegular"
        />
      </RightWrapper>
    </Wrapper>
  );
};

const itemFilter = (item: SearchFieldProps['items'][0], value: string) => {
  const { name } = item as MarginAccountListItemProps;
  return !value ? true : name.toLowerCase().includes(value.toLowerCase());
};

export const MarginAccountsSearchField: React.FunctionComponent<{
  marginAccounts: MarginAccountUI[];
  selectedMarginAccountId: string;
  onMarginAccountClick: (id: string) => void;
  disabled: boolean;
}> = ({ disabled, onMarginAccountClick, selectedMarginAccountId, marginAccounts }) => {
  const marginAccountsWithLabel = useMemo(() => {
    return marginAccounts.map((mA) => ({ ...mA, label: mA.name }));
  }, [marginAccounts]);

  return (
    <SearchField
      disabled={disabled}
      itemFilter={itemFilter}
      itemRenderer={MarginAccountListItem}
      items={marginAccountsWithLabel as MarginAccountListItemProps[]}
      labelTypographyToken="primaryBodySmallRegular"
      placeHolder="Select Margin Account"
      selectedItemId={selectedMarginAccountId}
      typographyToken="primaryBodySmallBold"
      onItemSelected={onMarginAccountClick}
    />
  );
};
