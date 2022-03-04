import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AgentProvider } from '@components/contexts';
import { data } from '@utilities';
import AMMTable from './AMMTable';

export default {
  title: 'Interface/AMMTable',
  component: AMMTable,
  args: {
    data: data.data,
  },
} as ComponentMeta<typeof AMMTable>;

const Template: ComponentStory<typeof AMMTable> = (args) => (
  <AgentProvider>
    <AMMTable {...args} />
  </AgentProvider>
);

export const Basic = Template.bind({});
Basic.args = {};
