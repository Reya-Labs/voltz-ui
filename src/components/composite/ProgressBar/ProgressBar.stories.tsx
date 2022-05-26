import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProgressBar from './ProgressBar';

export default {
  title: 'Composite/ProgressBar',
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => <ProgressBar {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  leftContent: 'Power',
  rightContent: '1.21 GWatt',
  percentageComplete: 88
};
