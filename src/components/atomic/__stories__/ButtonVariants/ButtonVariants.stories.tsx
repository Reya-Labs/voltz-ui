import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ButtonVariants from './ButtonVariants';

export default {
  title: 'Testing/ButtonVariants',
  component: ButtonVariants,
  argTypes: {},
} as ComponentMeta<typeof ButtonVariants>;

const Template: ComponentStory<typeof ButtonVariants> = (args) => <ButtonVariants {...args} />;

export const All = Template.bind({});
All.args = {};
