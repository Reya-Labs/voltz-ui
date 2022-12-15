import React from 'react';

import { Icon } from '../../../../components/atomic/Icon/Icon';
import {
  APYTypography,
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
  PoolsBox,
} from './Entry.styled';

export const Entry: React.FunctionComponent = () => (
  <EntryBox>
    <EntryTopBox>
      <NameBox>
        <Icon name="token-eth" />
        <NameTypography>Mellow - ETH</NameTypography>
      </NameBox>
      <BalanceTypography>$245K</BalanceTypography>
      <APYTypography>-2.33%</APYTypography>
      <DepositButton to={'unknown'}>DEPOSIT</DepositButton>
    </EntryTopBox>
    <EntryBottomBox>
      <HeaderBox>
        <HeaderMaturityTypography>MATURITY</HeaderMaturityTypography>
        <HeaderDistributionTypography>DISTRIBUTION</HeaderDistributionTypography>
        <HeaderBalanceTypography>CURRENT BALANCE</HeaderBalanceTypography>
        <HeaderPoolsTypography>POOLS</HeaderPoolsTypography>
      </HeaderBox>
      <EntryInfo>
        <MaturityInfoBox>
          <MaturityDateTypography>31/12/2022 -</MaturityDateTypography>
          <MaturityCompleteTypography>&nbsp;Completed</MaturityCompleteTypography>
        </MaturityInfoBox>
        <DistributionBox>0%</DistributionBox>
        <BalanceBox>$3.9K</BalanceBox>
        <PoolsBox>2</PoolsBox>
        <ManageButton to={'manage'}>Manage</ManageButton>
      </EntryInfo>
    </EntryBottomBox>
  </EntryBox>
);
