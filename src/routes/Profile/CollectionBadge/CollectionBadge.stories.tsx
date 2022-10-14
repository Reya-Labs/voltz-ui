import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CollectionBadge } from './CollectionBadge';
import React from 'react';

export default {
  title: 'Interface/CollectionBadge',
  component: CollectionBadge,
  args: {},
} as ComponentMeta<typeof CollectionBadge>;

const Template: ComponentStory<typeof CollectionBadge> = (args) => <CollectionBadge {...args} />;

export const Default = Template.bind({});
const argsDefault: React.ComponentProps<typeof CollectionBadge> = {
  title: 'LEVERAGE CROWBAR',
  tier: 'tier2',
  achievedAt: '10/12/2022',
  variant: 'leverageCrowbar',
};
Default.args = argsDefault;

export const NotAchieved = Template.bind({});
const argsNotAchieved: React.ComponentProps<typeof CollectionBadge> = {
  title: 'BE WATER MY FRIEND',
  tier: 'legendary',
  variant: 'beWaterMyFriend',
};
NotAchieved.args = argsNotAchieved;
