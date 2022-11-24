import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AgentProvider, AMMProvider, SwapFormProvider } from '../../../contexts';
import SwapInfo from './SwapInfo';
import { SwapFormActions, SwapFormModes } from '../SwapForm/types';

import { AMM, InfoPostSwap } from '@voltz-protocol/v1-sdk';

export default {
  title: 'Interface/SwapInfo',
  component: SwapInfo,
  argTypes: {},
} as ComponentMeta<typeof SwapInfo>;

const mockAmm = {
  getCapPercentage: () => Promise.resolve(),
  getFixedApr: () => Promise.resolve(),
  getInstantApy: () => Promise.resolve(),
  hasEnoughUnderlyingTokens: () => true,
  isUnderlyingTokenApprovedForPeriphery: () => true,
  underlyingToken: {
    id: '0x123456789',
    name: 'gil',
  },
} as unknown as AMM;

const mockSwapData = {
  marginRequirement: 55,
  availableNotional: 4000,
  fee: 6.66,
  slippage: 4,
  averageFixedRate: 3,
  expectedApy: [
    [0, 0.5, 1, 1.5, 2.5],
    [1.21, 16, 32, 88, 1955],
  ],
} as unknown as InfoPostSwap;

const NewPositionTemplate: ComponentStory<typeof SwapInfo> = (args) => (
  <AgentProvider>
    <AMMProvider amm={mockAmm}>
      <SwapFormProvider mode={args.mode}>
        <NewPositionSwapForm {...args} />
      </SwapFormProvider>
    </AMMProvider>
  </AgentProvider>
);

// New position
const NewPositionSwapForm: React.FunctionComponent = (args) => {
  const mode = SwapFormModes.NEW_POSITION;

  return (
    <SwapInfo
      {...args}
      mode={mode}
      formAction={SwapFormActions.SWAP}
      swapSummary={mockSwapData}
      swapSummaryLoading={false}
    />
  );
};
export const newPosition = NewPositionTemplate.bind({});
newPosition.parameters = { controls: { exclude: /^on|is|formState*/ } };
newPosition.args = {
  mode: SwapFormModes.NEW_POSITION,
  protocol: 'aGIL',
};

// Editing margin
const EditMarginTemplate: ComponentStory<typeof SwapInfo> = (args) => (
  <AgentProvider>
    <AMMProvider amm={mockAmm}>
      <SwapFormProvider mode={args.mode}>
        <EditMarginSwapForm {...args} />
      </SwapFormProvider>
    </AMMProvider>
  </AgentProvider>
);

const EditMarginSwapForm: React.FunctionComponent = (args) => {
  const mode = SwapFormModes.EDIT_MARGIN;

  return (
    <SwapInfo
      {...args}
      mode={mode}
      formAction={SwapFormActions.SWAP}
      swapSummary={mockSwapData}
      swapSummaryLoading={false}
      balance={100}
      currentPositionMarginRequirement={10}
      positionMargin={20}
      underlyingTokenName={'GIL'}
    />
  );
};
export const editMargin = EditMarginTemplate.bind({});
editMargin.parameters = { controls: { exclude: /^on|is|formState*/ } };
editMargin.args = {
  mode: SwapFormModes.EDIT_MARGIN,
  protocol: 'aGIL',
};
