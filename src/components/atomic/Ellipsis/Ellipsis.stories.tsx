import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Ellipsis } from './Ellipsis';

export default {
  title: 'Atomic/Ellipsis',
  component: Ellipsis,
  args: {},
} as ComponentMeta<typeof Ellipsis>;

const Template: ComponentStory<typeof Ellipsis> = (args) => <Ellipsis {...args} />;

export const Default = Template.bind({});
Default.args = {};
