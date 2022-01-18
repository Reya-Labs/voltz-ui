import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import IntegerInput from './IntegerInput';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Composite/IntegerInput',
  component: IntegerInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof IntegerInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof IntegerInput> = (args) => <IntegerInput {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
