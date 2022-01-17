import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Typography from './Typography';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atomic/Typography',
  component: Typography,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Typography>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Typography> = (args) => <Typography {...args} />;

export const HeadingOne = Template.bind({});
HeadingOne.args = {
  children: 'Heading 1',
  variant: 'h1',
};

export const HeadingTwo = Template.bind({});
HeadingTwo.args = {
  children: 'Heading 2',
  variant: 'h2',
};

export const Body = Template.bind({});
Body.args = {
  children: 'Body',
  variant: 'body',
};
