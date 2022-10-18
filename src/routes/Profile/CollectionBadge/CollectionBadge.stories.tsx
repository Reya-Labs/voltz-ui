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
  achievedAt: '10/12/22',
  variant: 'leverageCrowbar',
};
Default.args = argsDefault;

export const NotAchieved = Template.bind({});
const argsNotAchieved: React.ComponentProps<typeof CollectionBadge> = {
  variant: 'beWaterMyFriend',
};
NotAchieved.args = argsNotAchieved;
