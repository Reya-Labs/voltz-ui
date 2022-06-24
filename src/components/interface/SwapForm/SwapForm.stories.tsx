import React from 'react';
import { DateTime, Duration } from 'luxon';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AgentProvider, SwapFormProvider, SwapFormSubmitButtonHintStates, SwapFormSubmitButtonStates, useSwapFormContext } from '@components/contexts';
import SwapForm from './SwapForm';
import { useTokenApproval } from '@hooks';
import { AugmentedAMM } from '@utilities';
import { InfoPostSwap } from '@voltz-protocol/v1-sdk';
import { SwapFormActions, SwapFormModes } from './types';

export default {
  title: 'Interface/SwapForm',
  component: SwapForm,
  argTypes: { 
    onSubmit: { action: 'clicked' } 
  },
} as ComponentMeta<typeof SwapForm>;

const mockAmm = ({
  hasEnoughUnderlyingTokens: () =>  true,
  isFCMApproved: () => true,
  isUnderlyingTokenApprovedForFCM: () => true,
  isUnderlyingTokenApprovedForPeriphery: () => true,
  isYieldBearingTokenApprovedForFCM: () =>  true,
  underlyingToken: {
    id: '0x123456789',
    name: 'gil'
  }
} as unknown) as AugmentedAMM;

const mockSwapData = ({
  marginRequirement: 55,
  availableNotional: 4000,
  fee: 6.66,
  slippage: 4,
  averageFixedRate: 3,
} as unknown) as InfoPostSwap;

const mockTokenApprovals = {
  approving: false,
  approveFCM: () => Promise.resolve(),
  approveUnderlyingTokenForFCM: () => Promise.resolve(),
  approveUnderlyingTokenForPeriphery: () => Promise.resolve(),
  approveYieldBearingTokenForFCM: () => Promise.resolve(),
  checkingApprovals: false,
  FCMApproved: true,
  underlyingTokenApprovedForFCM: true,
  underlyingTokenApprovedForPeriphery: true,
  yieldBearingTokenApprovedForFCM: true
} as ReturnType<typeof useTokenApproval>


// Creating a new position
const NewPositionTemplate: ComponentStory<typeof SwapForm> = (args) => (
  <AgentProvider>
    <SwapFormProvider amm={mockAmm} mode={SwapFormModes.NEW_POSITION}>
      <NewPositionSwapForm {...args} />
    </SwapFormProvider>
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
      formState={form.state} 
      hintState={SwapFormSubmitButtonHintStates.READY_TO_TRADE}
      isFCMAction={false}
      isFCMAvailable={true}
      isFormValid={form.isValid}
      isTradeVerified={true}
      formAction={SwapFormActions.SWAP}
      mode={mode}
      onCancel={() => alert('cancel')}
      onChangeLeverage={form.setLeverage}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction} 
      onChangeNotional={form.setNotional}
      onChangePartialCollateralization={form.setPartialCollateralization}
      onSubmit={() => form.validate()}
      submitButtonState={SwapFormSubmitButtonStates.TRADE_FIXED}
      swapInfo={mockSwapData}
      swapInfoLoading={false}
      tokenApprovals={mockTokenApprovals}
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
    <SwapFormProvider amm={mockAmm} mode={SwapFormModes.EDIT_MARGIN}>
      <EditingMarginSwapForm {...args} />
    </SwapFormProvider>
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
      formState={form.state}
      hintState={SwapFormSubmitButtonHintStates.READY_TO_TRADE}
      isFCMAction={false}
      isFCMAvailable={true}
      isFormValid={form.isValid}
      isTradeVerified={true}
      mode={mode}
      formAction={SwapFormActions.SWAP}
      onCancel={() => alert('cancel')}
      onChangeLeverage={form.setLeverage}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction} 
      onChangeNotional={form.setNotional}
      onChangePartialCollateralization={form.setPartialCollateralization}
      onSubmit={() => form.validate()}
      submitButtonState={SwapFormSubmitButtonStates.TRADE_FIXED}
      swapInfo={mockSwapData}
      swapInfoLoading={false}
      tokenApprovals={mockTokenApprovals}
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