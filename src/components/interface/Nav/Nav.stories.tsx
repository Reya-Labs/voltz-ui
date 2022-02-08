import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Nav from './Nav';

export default {
  title: 'Interface/Nav',
  component: Nav,
  argTypes: {},
} as ComponentMeta<typeof Nav>;

const Template: ComponentStory<typeof Nav> = (args) => <Nav {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
