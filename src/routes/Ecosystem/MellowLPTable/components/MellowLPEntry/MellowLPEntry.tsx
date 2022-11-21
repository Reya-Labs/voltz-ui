import MellowLPPosition from '../MellowLPPosition/MellowLPPosition';
import React from 'react';
import { PoolField } from '@components/composite';

import { MellowProduct } from '../../../types';
import { VaultField } from '../../../Common/VaultField';
import {
  DescriptionTypography,
  MellowLPEntryContainerBox,
  MellowLPEntryInfoBox,
  MellowLPEntryTagBox,
  PoolFieldsBox,
  PoolTag,
  PositionBox,
  TitleTypography,
} from './MellowLPEntry.styled';
import { Tag } from '../Tag/Tag';

export type MellowLPEntryProps = {
  onSelectItem: () => void;
  lpVault: MellowProduct;
  dataLoading: boolean;
};

const MellowLPEntry: React.FunctionComponent<MellowLPEntryProps> = ({
  lpVault,
  onSelectItem,
  dataLoading,
}: MellowLPEntryProps) => {
  return (
    <MellowLPEntryContainerBox>
      <MellowLPEntryInfoBox>
        <MellowLPEntryTagBox>
          <Tag>LP OPTIMISER</Tag>
          {lpVault.metadata.deprecated && <Tag>DEPRECATED</Tag>}
        </MellowLPEntryTagBox>

        <VaultField
          title={lpVault.metadata.title}
          maturity={lpVault.metadata.maturity}
          expectedApy={lpVault.metadata.estimatedHistoricApy}
        />

        <DescriptionTypography variant="h6">
          The Mellow LP Optimiser runs a permissionless strategy that takes deposits and generates
          optimised LP fees by providing liquidity on Voltz Protocol.
        </DescriptionTypography>

        <PoolTag>
          {`${lpVault.metadata.underlyingPools.length} ${lpVault.metadata.token} ${
            lpVault.metadata.underlyingPools.length === 1 ? 'POOL' : 'POOLS'
          }`}
        </PoolTag>

        <TitleTypography variant="h6">LIQUIDITY SPREAD ACROSS</TitleTypography>

        <PoolFieldsBox>
          {lpVault.metadata.underlyingPools.map((pool, index) => (
            <PoolField
              key={`${pool}-${index}`}
              protocol={pool}
              isBorrowing={false}
              isBorrowTable={true}
            />
          ))}
        </PoolFieldsBox>
      </MellowLPEntryInfoBox>
      <PositionBox>
        <MellowLPPosition
          userDeposit={lpVault.vault.userDeposit}
          tokenName={lpVault.metadata.token}
          handleClick={onSelectItem}
          dataLoading={dataLoading}
          disabled={lpVault.metadata.deprecated}
        />
      </PositionBox>
    </MellowLPEntryContainerBox>
  );
};

export default MellowLPEntry;
