import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CreateMarginAccountDialog } from './index';

export default {
  title: 'Components/CreateMarginAccountDialog',
  component: CreateMarginAccountDialog,
  args: {},
} as ComponentMeta<typeof CreateMarginAccountDialog>;

const Template: ComponentStory<typeof CreateMarginAccountDialog> = (args) => (
  <CreateMarginAccountDialog {...args} />
);

export const Default = Template.bind({});
const args: React.ComponentProps<typeof CreateMarginAccountDialog> = {
  open: false,
  onCloseClick: () => {},
};
Default.args = args;
