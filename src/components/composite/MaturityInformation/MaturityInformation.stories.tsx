import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DateTime, Duration } from 'luxon';
import React from 'react';

import { MaturityInformation } from './MaturityInformation';

export default {
  title: 'Composite/MaturityInformation',
  component: MaturityInformation,
  argTypes: {
    label: { control: 'text' },
    startDate: { control: 'date' },
    endDate: { control: 'date' },
  },
} as ComponentMeta<typeof MaturityInformation>;

const Template: ComponentStory<typeof MaturityInformation> = ({
  startDate: startDateMillis,
  endDate: endDateMillis,
  ...args
}) => {
  const startDate = startDateMillis
    ? DateTime.fromMillis(startDateMillis as unknown as number)
    : undefined;
  const endDate = endDateMillis
    ? DateTime.fromMillis(endDateMillis as unknown as number)
    : undefined;

  return <MaturityInformation {...args} endDate={endDate} startDate={startDate} />;
};

export const Basic = Template.bind({});
Basic.args = {
  startDate: DateTime.now()
    .minus(Duration.fromObject({ weeks: 1 }))
    .toMillis() as unknown as DateTime,
  endDate: DateTime.now()
    .plus(Duration.fromObject({ weeks: 3 }))
    .toMillis() as unknown as DateTime,
};
