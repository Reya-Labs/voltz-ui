import React from 'react';

import { Page } from '../../components/Page';
import { Voyage } from './Voyage';

export const VoyagePage: React.FunctionComponent = () => {
  return <Page mainSlot={<Voyage />} />;
};
