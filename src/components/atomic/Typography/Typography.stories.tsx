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

export const HeadingThree = Template.bind({});
HeadingThree.args = {
  children: 'Heading 3',
  variant: 'h3',
};

export const HeadingFour = Template.bind({});
HeadingFour.args = {
  children: 'Heading 4',
  variant: 'h4',
};

export const HeadingFive = Template.bind({});
HeadingFive.args = {
  children: 'Heading 5',
  variant: 'h5',
};

export const HeadingSix = Template.bind({});
HeadingSix.args = {
  children: 'Heading 6',
  variant: 'h6',
};

export const SubtitleOne = Template.bind({});
SubtitleOne.args = {
  children: 'Subtitle 1',
  variant: 'subtitle1',
};

export const SubtitleTwo = Template.bind({});
SubtitleTwo.args = {
  children: 'Subtitle 2',
  variant: 'subtitle2',
};

export const BodyOne = Template.bind({});
BodyOne.args = {
  children: 'Body 1',
  variant: 'body1',
};

export const BodyTwo = Template.bind({});
BodyTwo.args = {
  children: 'Body 2',
  variant: 'body2',
};
