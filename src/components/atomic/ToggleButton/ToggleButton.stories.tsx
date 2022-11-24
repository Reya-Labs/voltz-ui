import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AgentProvider } from '../../../contexts';
import ToggleButton from './ToggleButton';

export default {
  title: 'Atomic/ToggleButton',
  component: ToggleButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ToggleButton>;

const Template: ComponentStory<typeof ToggleButton> = (args) => (
  <AgentProvider>
    <ToggleButton {...args} />
  </AgentProvider>
);

export const Basic = Template.bind({});
Basic.args = {
  children: 'APE',
};
