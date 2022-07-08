import { DateTime, Duration } from 'luxon';

import { Agents } from '@contexts';

const data = [
  {
    id: 'fe1950d7-6ac8-41e1-b68f-d68496647589',
    protocol: 'aUSDC',
    startDate: DateTime.now().minus(Duration.fromObject({ weeks: 1 })),
    endDate: DateTime.now().plus(Duration.fromObject({ weeks: 3 })),
    fixedApr: 5,
    variableApy: 15,
    positions: [
      {
        id: '222fd72e-ed01-4fe6-b9ca-a237f05c988d',
        margin: 1000000,
        notional: 100000,
        agent: Agents.FIXED_TRADER,
      },
      {
        id: '2181b6a9-9aef-4b86-99c0-478e553a46db',
        margin: 1050000,
        notional: 105000,
        agent: Agents.FIXED_TRADER,
      },
      {
        id: '7ddd08f9-18ad-4b00-b665-65076d24f8b8',
        margin: 102300,
        notional: 10300,
        agent: Agents.LIQUIDITY_PROVIDER,
      },
    ],
  },
  {
    id: 'e0e9625c-56f2-491b-8ce8-60d8df56aa37',
    protocol: 'cDAI',
    startDate: DateTime.now().minus(Duration.fromObject({ weeks: 2 })),
    endDate: DateTime.now().plus(Duration.fromObject({ weeks: 2 })),
    fixedApr: 7,
    variableApy: 10,
    positions: [
      {
        id: 'f330efe9-d850-43c2-9b7d-4c8fa9f4f43c',
        margin: 100000,
        notional: 10000,
        agent: Agents.VARIABLE_TRADER,
      },
      {
        id: '082d16aa-2e45-4195-bd5e-8e0a1aeed32d',
        margin: 100000,
        notional: 10000,
        agent: Agents.LIQUIDITY_PROVIDER,
      },
      {
        id: 'df82de15-8dea-4672-8ee3-cefd0ec51231',
        margin: 1023000,
        notional: 1023000,
        agent: Agents.LIQUIDITY_PROVIDER,
      },
    ],
  },
  {
    id: '4b546923-c398-4d79-a068-7c2d193a1733',
    protocol: 'cUSDC',
    startDate: DateTime.now().minus(Duration.fromObject({ weeks: 3 })),
    endDate: DateTime.now().plus(Duration.fromObject({ weeks: 7 })),
    fixedApr: 4,
    variableApy: 11,
    positions: [
      {
        id: 'eddbde97-750a-4887-805e-511b882d10fa',
        margin: 100000,
        notional: 10000,
        agent: Agents.FIXED_TRADER,
      },
      {
        id: '9b946bd0-6965-4b86-8b3e-51b1eac93f07',
        margin: 100000,
        notional: 10000,
        agent: Agents.VARIABLE_TRADER,
      },
      {
        id: '648ee585-1c24-4140-b8de-3905c2eac3d7',
        margin: 100000,
        notional: 10000,
        agent: Agents.LIQUIDITY_PROVIDER,
      },
      {
        id: '88392c0e-55b3-4b97-959a-6ec43b2a0d69',
        margin: 1023000,
        notional: 1023000,
        agent: Agents.LIQUIDITY_PROVIDER,
      },
    ],
  },
];

export default data;
