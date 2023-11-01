import { MarketToken, MarketTokenProps, Pill, Typography } from 'brokoli-ui';
import React from 'react';

import { OptimiserInfo } from '../../../../../../app/features/lp-optimisers';
import { capitalize } from '../../../../../../utilities/capitalize';
import { VaultField } from '../../../../../components/VaultField/VaultField';
import { BatchBudgetTrigger } from '../../../../LPOptimisersForm/Form/BatchBudgetTrigger/BatchBudgetTrigger';
import { MellowPosition } from '../MellowPosition/MellowPosition';
import {
  PoolFieldsBox,
  PoolOutlineBox,
  PositionBox,
  VaultEntryContainerBox,
  VaultEntryInfoBox,
} from './VaultEntry.styled';

export type VaultEntryProps = {
  onSelectItem: () => void;
  lpVault: OptimiserInfo;
};

export const VaultEntry: React.FunctionComponent<VaultEntryProps> = ({
  lpVault,
  onSelectItem,
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

        <Typography
          colorToken="white400"
          data-testid="VaultEntry-DescriptionTypography"
          typographyToken="primaryBodyMediumRegular"
        >
          {lpVault.description}
        </Typography>

        <PoolOutlineBox>
          <Pill colorToken="error" typographyToken="primaryBodySmallRegular" variant="regular">
            {`${lpVault.underlyingPools.length} ${lpVault.tokenName} ${
              lpVault.underlyingPools.length === 1 ? 'POOL' : 'POOLS'
            }`}
          </Pill>

          <Typography colorToken="white400" typographyToken="primaryBodyMediumRegular">
            Liquidity Spread Across
          </Typography>

          <PoolFieldsBox>
            {lpVault.underlyingPools.map((pool, index) => (
              <MarketToken
                key={`${pool}-${index}`}
                colorToken="white100"
                iconSize={24}
                infoFormatter={() => pool}
                market={
                  pool.split(' - ')[0] === 'AAVE V3'
                    ? 'Aave V3'
                    : pool.split(' - ')[0] === 'AAVE V2'
                    ? 'Aave V2'
                    : (capitalize(pool.split(' - ')[0], true) as MarketTokenProps['market'])
                }
                token={
                  pool.split(' - ')[1].split(' ')[0].toLowerCase() as MarketTokenProps['token']
                }
                typographyToken="primaryBodySmallRegular"
              />
            ))}
          </PoolFieldsBox>
        </PoolOutlineBox>
        <BatchBudgetTrigger lpVault={lpVault} />
      </VaultEntryInfoBox>

      <PositionBox>
        <MellowPosition
          disabled={lpVault.soon || !lpVault.depositable}
          handleClick={onSelectItem}
          tokenName={lpVault.tokenName}
          userDeposit={lpVault.userOptimiserDeposit}
        />
      </PositionBox>
    </VaultEntryContainerBox>
  );
};
