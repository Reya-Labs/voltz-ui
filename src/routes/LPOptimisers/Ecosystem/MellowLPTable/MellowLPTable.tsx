import React from 'react';

import { MellowProduct } from '../../../../store/features/ecosystem/getMellowLPVaults/config';
import { EcosystemHeader } from '../EcosystemHeader/EcosystemHeader';
import { MellowLPEntry } from './components/MellowLPEntry/MellowLPEntry';
import { MellowLPGrid, MellowTableBox } from './MellowLPTable.styled';

export type MellowLPTableProps = {
  mellowProducts: MellowProduct[];
  onSelectItem: (item: MellowProduct) => void;
  dataLoading: boolean;
};

export const MellowLPTable: React.FunctionComponent<MellowLPTableProps> = ({
  mellowProducts,
  onSelectItem,
  dataLoading,
}: MellowLPTableProps) => (
  <MellowTableBox>
    <EcosystemHeader />
    {mellowProducts && (
      <MellowLPGrid itemsPerRow={3}>
        {mellowProducts.map((product, index) => (
          <MellowLPEntry
            key={index}
            dataLoading={dataLoading}
            lpVault={product}
            onSelectItem={() => onSelectItem(product)}
          />
        ))}
      </MellowLPGrid>
    )}
  </MellowTableBox>
);
