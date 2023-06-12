import { RainbowLoader } from 'brokoli-ui';
import React from 'react';

import { OptimiserInfo } from '../../../../../app/features/lp-optimisers';
import { Header } from '../Header/Header';
import { VaultEntry } from './VaultEntry/VaultEntry';
import { RainbowLoaderBox, VaultsGrid, VaultsTableBox } from './VaultsTable.styled';

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
    {dataLoading && (
      <RainbowLoaderBox>
        <RainbowLoader height={2} text={'Fetching Optimisers...'} />
      </RainbowLoaderBox>
    )}
    {!dataLoading && mellowProducts && (
      <VaultsGrid itemsPerRow={3}>
        {mellowProducts.map((product, index) => (
          <VaultEntry key={index} lpVault={product} onSelectItem={() => onSelectItem(product)} />
        ))}
      </VaultsGrid>
    )}
  </VaultsTableBox>
);
