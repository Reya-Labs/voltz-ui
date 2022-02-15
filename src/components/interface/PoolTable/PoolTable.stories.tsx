import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AgentProvider } from '@components/contexts';
import { data } from '@utilities';
import PoolTable from './PoolTable';

export default {
  title: 'Interface/PoolTable',
  component: PoolTable,
  args: {
    data: data.data,
  },
} as ComponentMeta<typeof PoolTable>;

const Template: ComponentStory<typeof PoolTable> = (args) => (
  <AgentProvider>
    <PoolTable {...args} />
  </AgentProvider>
);

export const Basic = Template.bind({});
Basic.args = {};
