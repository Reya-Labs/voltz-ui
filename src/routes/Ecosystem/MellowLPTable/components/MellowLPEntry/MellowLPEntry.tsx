import MellowLPPosition from '../MellowLPPosition/MellowLPPosition';
import React from 'react';

import { MellowProduct } from '../../../types';
import { VaultField } from '../../../Common/VaultField';
import {
  DescriptionTypography,
  MellowLPEntryContainerBox,
  MellowLPEntryInfoBox,
  PoolFieldsBox,
  PoolTag,
  PositionBox,
  TitleTypography,
} from './MellowLPEntry.styled';
import { Typography } from '@components/atomic';

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
            <Typography
              variant="body2"
              sx={{
                fontSize: 18,
                textTransform: 'uppercase',
                verticalAlign: 'middle',
                fontWeight: 700,
                letterSpacing: '0.02em',
                lineHeight: '100%',
                marginTop: (theme) => theme.spacing(1),
              }}
              key={pool}
            >
              {pool}
            </Typography>
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
