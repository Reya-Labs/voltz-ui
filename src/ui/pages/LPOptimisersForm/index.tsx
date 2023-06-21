import React from 'react';

import { Page } from '../../components/Page';
import { VaultFormRoute } from './VaultFormRoute';

export const LPOptimisersFormPage: React.FunctionComponent = () => {
  return <Page mainSlot={<VaultFormRoute />} />;
};
