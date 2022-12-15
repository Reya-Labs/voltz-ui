import React from 'react';

import { Icon } from '../../../../components/atomic/Icon/Icon';
import { formatPOSIXTimestamp } from '../../../../utilities/date';
import {
  BalanceBox,
  BalanceTypography,
  DepositButton,
  DistributionBox,
  EntryBottomBox,
  EntryBox,
  EntryInfo,
  EntryTopBox,
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
  PoolsBox,
  PositiveAPYTypography,
} from './Entry.styled';

export type EntryProps = {
  id: string;
  token: string;
  totalBalance: number;
  totalApy: number;
  entries: {
    maturityTimestampMS: number;
    isCompleted: boolean;
    pools: number;
    balance: number;
    distribution: number;
  }[];
};
export const Entry: React.FunctionComponent<EntryProps> = ({
  entries,
  totalApy,
  totalBalance,
  token,
}) => {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  const TotalAPYTypography = totalApy >= 0 ? PositiveAPYTypography : NegativeAPYTypography;
  return (
    <EntryBox>
      <EntryTopBox>
        <NameBox>
          <Icon name={`token-${token as 'eth' | 'dai' | 'lido' | 'usdc' | 'usdt'}`} />
          <NameTypography>Mellow - {token.toUpperCase()}</NameTypography>
        </NameBox>
        <BalanceTypography>${formatter.format(totalBalance).toUpperCase()}</BalanceTypography>
        <TotalAPYTypography>{totalApy}%</TotalAPYTypography>
        <DepositButton to={'unknown'}>DEPOSIT</DepositButton>
      </EntryTopBox>
      <EntryBottomBox>
        <HeaderBox>
          <HeaderMaturityTypography>MATURITY</HeaderMaturityTypography>
          <HeaderDistributionTypography>DISTRIBUTION</HeaderDistributionTypography>
          <HeaderBalanceTypography>CURRENT BALANCE</HeaderBalanceTypography>
          <HeaderPoolsTypography>POOLS</HeaderPoolsTypography>
        </HeaderBox>
        {entries.map(({ pools, balance, distribution, isCompleted, maturityTimestampMS }) => (
          <EntryInfo key={maturityTimestampMS}>
            <MaturityInfoBox>
              <MaturityDateTypography>
                {formatPOSIXTimestamp(maturityTimestampMS)}
                {isCompleted ? ' -' : ''}
              </MaturityDateTypography>
              {isCompleted ? (
                <MaturityCompleteTypography>&nbsp;Completed</MaturityCompleteTypography>
              ) : null}
            </MaturityInfoBox>
            <DistributionBox>{formatter.format(distribution)}%</DistributionBox>
            <BalanceBox>${formatter.format(balance)}</BalanceBox>
            <PoolsBox>{pools}</PoolsBox>
            {isCompleted ? <ManageButton to={'manage'}>Manage</ManageButton> : null}
          </EntryInfo>
        ))}
      </EntryBottomBox>
    </EntryBox>
  );
};
