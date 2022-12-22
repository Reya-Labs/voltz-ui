import React from 'react';
import { generatePath } from 'react-router-dom';

import { Icon } from '../../../../components/atomic/Icon/Icon';
import {
  AutomaticRolloverToggle,
  AutomaticRolloverToggleProps,
} from '../../../../components/interface/AutomaticRolloverToggle/AutomaticRolloverToggle';
import { formatPOSIXTimestamp } from '../../../../utilities/date';
import { doNothing } from '../../../../utilities/doNothing';
import { compactFormat } from '../../../../utilities/number';
import { routes } from '../../../paths';
import {
  ActionsBox,
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
  TokenTypography,
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
  automaticRolloverState: AutomaticRolloverToggleProps['automaticRolloverState'];
  onChangeAutomaticRolloverStatePromise: (
    vaultId: string,
    automaticRolloverState: AutomaticRolloverToggleProps['automaticRolloverState'],
  ) => Promise<void>;
};
export const VaultListItem: React.FunctionComponent<VaultListItemProps> = ({
  vaults,
  totalApy,
  totalBalance,
  token,
  depositable,
  id,
  automaticRolloverState,
  onChangeAutomaticRolloverStatePromise = doNothing,
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
          {compactFormat(totalBalance).toUpperCase()}
          <TokenTypography>{token.toUpperCase()}</TokenTypography>
        </TotalBalanceTypography>
        <TotalAPYTypography>{totalApy}%</TotalAPYTypography>
        <ActionsBox>
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
          <AutomaticRolloverToggle
            automaticRolloverState={automaticRolloverState}
            disabled={false}
            showTooltip={false}
            onChangePromise={async (value) =>
              await onChangeAutomaticRolloverStatePromise(id, value)
            }
          />
        </ActionsBox>
      </VaultListItemTopBox>
      <VaultListItemBottomBox>
        <HeaderBox>
          <HeaderMaturityTypography>MATURITY</HeaderMaturityTypography>
          <HeaderDistributionTypography>DISTRIBUTION</HeaderDistributionTypography>
          <HeaderBalanceTypography>CURRENT BALANCE</HeaderBalanceTypography>
          <HeaderPoolsTypography>POOLS</HeaderPoolsTypography>
        </HeaderBox>
        {vaults.map(
          (
            { poolsCount, currentBalance, distribution, isCompleted, maturityTimestampMS },
            vaultIndex,
          ) => {
            if (currentBalance <= 0) {
              // can't replace this with filter because it screws up vaultIndex
              return null;
            }

            return (
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
                <DistributionBox>
                  {distribution}
                  <TokenTypography>%</TokenTypography>
                </DistributionBox>
                <CurrentBalanceBox>
                  {compactFormat(currentBalance)}
                  <TokenTypography>{token.toUpperCase()}</TokenTypography>
                </CurrentBalanceBox>
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
            );
          },
        )}
      </VaultListItemBottomBox>
    </VaultListItemBox>
  );
};
