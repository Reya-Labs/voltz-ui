import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

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
