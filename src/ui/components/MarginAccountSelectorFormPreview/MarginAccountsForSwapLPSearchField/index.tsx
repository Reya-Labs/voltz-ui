import styled from '@emotion/styled';
import { Highlight, SearchField, SearchFieldProps, TokenTypography, Typography } from 'brokoli-ui';
import React, { useMemo } from 'react';

import { MarginAccountForSwapLPUI } from '../../../../app/features/margin-accounts-for-swap-lp';
import { ChainIcon } from '../../ChainIcon';

type MarginAccountListItemProps = SearchFieldProps['items'][0] & MarginAccountForSwapLPUI;

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

const MarginAccountForSwapLPListItem: SearchFieldProps['itemRenderer'] = (props) => {
  const { item, searchedValue } = props as {
    item: MarginAccountListItemProps;
    searchedValue?: string;
  };
  const { poolToken, chainId, name, balanceCompactFormatted } = item;
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
        <TokenTypography
          colorToken="white"
          token={`${balanceCompactFormatted.compactSuffix} ${poolToken.toUpperCase()}`}
          typographyToken="secondaryBodySmallRegular"
          value={balanceCompactFormatted.compactNumber}
        />
      </RightWrapper>
    </Wrapper>
  );
};

const itemFilter = (item: SearchFieldProps['items'][0], value: string) => {
  const { name } = item as MarginAccountListItemProps;
  return !value ? true : name.toLowerCase().includes(value.toLowerCase());
};

export const MarginAccountsForSwapLPSearchField: React.FunctionComponent<{
  marginAccounts: MarginAccountForSwapLPUI[];
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
      itemRenderer={MarginAccountForSwapLPListItem}
      items={marginAccountsWithLabel as MarginAccountListItemProps[]}
      labelTypographyToken="primaryBodySmallRegular"
      placeHolder="Select Margin Account"
      selectedItemId={selectedMarginAccountId}
      typographyToken="primaryBodySmallBold"
      onItemSelected={onMarginAccountClick}
    />
  );
};
