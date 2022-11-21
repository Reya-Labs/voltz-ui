import { MellowProduct } from '../types';
import MellowLPEntry from './components/MellowLPEntry/MellowLPEntry';
import { MellowLPGrid } from './MellowLPTable.styled';
import React from 'react';

export type MellowLPTableProps = {
  mellowProducts: MellowProduct[];
  onSelectItem: (item: MellowProduct) => void;
  dataLoading: boolean;
};

const MellowLPTable: React.FunctionComponent<MellowLPTableProps> = ({
  mellowProducts,
  onSelectItem,
  dataLoading,
}: MellowLPTableProps) => (
  <MellowLPGrid itemsPerRow={3}>
    {mellowProducts.map((product, index) => (
      <MellowLPEntry
        key={index}
        lpVault={product}
        onSelectItem={() => onSelectItem(product)}
        dataLoading={dataLoading}
      />
    ))}
  </MellowLPGrid>
);

export default MellowLPTable;
