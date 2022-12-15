import React from 'react';

import { Entry, EntryProps } from './Entry/Entry';
import { Header } from './Header/Header';
import { LPOptimisersTypography, OptimisersBox } from './Optimisers.styled';

const entries: EntryProps[] = [
  {
    id: 'eth',
    token: 'eth',
    totalBalance: 245000,
    totalApy: -2.33,
    entries: [
      {
        maturityTimestampMS: 1672441200000,
        isCompleted: true,
        pools: 2,
        balance: 39000,
        distribution: 0,
      },
      {
        maturityTimestampMS: 1680213600000,
        isCompleted: false,
        pools: 2,
        balance: 390000,
        distribution: 70,
      },
      {
        maturityTimestampMS: 1703977200000,
        isCompleted: false,
        pools: 2,
        balance: 390,
        distribution: 30,
      },
    ],
  },
  {
    id: 'dai',
    token: 'dai',
    totalBalance: 245000,
    totalApy: 2.33,
    entries: [
      {
        maturityTimestampMS: 1672441200000,
        isCompleted: true,
        pools: 2,
        balance: 3900,
        distribution: 0,
      },
      {
        maturityTimestampMS: 1680213600000,
        isCompleted: false,
        pools: 2,
        balance: 3900,
        distribution: 70,
      },
      {
        maturityTimestampMS: 1703977200000,
        isCompleted: false,
        pools: 2,
        balance: 3900,
        distribution: 30,
      },
    ],
  },
];

export const Optimisers: React.FunctionComponent = () => {
  return (
    <OptimisersBox>
      <LPOptimisersTypography>LP OPTIMISERS</LPOptimisersTypography>
      <Header />
      {entries.map((entry) => (
        <Entry key={entry.id} {...entry} />
      ))}
    </OptimisersBox>
  );
};
