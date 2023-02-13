import React from 'react';

import { OptimiserInfo } from '../../../../../app/features/lp-optimisers';
import { isCostReductionFlowEnabled } from '../../../../../utilities/is-cost-reduction-flow-enabled';
import { VaultField } from '../../../VaultField/VaultField';
import { BatchBudgetTrigger } from '../../../VaultFormRoute/Form/BatchBudgetTrigger/BatchBudgetTrigger';
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
  lpVault: OptimiserInfo;
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
          expectedApys={lpVault.vaults.map((v) => v.estimatedHistoricApy)}
          title={lpVault.title}
          token={lpVault.tokenName}
          weights={lpVault.vaults.map((v) => v.defaultWeight)}
        />

        <DescriptionTypography data-testid="VaultEntry-DescriptionTypography" variant="h6">
          {lpVault.description}
        </DescriptionTypography>

        <PoolOutlineBox>
          <Tag>
            {`${lpVault.underlyingPools.length} ${lpVault.tokenName} ${
              lpVault.underlyingPools.length === 1 ? 'POOL' : 'POOLS'
            }`}
          </Tag>

          <DescriptionTypography variant="h6">LIQUIDITY SPREAD ACROSS</DescriptionTypography>

          <PoolFieldsBox>
            {lpVault.underlyingPools.map((pool, index) => (
              <PoolFieldTypography key={`${pool}-${index}`} variant="body2">
                {pool}
              </PoolFieldTypography>
            ))}
          </PoolFieldsBox>
        </PoolOutlineBox>
        {isCostReductionFlowEnabled() && !dataLoading ? (
          <BatchBudgetTrigger lpVault={lpVault} />
        ) : null}
      </VaultEntryInfoBox>

      <PositionBox>
        <MellowPosition
          dataLoading={dataLoading}
          disabled={lpVault.soon || !lpVault.depositable}
          handleClick={onSelectItem}
          tokenName={lpVault.tokenName}
          userDeposit={lpVault.userOptimiserDeposit}
        />
      </PositionBox>
    </VaultEntryContainerBox>
  );
};
