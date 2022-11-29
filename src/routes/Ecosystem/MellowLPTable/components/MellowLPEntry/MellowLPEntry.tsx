import React from 'react';

import { VaultField } from '../../../Common/VaultField';
import { MellowProduct } from '../../../types';
import MellowLPPosition from '../MellowLPPosition/MellowLPPosition';
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
          expectedApy={lpVault.metadata.estimatedHistoricApy}
          maturity={lpVault.metadata.maturity}
          title={lpVault.metadata.title}
          token={lpVault.metadata.token}
        />

        <DescriptionTypography variant="h6">{lpVault.metadata.description}</DescriptionTypography>

        <PoolTag>
          {`${lpVault.metadata.underlyingPools.length} ${lpVault.metadata.token} ${
            lpVault.metadata.underlyingPools.length === 1 ? 'POOL' : 'POOLS'
          }`}
        </PoolTag>

        <TitleTypography variant="h6">LIQUIDITY SPREAD ACROSS</TitleTypography>

        <PoolFieldsBox>
          {lpVault.metadata.underlyingPools.map((pool, index) => (
            <PoolFieldTypography key={`${pool}-${index}`} variant="body2">
              {pool}
            </PoolFieldTypography>
          ))}
        </PoolFieldsBox>
      </MellowLPEntryInfoBox>
      {
        <PositionBox>
          <MellowLPPosition
            dataLoading={dataLoading}
            disabled={lpVault.metadata.soon || lpVault.metadata.deprecated}
            handleClick={onSelectItem}
            tokenName={lpVault.metadata.token}
            userDeposit={lpVault.vault.userDeposit}
          />
        </PositionBox>
      }
    </MellowLPEntryContainerBox>
  );
};

export default MellowLPEntry;
