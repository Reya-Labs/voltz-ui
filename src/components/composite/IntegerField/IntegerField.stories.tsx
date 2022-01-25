import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import IntegerField from './IntegerField';

export default {
  title: 'Composite/IntegerField',
  component: IntegerField,
  argTypes: {
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    error: { control: 'boolean' },
  },
} as ComponentMeta<typeof IntegerField>;

const Template: ComponentStory<typeof IntegerField> = (args) => <IntegerField {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
