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
  | 'onChangeAgent'
  | 'onChangeFixedLow'
  | 'onChangeFixedHigh'
  | 'onChangeLeverage'
  | 'onChangePartialCollateralization'
  | 'onChangeMargin'
>;

const MintBurnFormWrapper: React.FunctionComponent<MintBurnFormWrapperProps> = ({ ...props }) => {
  const [fixedLow, setFixedLow] = useStateMemo<MintBurnFormProps['fixedLow']>(props.fixedLow);
  const [fixedHigh, setFixedHigh] = useStateMemo<MintBurnFormProps['fixedHigh']>(props.fixedHigh);
  const [leverage, setLeverage] = useStateMemo<MintBurnFormProps['leverage']>(props.leverage);
  const [margin, setMargin] = useStateMemo<MintBurnFormProps['margin']>(props.margin);
  const [partialCollateralization, setPartialCollateralization] = useStateMemo<
    MintBurnFormProps['partialCollateralization']
  >(props.partialCollateralization);
  const handleSubmit = (args: HandleSubmitMintBurnFormArgs) => props.onSubmit(args);

  return (
    <AgentProvider>
      <MintBurnForm
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

const Template: ComponentStory<typeof MintBurnForm> = (args) => <MintBurnFormWrapper {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  protocol: 'aUSDC',
  fixedApr: 5,
  variableApr: 15,
  startDate: DateTime.now().minus(Duration.fromObject({ weeks: 2 })),
  endDate: DateTime.now().plus(Duration.fromObject({ weeks: 5 })),
};
