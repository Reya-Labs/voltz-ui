import { MellowProduct } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { Header } from '../Header/Header';
import { VaultEntry } from './components/VaultEntry/VaultEntry';
import { VaultsGrid, VaultsTableBox } from './VaultsTable.styled';

export type VaultsTableProps = {
  mellowProducts: MellowProduct[];
  onSelectItem: (item: MellowProduct) => void;
  dataLoading: boolean;
};

export const VaultsTable: React.FunctionComponent<VaultsTableProps> = ({
  mellowProducts,
  onSelectItem,
  dataLoading,
}: VaultsTableProps) => (
  <VaultsTableBox>
    <Header />
    {mellowProducts && (
      <VaultsGrid itemsPerRow={3}>
        {mellowProducts.map((product, index) => (
          <VaultEntry
            key={index}
            dataLoading={dataLoading}
            lpVault={product}
            onSelectItem={() => onSelectItem(product)}
          />
        ))}
      </VaultsGrid>
    )}
  </VaultsTableBox>
);
