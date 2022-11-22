import MellowLPPosition from '../MellowLPPosition/MellowLPPosition';
import React from 'react';

import { MellowProduct } from '../../../types';
import { VaultField } from '../../../Common/VaultField';
import {
  DescriptionTypography,
  MellowLPEntryContainerBox,
  MellowLPEntryInfoBox,
  PoolFieldsBox,
  PoolFieldTypography,
  PoolTag,
  PositionBox,
  TitleTypography,
} from './MellowLPEntry.styled';

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
        <VaultField
          title={lpVault.metadata.title}
          token={lpVault.metadata.token}
          maturity={lpVault.metadata.maturity}
          expectedApy={lpVault.metadata.estimatedHistoricApy}
        />

        <DescriptionTypography variant="h6">
          {lpVault.metadata.description}
        </DescriptionTypography>

        <PoolTag>
          {`${lpVault.metadata.underlyingPools.length} ${lpVault.metadata.token} ${lpVault.metadata.underlyingPools.length === 1 ? 'POOL' : 'POOLS'
            }`}
        </PoolTag>

        <TitleTypography variant="h6">LIQUIDITY SPREAD ACROSS</TitleTypography>

        <PoolFieldsBox>
          {lpVault.metadata.underlyingPools.map((pool) => (
            <PoolFieldTypography
              variant="body2"
              key={pool}
            >
              {pool}
            </PoolFieldTypography>
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
