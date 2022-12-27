import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ProgressBar } from './ProgressBar';

export default {
  title: 'Atomic/ProgressBar',
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => <ProgressBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  leftContent: 'Power',
  rightContent: '1.21 GWatt',
  percentageComplete: 88,
};
