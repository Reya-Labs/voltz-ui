import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AgentProvider } from '@components/contexts';
import PositionTable from './PositionTable';

export default {
  title: 'Interface/PositionTable',
  component: PositionTable,
  args: {
    data: [],
  },
} as ComponentMeta<typeof PositionTable>;

const Template: ComponentStory<typeof PositionTable> = (args) => (
  <AgentProvider>
    <PositionTable {...args} />
  </AgentProvider>
);

export const Basic = Template.bind({});
Basic.args = {};
