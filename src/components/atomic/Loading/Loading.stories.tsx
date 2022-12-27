import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Loading } from './Loading';

export default {
  title: 'Atomic/Loading',
  component: Loading,
  args: {},
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => <Loading {...args} />;

export const Default = Template.bind({});
Default.args = {};
