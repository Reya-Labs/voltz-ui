import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TransactionList from './TransactionList';
import { Position } from '@voltz-protocol/v1-sdk';
import JSBI from 'jsbi';

export default {
  title: 'Interface/TransactionList',
  component: TransactionList,
  args: {
    data: [],
  },
} as ComponentMeta<typeof TransactionList>;

const Template: ComponentStory<typeof TransactionList> = (args) => (
  <TransactionList {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  position: {
    source: 'ME',
    swaps: [
      {
        id: 1,
        transactionTimestamp: JSBI.BigInt(1651574608),
        desiredNotional: JSBI.BigInt(105384842),
        fixedTokenDelta: JSBI.BigInt(355),
        cumulativeFeeIncurred: JSBI.BigInt(1534),
      }
    ],
    marginUpdates: [
      {
        id: 2,
        transactionTimestamp: JSBI.BigInt(1621574608),
        marginDelta: JSBI.BigInt(129338),
      }
    ],
    settlements: [
      {
        id: 3,
        transactionTimestamp: JSBI.BigInt(1631574608),
        settlementCashflow: JSBI.BigInt(105384842),
      }
    ],
    liquidations: [
      {
        id: 4,
        transactionTimestamp: JSBI.BigInt(1611574608),
        notionalUnwound: JSBI.BigInt(129338),
        reward: JSBI.BigInt(-129338),
      }
    ]
  } as unknown as Position,
};
