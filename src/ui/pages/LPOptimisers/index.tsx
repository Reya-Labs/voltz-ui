import React from 'react';

import { Page } from '../../components/Page';
import { Vaults } from './Vaults/Vaults';

export const LPOptimisersPage: React.FunctionComponent = () => {
  return <Page mainSlot={<Vaults />} />;
};
