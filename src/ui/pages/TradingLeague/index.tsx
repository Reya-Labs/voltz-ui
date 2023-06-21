import React from 'react';

import { Page } from '../../components/Page';
import { TradingLeague } from './TradingLeague';

export const TradingLeaguePage: React.FunctionComponent = () => {
  return <Page mainSlot={<TradingLeague />} />;
};
