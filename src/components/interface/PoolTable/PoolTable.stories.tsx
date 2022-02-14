import React from 'react';
import { DateTime, Duration } from 'luxon';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AgentProvider, Agents } from '@components/contexts';
import { TEMPORARY_Pool } from './types';
import PoolTable from './PoolTable';

const data: TEMPORARY_Pool[] = [
  {
    protocol: 'aUSDC',
    startDate: DateTime.now().minus(Duration.fromObject({ weeks: 1 })),
    endDate: DateTime.now().plus(Duration.fromObject({ weeks: 3 })),
    fixedApr: 5,
    variableApr: 15,
    positions: [
      {
        margin: 1000000,
        notional: 100000,
        agent: Agents.VARIABLE_TRADER,
      },
    ],
  },
  {
    protocol: 'cDAI',
    startDate: DateTime.now().minus(Duration.fromObject({ weeks: 2 })),
    endDate: DateTime.now().plus(Duration.fromObject({ weeks: 2 })),
    fixedApr: 7,
    variableApr: 10,
    positions: [
      {
        margin: 100000,
        notional: 10000,
        agent: Agents.FIXED_TRADER,
      },
    ],
  },
];

export default {
  title: 'Interface/PoolTable',
  component: PoolTable,
  args: {
    data,
  },
} as ComponentMeta<typeof PoolTable>;

const Template: ComponentStory<typeof PoolTable> = (args) => (
  <AgentProvider>
    <PoolTable {...args} />
  </AgentProvider>
);

export const Basic = Template.bind({});
Basic.args = {};
