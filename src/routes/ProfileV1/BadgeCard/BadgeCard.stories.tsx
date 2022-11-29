import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { BadgeCard } from './BadgeCard';

export default {
  title: 'Interface/BadgeCardV1',
  component: BadgeCard,
  args: {},
} as ComponentMeta<typeof BadgeCard>;

const Template: ComponentStory<typeof BadgeCard> = (args) => <BadgeCard {...args} />;

export const Default = Template.bind({});
const args: React.ComponentProps<typeof BadgeCard> = {
  variant: 'leverageCrowbar',
};
Default.args = args;
