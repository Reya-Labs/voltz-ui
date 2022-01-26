import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Slider from './Slider';

export default {
  title: 'Atomic/Slider',
  component: Slider,
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />;

export const Basic = Template.bind({});
Basic.args = {};

export const Controlled = Template.bind({});
Controlled.args = {
  controlled: true,
  value: 30,
};
