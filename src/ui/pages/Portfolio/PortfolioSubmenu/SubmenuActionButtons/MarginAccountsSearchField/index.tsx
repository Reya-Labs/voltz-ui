import styled from '@emotion/styled';
import { Highlight, SearchField, SearchFieldProps, TokenTypography, Typography } from 'brokoli-ui';
import React, { useState } from 'react';

type MarginAccountListItemProps = SearchFieldProps['items'][0] & {
  balanceUSDFormatted: {
    compactNumber: string;
    compactSuffix: string;
  };
};

const customItems: MarginAccountListItemProps[] = [
  {
    balanceUSDFormatted: {
      compactNumber: '123',
      compactSuffix: 'k',
    },
    id: '1',
    label: 'Ethereum',
  },
  {
    balanceUSDFormatted: {
      compactNumber: '456',
      compactSuffix: 'k',
    },
    id: '2',
    label: 'Ethereum2',
  },
];

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
  const { label, balanceUSDFormatted } = item;
  const { compactSuffix, compactNumber } = balanceUSDFormatted;
  return (
    <Wrapper>
      <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
        <Highlight highlight={searchedValue}>{label}</Highlight>
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

export const MarginAccountsSearchField: React.FunctionComponent = () => {
  const [selectedItemId, setSelectedItemId] = useState('');

  return (
    <SearchField
      itemRenderer={MarginAccountListItem}
      items={customItems}
      labelTypographyToken="primaryBodySmallRegular"
      placeHolder="Select Margin Account"
      selectedItemId={selectedItemId}
      typographyToken="primaryBodySmallBold"
      onItemSelected={setSelectedItemId}
    />
  );
};
