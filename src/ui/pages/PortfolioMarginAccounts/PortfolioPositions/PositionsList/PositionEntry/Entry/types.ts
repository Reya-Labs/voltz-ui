import { ColorTokens } from 'brokoli-ui';

import { PositionUI } from '../../../../../../../app/features/portfolio/types';
import { MarketTokenInformationProps } from '../MarketTokenInformation';

export type EntryProps = PositionUI & {
  market: MarketTokenInformationProps['market'];
  token: MarketTokenInformationProps['token'];
  backgroundColorToken: ColorTokens;
};
