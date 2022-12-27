import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Tick } from './Tick';

export default {
  title: 'Atomic/Tick',
  component: Tick,
} as ComponentMeta<typeof Tick>;

const Template: ComponentStory<typeof Tick> = (args) => <Tick {...args} />;

export const Default = Template.bind({});
Default.args = {};
