import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { AchievedBadge } from './AchievedBadge';

export default {
  title: 'Interface/AchievedBadgeV1',
  component: AchievedBadge,
  args: {},
} as ComponentMeta<typeof AchievedBadge>;

const Template: ComponentStory<typeof AchievedBadge> = (args) => <AchievedBadge {...args} />;

export const Default = Template.bind({});
const argsDefault: React.ComponentProps<typeof AchievedBadge> = {
  achievedAt: new Date('02/02/2022').valueOf(),
  variant: 'leverageCrowbar',
};
Default.args = argsDefault;

export const NotAchieved = Template.bind({});
const argsNotAchieved: React.ComponentProps<typeof AchievedBadge> = {
  variant: 'beWaterMyFriend',
};
NotAchieved.args = argsNotAchieved;

export const Loading = Template.bind({});
const argsLoading: React.ComponentProps<typeof AchievedBadge> = {
  variant: 'beWaterMyFriend',
  loading: true,
};
Loading.args = argsLoading;
