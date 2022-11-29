import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Typography, TypographyProps } from '../Typography/Typography';
import { Panel } from './Panel';

export default {
  title: 'Atomic/Panel',
  component: Panel,
  argTypes: {
    content: { control: 'text' },
    typographyVariant: { control: 'radio', options: ['h1', 'body1', 'body2'] },
  },
} as ComponentMeta<typeof Panel>;

type TemplateArgs = {
  typographyVariant: string;
  content: string;
};

const Template: ComponentStory<React.FunctionComponent<TemplateArgs>> = ({
  children,
  typographyVariant,
  content,
  ...args
}) => (
  <Panel {...args}>
    <Typography variant={typographyVariant as TypographyProps['variant']}>{content}</Typography>
  </Panel>
);

export const Basic = Template.bind({});
Basic.args = {};
