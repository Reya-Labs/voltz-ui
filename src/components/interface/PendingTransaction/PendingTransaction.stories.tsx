import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { WalletProvider } from '@components/contexts';

import PendingTransaction, { PendingTransactionProps } from './PendingTransaction';

export default {
  title: 'Interface/PendingTransaction',
  component: PendingTransaction,
} as ComponentMeta<typeof PendingTransaction>;

type PendingTransactionWrapperProps = PendingTransactionProps & {
  address: string;
};

const PendingTransactionWrapper: React.FunctionComponent<PendingTransactionWrapperProps> = ({
  address,
  ...rest
}) => {
  return (
    <WalletProvider accountOverride={address}>
      <PendingTransaction {...rest} />
    </WalletProvider>
  );
};

const Template: ComponentStory<typeof PendingTransaction> = (args) => (
  <PendingTransactionWrapper {...args} address="ADDRESS" />
);

export const Basic = Template.bind({});
Basic.args = {};
