import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { NoPositionsOrVaultsFound } from './NoPositionsOrVaultsFound';

export default {
  title: 'Interface/NoPositionsOrVaultsFound',
  component: NoPositionsOrVaultsFound,
  args: {},
} as ComponentMeta<typeof NoPositionsOrVaultsFound>;

const Template: ComponentStory<typeof NoPositionsOrVaultsFound> = (args) => (
  <NoPositionsOrVaultsFound {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'You haven’t provided liquidity to any Optimiser yet.',
  navigateToText: 'LP OPTIMISERS',
  navigateTo: 'https://app.voltz.xyz',
  description: 'Open your first position here:',
};

export const NoNavigation = Template.bind({});
NoNavigation.args = {
  title: 'You haven’t provided liquidity to any Optimiser yet.',
  description: 'Open your first position here:',
};
