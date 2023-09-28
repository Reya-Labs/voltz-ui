import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { NotionalSwapHorizontalUI } from '.';

export default {
  title: 'Components/NotionalSwapHorizontalUI',
  component: NotionalSwapHorizontalUI,
  args: {},
} as ComponentMeta<typeof NotionalSwapHorizontalUI>;

const Template: ComponentStory<typeof NotionalSwapHorizontalUI> = (args) => (
  <NotionalSwapHorizontalUI {...args} />
);

export const Default = Template.bind({});
const args: React.ComponentProps<typeof NotionalSwapHorizontalUI> = {
  fixedRateInfo: 5.49,
  variableRateInfo: 2.49,
  loading: false,
  onModeChange: () => {},
  mode: 'fixed',
  payFixedRateInfo: 7.89,
};
Default.args = args;

export const WithLoading = Template.bind({});
const withLoadingArgs: React.ComponentProps<typeof NotionalSwapHorizontalUI> = {
  fixedRateInfo: 5.49,
  variableRateInfo: 2.49,
  loading: true,
  onModeChange: () => {},
  mode: 'fixed',
  payFixedRateInfo: 7.89,
};
WithLoading.args = withLoadingArgs;
