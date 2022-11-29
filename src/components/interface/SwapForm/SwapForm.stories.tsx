import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AMM, InfoPostSwap } from '@voltz-protocol/v1-sdk';
import { DateTime, Duration } from 'luxon';
import React from 'react';

import { AgentProvider } from '../../../contexts/AgentContext/AgentProvider';
import { AMMProvider } from '../../../contexts/AMMContext/AMMContext';
import {
  SwapFormSubmitButtonHintStates,
  SwapFormSubmitButtonStates,
} from '../../../contexts/SwapFormContext/enums';
import {
  SwapFormProvider,
  useSwapFormContext,
} from '../../../contexts/SwapFormContext/SwapFormContext';
import { useTokenApproval } from '../../../hooks/useTokenApproval';
import { SwapForm } from './SwapForm';
import { SwapFormActions, SwapFormModes } from './types';

export default {
  title: 'Interface/SwapForm',
  component: SwapForm,
  argTypes: {
    onSubmit: { action: 'clicked' },
  },
} as ComponentMeta<typeof SwapForm>;

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
} as unknown as InfoPostSwap;

const mockTokenApprovals = {
  approving: false,
  approveUnderlyingTokenForPeriphery: () => Promise.resolve(),
  checkingApprovals: false,
  underlyingTokenApprovedForPeriphery: true,
} as ReturnType<typeof useTokenApproval>;

// Creating a new position
const NewPositionTemplate: ComponentStory<typeof SwapForm> = (args) => (
  <AgentProvider>
    <AMMProvider amm={mockAmm}>
      <SwapFormProvider mode={SwapFormModes.NEW_POSITION}>
        <NewPositionSwapForm {...args} />
      </SwapFormProvider>
    </AMMProvider>
  </AgentProvider>
);
const NewPositionSwapForm: React.FunctionComponent = (args) => {
  const mode = SwapFormModes.NEW_POSITION;
  const form = useSwapFormContext();

  return (
    <SwapForm
      {...args}
      approvalsNeeded={false}
      errors={form.errors}
      formAction={SwapFormActions.SWAP}
      formState={form.state}
      hintState={SwapFormSubmitButtonHintStates.READY_TO_TRADE}
      isFormValid={form.isValid}
      isTradeVerified={true}
      mode={mode}
      submitButtonState={SwapFormSubmitButtonStates.TRADE_FIXED}
      swapInfo={mockSwapData}
      swapInfoLoading={false}
      tokenApprovals={mockTokenApprovals}
      onCancel={() => alert('cancel')}
      onChangeLeverage={form.setLeverage}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction}
      onChangeNotional={form.setNotional}
      onSubmit={() => form.validate()}
    />
  );
};
export const NewPosition = NewPositionTemplate.bind({});
NewPosition.parameters = { controls: { exclude: /^on|is|formState*/ } };
NewPosition.args = {
  protocol: 'aGIL',
  startDate: DateTime.now().minus(Duration.fromObject({ weeks: 2 })),
  endDate: DateTime.now().plus(Duration.fromObject({ weeks: 5 })),
};

// // Editing the margin of a position
const EditingMarginTemplate: ComponentStory<typeof SwapForm> = (args) => (
  <AgentProvider>
    <AMMProvider amm={mockAmm}>
      <SwapFormProvider mode={SwapFormModes.EDIT_MARGIN}>
        <EditingMarginSwapForm {...args} />
      </SwapFormProvider>
    </AMMProvider>
  </AgentProvider>
);
const EditingMarginSwapForm: React.FunctionComponent = (args) => {
  const mode = SwapFormModes.EDIT_MARGIN;
  const form = useSwapFormContext();

  return (
    <SwapForm
      {...args}
      approvalsNeeded={false}
      errors={form.errors}
      formAction={SwapFormActions.SWAP}
      formState={form.state}
      hintState={SwapFormSubmitButtonHintStates.READY_TO_TRADE}
      isFormValid={form.isValid}
      isTradeVerified={true}
      mode={mode}
      submitButtonState={SwapFormSubmitButtonStates.TRADE_FIXED}
      swapInfo={mockSwapData}
      swapInfoLoading={false}
      tokenApprovals={mockTokenApprovals}
      onCancel={() => alert('cancel')}
      onChangeLeverage={form.setLeverage}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction}
      onChangeNotional={form.setNotional}
      onSubmit={() => form.validate()}
    />
  );
};
export const EditingMargin = EditingMarginTemplate.bind({});
EditingMargin.parameters = { controls: { exclude: /^on|is|formState*/ } };
EditingMargin.args = {
  protocol: 'aGIL',
  startDate: DateTime.now().minus(Duration.fromObject({ weeks: 2 })),
  endDate: DateTime.now().plus(Duration.fromObject({ weeks: 5 })),
};
