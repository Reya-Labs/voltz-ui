import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Ellipsis from './Ellipsis';

export default {
  title: 'Atomic/Ellipsis',
  component: Ellipsis,
} as ComponentMeta<typeof Ellipsis>;

const Template: ComponentStory<typeof Ellipsis> = (args) => <Ellipsis />;

export const Primary = Template.bind({});
Primary.args = { };
