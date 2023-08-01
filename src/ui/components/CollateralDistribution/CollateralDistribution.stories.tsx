import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CollateralDistribution } from '.';

export default {
  title: 'Components/CollateralDistribution',
  component: CollateralDistribution,
  args: {},
} as ComponentMeta<typeof CollateralDistribution>;

const Template: ComponentStory<typeof CollateralDistribution> = (args) => (
  <CollateralDistribution {...args} />
);

export const Default = Template.bind({});
const args: React.ComponentProps<typeof CollateralDistribution> = {
  distributions: [
    { token: 'dai', percentage: 30, distribution: 1000, distributionUSD: 2000 },
    { token: 'eth', percentage: 25, distribution: 1100, distributionUSD: 2200 },
    { token: 'other', percentage: 20, distribution: 1200, distributionUSD: 2400 },
    { token: 'usdc', percentage: 25, distribution: 1300, distributionUSD: 2600 },
  ],
};
Default.args = args;
