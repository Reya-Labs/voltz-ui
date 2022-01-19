import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PoolForm from './PoolForm';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Interface/PoolForm',
  component: PoolForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PoolForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PoolForm> = (args) => <PoolForm {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
