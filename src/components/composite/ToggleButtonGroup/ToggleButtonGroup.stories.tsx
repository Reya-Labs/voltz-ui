import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ToggleButtonGroup from './ToggleButtonGroup';

export default {
  title: 'Composite/ToggleButtonGroup',
  component: ToggleButtonGroup,
  argTypes: {
    label: { control: 'text' },
  },
} as ComponentMeta<typeof ToggleButtonGroup>;

const Template: ComponentStory<typeof ToggleButtonGroup> = (args) => (
  <ToggleButtonGroup {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  options: ['FIXED', 'VARIABLE'],
};
