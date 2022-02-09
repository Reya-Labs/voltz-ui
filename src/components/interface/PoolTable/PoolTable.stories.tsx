import React from 'react';
import { DateTime, Duration } from 'luxon';
import { ComponentStory, ComponentMeta } from '@storybook/react';

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

const Template: ComponentStory<typeof PoolTable> = (args) => <PoolTable {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
