import React from 'react';
import { generatePath } from 'react-router-dom';

import { Icon } from '../../../../components/atomic/Icon/Icon';
import { formatPOSIXTimestamp } from '../../../../utilities/date';
import { compactFormat } from '../../../../utilities/number';
import { routes } from '../../../paths';
import {
  CurrentBalanceBox,
  DepositButton,
  DistributionBox,
  HeaderBalanceTypography,
  HeaderBox,
  HeaderDistributionTypography,
  HeaderMaturityTypography,
  HeaderPoolsTypography,
  ManageButton,
  MaturityCompleteTypography,
  MaturityDateTypography,
  MaturityInfoBox,
  NameBox,
  NameTypography,
  NegativeAPYTypography,
  PoolsCountBox,
  PositiveAPYTypography,
  TotalBalanceTypography,
  VaultListItemBottomBox,
  VaultListItemBox,
  VaultListItemInfo,
  VaultListItemTopBox,
} from './VaultListItem.styled';

export type VaultListItemProps = {
  id: string;
  token: string;
  totalBalance: number;
  totalApy: number;
  vaults: {
    maturityTimestampMS: number;
    isCompleted: boolean;
    poolsCount: number;
    currentBalance: number;
    distribution: number;
  }[];
  depositable: boolean;
  vaultIndex: number;
};
export const VaultListItem: React.FunctionComponent<VaultListItemProps> = ({
  vaults,
  totalApy,
  totalBalance,
  token,
  depositable,
  id,
  vaultIndex,
}) => {
  const TotalAPYTypography = totalApy >= 0 ? PositiveAPYTypography : NegativeAPYTypography;
  return (
    <VaultListItemBox>
      <VaultListItemTopBox>
        <NameBox>
          <Icon name={`token-${token.toLowerCase() as 'eth' | 'dai' | 'lido' | 'usdc' | 'usdt'}`} />
          <NameTypography>Mellow - {token.toUpperCase()}</NameTypography>
        </NameBox>
        <TotalBalanceTypography>
          ${compactFormat(totalBalance).toUpperCase()}
        </TotalBalanceTypography>
        <TotalAPYTypography>{totalApy}%</TotalAPYTypography>
        {depositable ? (
          <DepositButton
            to={`/${generatePath(routes.LP_OPTIMISERS_DEPOSIT_FORM, {
              actions: 'deposit',
              vaultId: id,
            })}`}
          >
            DEPOSIT
          </DepositButton>
        ) : null}
      </VaultListItemTopBox>
      <VaultListItemBottomBox>
        <HeaderBox>
          <HeaderMaturityTypography>MATURITY</HeaderMaturityTypography>
          <HeaderDistributionTypography>DISTRIBUTION</HeaderDistributionTypography>
          <HeaderBalanceTypography>CURRENT BALANCE</HeaderBalanceTypography>
          <HeaderPoolsTypography>POOLS</HeaderPoolsTypography>
        </HeaderBox>
        {vaults.map(
          ({ poolsCount, currentBalance, distribution, isCompleted, maturityTimestampMS }) => (
            <VaultListItemInfo key={maturityTimestampMS}>
              <MaturityInfoBox>
                <MaturityDateTypography>
                  {formatPOSIXTimestamp(maturityTimestampMS)}
                  {isCompleted ? ' -' : ''}
                </MaturityDateTypography>
                {isCompleted ? (
                  <MaturityCompleteTypography>&nbsp;Completed</MaturityCompleteTypography>
                ) : null}
              </MaturityInfoBox>
              <DistributionBox>{distribution}%</DistributionBox>
              <CurrentBalanceBox>${compactFormat(currentBalance)}</CurrentBalanceBox>
              <PoolsCountBox>{poolsCount}</PoolsCountBox>
              {isCompleted ? (
                <ManageButton
                  to={`/${generatePath(routes.LP_OPTIMISERS_WITHDRAW_ROLLOVER_FORM, {
                    actions: 'manage',
                    vaultId: id,
                    vaultIndex: vaultIndex.toString(),
                  })}`}
                >
                  Manage
                </ManageButton>
              ) : null}
            </VaultListItemInfo>
          ),
        )}
      </VaultListItemBottomBox>
    </VaultListItemBox>
  );
};
