import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DebouncedIntegerField from './DebouncedIntegerField';

export default {
  title: 'Composite/DebouncedIntegerField',
  component: DebouncedIntegerField,
  argTypes: {
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    error: { control: 'boolean' },
  },
} as ComponentMeta<typeof DebouncedIntegerField>;

const Template: ComponentStory<typeof DebouncedIntegerField> = (args) => (
  <DebouncedIntegerField {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};
