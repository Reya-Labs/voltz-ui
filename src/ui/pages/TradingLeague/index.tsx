import React from 'react';

import { VoltzPage } from '../../components/VoltzPage';
import { TradingLeague } from './TradingLeague';

export const TradingLeaguePage: React.FunctionComponent = () => {
  return <VoltzPage mainSlot={<TradingLeague />} />;
};
