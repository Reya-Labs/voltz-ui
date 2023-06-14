import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { NoVaultFound } from './NoVaultFound';

export default {
  title: 'Interface/NoVaultFound',
  component: NoVaultFound,
  args: {},
} as ComponentMeta<typeof NoVaultFound>;

const Template: ComponentStory<typeof NoVaultFound> = (args) => <NoVaultFound {...args} />;

export const Default = Template.bind({});
Default.args = {};
