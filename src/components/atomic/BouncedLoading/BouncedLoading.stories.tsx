import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { BouncedLoading } from './BouncedLoading';

export default {
  title: 'Atomic/BouncedLoading',
  component: BouncedLoading,
  args: {},
} as ComponentMeta<typeof BouncedLoading>;

const Template: ComponentStory<typeof BouncedLoading> = (args) => <BouncedLoading {...args} />;

export const Default = Template.bind({});
Default.args = {};
