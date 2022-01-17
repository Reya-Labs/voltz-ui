import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Slider from './Slider';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atomic/Slider',
  component: Slider,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Slider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
