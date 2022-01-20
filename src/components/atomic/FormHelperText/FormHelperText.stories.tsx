import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FormHelperText from './FormHelperText';

export default {
  title: 'Atomic/FormHelperText',
  component: FormHelperText,
} as ComponentMeta<typeof FormHelperText>;

const Template: ComponentStory<typeof FormHelperText> = (args) => <FormHelperText {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
