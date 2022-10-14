import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BadgeCard } from './BadgeCard';
import React from 'react';

export default {
  title: 'Interface/BadgeCard',
  component: BadgeCard,
  args: {},
} as ComponentMeta<typeof BadgeCard>;

const Template: ComponentStory<typeof BadgeCard> = (args) => <BadgeCard {...args} />;

export const Default = Template.bind({});
const args: React.ComponentProps<typeof BadgeCard> = {
  title: 'Open a VT position',
  variant: 'badge1',
  tier: 'tier2',
  description: 'Looking to collectat that juicy delta. Opening your first VT position',
};
Default.args = args;
