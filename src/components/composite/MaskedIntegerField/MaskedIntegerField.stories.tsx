import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { MaskedIntegerField } from './MaskedIntegerField';

export default {
  title: 'Composite/MaskedIntegerField',
  component: MaskedIntegerField,
  argTypes: {
    disabled: { control: 'boolean' },
    label: { control: 'text', defaultValue: 'Notional margin' },
    placeholder: { control: 'text', defaultValue: 'USDC' },
    suffix: { control: 'text', defaultValue: 'USDC' },
    error: { control: 'boolean' },
  },
} as ComponentMeta<typeof MaskedIntegerField>;

const Template: ComponentStory<typeof MaskedIntegerField> = (args) => (
  <MaskedIntegerField {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};
