import React from 'react';

import { VoltzPage } from '../../components/VoltzPage';
import { Voyage } from './Voyage';

export const VoyagePage: React.FunctionComponent = () => {
  return <VoltzPage mainSlot={<Voyage />} />;
};
