import styled from '@emotion/styled';
import { Highlight, SearchField, SearchFieldProps, TokenTypography, Typography } from 'brokoli-ui';
import React, { useState } from 'react';

import { MarginAccountUI } from '../../../../../../../../app/features/portfolio/types';

type MarginAccountListItemProps = SearchFieldProps['items'][0] & MarginAccountUI;

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const MarginAccountListItem: SearchFieldProps['itemRenderer'] = (props) => {
  const { item, searchedValue } = props as {
    item: MarginAccountListItemProps;
    searchedValue?: string;
  };
  const { name, balanceCompactFormat } = item;
  const { compactSuffix, compactNumber } = balanceCompactFormat;
  return (
    <Wrapper>
      <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
        <Highlight highlight={searchedValue}>{name}</Highlight>
      </Typography>
      <TokenTypography
        colorToken="lavenderWeb"
        prefixToken="$"
        token={compactSuffix}
        typographyToken="primaryBodySmallRegular"
        value={compactNumber}
      />
    </Wrapper>
  );
};

const itemFilter = (item: SearchFieldProps['items'][0], value: string) => {
  const { name } = item as MarginAccountListItemProps;
  return !value ? true : name.toLowerCase().includes(value.toLowerCase());
};

export const MarginAccountsSearchField: React.FunctionComponent<{
  marginAccounts: MarginAccountUI[];
}> = ({ marginAccounts }) => {
  const [selectedItemId, setSelectedItemId] = useState('');

  return (
    <SearchField
      itemFilter={itemFilter}
      itemRenderer={MarginAccountListItem}
      items={marginAccounts as MarginAccountListItemProps[]}
      labelTypographyToken="primaryBodySmallRegular"
      placeHolder="Select Margin Account"
      selectedItemId={selectedItemId}
      typographyToken="primaryBodySmallBold"
      onItemSelected={setSelectedItemId}
    />
  );
};
