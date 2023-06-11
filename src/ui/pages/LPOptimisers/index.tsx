import React from 'react';

import { VoltzPage } from '../../components/VoltzPage';
import { Vaults } from './Vaults/Vaults';

export const LPOptimisersPage: React.FunctionComponent = () => {
  return <VoltzPage mainSlot={<Vaults />} />;
};
