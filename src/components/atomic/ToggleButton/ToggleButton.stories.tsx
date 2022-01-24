import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ToggleButton from './ToggleButton';

export default {
  title: 'Atomic/ToggleButton',
  component: ToggleButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ToggleButton>;

const Template: ComponentStory<typeof ToggleButton> = (args) => <ToggleButton {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: 'APE',
};
