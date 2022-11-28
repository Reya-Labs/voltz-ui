import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ProfilePageNoWallet } from './ProfilePageNoWallet';

export default {
  title: 'Interface/ProfilePageNoWalletV1',
  component: ProfilePageNoWallet,
  args: {},
} as ComponentMeta<typeof ProfilePageNoWallet>;

const Template: ComponentStory<typeof ProfilePageNoWallet> = (args) => (
  <ProfilePageNoWallet {...args} />
);

export const Default = Template.bind({});
Default.args = {};
