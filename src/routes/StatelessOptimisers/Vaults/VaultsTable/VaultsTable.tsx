import React from 'react';

import { OptimiserInfo } from '../../../../app/features/stateless-optimisers';
import { Header } from '../Header/Header';
import { VaultEntry } from './VaultEntry/VaultEntry';
import { VaultsGrid, VaultsTableBox } from './VaultsTable.styled';

export type VaultsTableProps = {
  mellowProducts: OptimiserInfo[];
  onSelectItem: (item: OptimiserInfo) => void;
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
        {mellowProducts
          .filter((mellowProduct) => !mellowProduct.expired)
          .map((product, index) => (
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
