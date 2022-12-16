import { MellowProduct } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { VaultField } from '../../../../VaultField/VaultField';
import { MellowPosition } from '../MellowPosition/MellowPosition';
import { Tag } from '../Tag/Tag';
import {
  DescriptionTypography,
  PoolFieldsBox,
  PoolFieldTypography,
  PoolOutlineBox,
  PositionBox,
  VaultEntryContainerBox,
  VaultEntryInfoBox,
} from './VaultEntry.styled';

export type VaultEntryProps = {
  onSelectItem: () => void;
  lpVault: MellowProduct;
  dataLoading: boolean;
};

export const VaultEntry: React.FunctionComponent<VaultEntryProps> = ({
  lpVault,
  onSelectItem,
  dataLoading,
}: VaultEntryProps) => {
  return (
    <VaultEntryContainerBox>
      <VaultEntryInfoBox>
        <VaultField
          expectedApys={lpVault.metadata.vaults.map((v) => v.estimatedHistoricApy)}
          title={lpVault.metadata.title}
          token={lpVault.metadata.token}
          weights={lpVault.metadata.vaults.map((v) => v.weight)}
        />

        <DescriptionTypography variant="h6">{lpVault.metadata.description}</DescriptionTypography>

        <PoolOutlineBox>
          <Tag>
            {`${lpVault.metadata.underlyingPools.length} ${lpVault.metadata.token} ${
              lpVault.metadata.underlyingPools.length === 1 ? 'POOL' : 'POOLS'
            }`}
          </Tag>

          <DescriptionTypography variant="h6">LIQUIDITY SPREAD ACROSS</DescriptionTypography>

          <PoolFieldsBox>
            {lpVault.metadata.underlyingPools.map((pool, index) => (
              <PoolFieldTypography key={`${pool}-${index}`} variant="body2">
                {pool}
              </PoolFieldTypography>
            ))}
          </PoolFieldsBox>
        </PoolOutlineBox>
      </VaultEntryInfoBox>

      <PositionBox>
        <MellowPosition
          dataLoading={dataLoading}
          disabled={lpVault.metadata.soon || lpVault.metadata.deprecated}
          handleClick={onSelectItem}
          tokenName={lpVault.metadata.token}
          userDeposit={lpVault.userDeposit}
        />
      </PositionBox>
    </VaultEntryContainerBox>
  );
};
