import React from 'react';

import { VoltzPage } from '../../components/VoltzPage';
import { VaultFormRoute } from './VaultFormRoute';

export const LPOptimisersFormPage: React.FunctionComponent = () => {
  return <VoltzPage mainSlot={<VaultFormRoute />} />;
};
