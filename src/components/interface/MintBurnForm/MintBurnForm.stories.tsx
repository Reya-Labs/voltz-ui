import React from 'react';
import { DateTime, Duration } from 'luxon';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AgentProvider } from '@components/contexts';
import { useStateMemo } from '@hooks';
import { HandleSubmitMintBurnFormArgs } from './types';
import MintBurnForm, { MintBurnFormProps } from './MintBurnForm';

export default {
  title: 'Interface/MintBurnForm',
  component: MintBurnForm,
  argTypes: { onSubmit: { action: 'clicked' } },
} as ComponentMeta<typeof MintBurnForm>;

type MintBurnFormWrapperProps = Omit<
  MintBurnFormProps,
  'onChangeAgent' | 'onChangeFixedLow' | 'onChangeFixedHigh' | 'onChangeNotional' | 'onChangeMargin'
>;

const MintBurnFormWrapper: React.FunctionComponent<MintBurnFormWrapperProps> = ({ ...props }) => {
  const [fixedLow, setFixedLow] = useStateMemo<MintBurnFormProps['fixedLow']>(props.fixedLow);
  const [fixedHigh, setFixedHigh] = useStateMemo<MintBurnFormProps['fixedHigh']>(props.fixedHigh);
  const [notional, setNotional] = useStateMemo<MintBurnFormProps['notional']>(props.notional);
  const [margin, setMargin] = useStateMemo<MintBurnFormProps['margin']>(props.margin);
  const handleSubmit = (args: HandleSubmitMintBurnFormArgs) => props.onSubmit(args);

  return (
    <AgentProvider>
      <MintBurnForm
        {...props}
        fixedLow={fixedLow}
        fixedHigh={fixedHigh}
        notional={notional}
        margin={margin}
        onChangeFixedLow={setFixedLow}
        onChangeFixedHigh={setFixedHigh}
        onChangeNotional={setNotional}
        onChangeMargin={setMargin}
        onSubmit={handleSubmit}
      />
    </AgentProvider>
  );
};

const Template: ComponentStory<typeof MintBurnForm> = (args) => <MintBurnFormWrapper {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  protocol: 'aUSDC',
  fixedApr: 5,
  variableApy: 15,
  startDate: DateTime.now().minus(Duration.fromObject({ weeks: 2 })),
  endDate: DateTime.now().plus(Duration.fromObject({ weeks: 5 })),
};
