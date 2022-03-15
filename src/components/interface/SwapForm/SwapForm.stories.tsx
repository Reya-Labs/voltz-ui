import React from 'react';
import { DateTime, Duration } from 'luxon';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AgentProvider } from '@components/contexts';
import { useStateMemo } from '@hooks';
import { HandleSubmitSwapFormArgs } from './types';
import SwapForm, { SwapFormProps } from './SwapForm';

export default {
  title: 'Interface/SwapForm',
  component: SwapForm,
  argTypes: { onSubmit: { action: 'clicked' } },
} as ComponentMeta<typeof SwapForm>;

type SwapFormWrapperProps = Omit<
  SwapFormProps,
  | 'onChangeAgent'
  | 'onChangeFixedLow'
  | 'onChangeFixedHigh'
  | 'onChangeLeverage'
  | 'onChangePartialCollateralization'
  | 'onChangeMargin'
>;

const SwapFormWrapper: React.FunctionComponent<SwapFormWrapperProps> = ({ ...props }) => {
  const [fixedLow, setFixedLow] = useStateMemo<SwapFormProps['fixedLow']>(props.fixedLow);
  const [fixedHigh, setFixedHigh] = useStateMemo<SwapFormProps['fixedHigh']>(props.fixedHigh);
  const [leverage, setLeverage] = useStateMemo<SwapFormProps['leverage']>(props.leverage);
  const [margin, setMargin] = useStateMemo<SwapFormProps['margin']>(props.margin);
  const [partialCollateralization, setPartialCollateralization] = useStateMemo<
    SwapFormProps['partialCollateralization']
  >(props.partialCollateralization);
  const handleSubmit = (args: HandleSubmitSwapFormArgs) => props.onSubmit(args);

  return (
    <AgentProvider>
      <SwapForm
        {...props}
        fixedLow={fixedLow}
        fixedHigh={fixedHigh}
        leverage={leverage}
        margin={margin}
        partialCollateralization={partialCollateralization}
        onChangeFixedLow={setFixedLow}
        onChangeFixedHigh={setFixedHigh}
        onChangeLeverage={setLeverage}
        onChangeMargin={setMargin}
        onChangePartialCollateralization={setPartialCollateralization}
        onSubmit={handleSubmit}
      />
    </AgentProvider>
  );
};

const Template: ComponentStory<typeof SwapForm> = (args) => <SwapFormWrapper {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  protocol: 'aUSDC',
  fixedApr: 5,
  variableApr: 15,
  startDate: DateTime.now().minus(Duration.fromObject({ weeks: 2 })),
  endDate: DateTime.now().plus(Duration.fromObject({ weeks: 5 })),
};
