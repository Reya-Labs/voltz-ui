import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PoolForm from './PoolForm';

export default {
  title: 'Interface/PoolForm',
  component: PoolForm,
} as ComponentMeta<typeof PoolForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PoolForm> = (args) => <PoolForm {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
