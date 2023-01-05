import axios from 'axios';
import { sentryTracker } from './sentry';

export const geckoEthToUsd = async (apiKey: string): Promise<number> => {
  const attempts = 5;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const data = await axios.get(
        `https://pro-api.coingecko.com/api/v3/simple/price?x_cg_pro_api_key=${apiKey}&ids=ethereum&vs_currencies=usd`,
      );
      return data.data.ethereum.usd;
    } catch (error) {
      if (attempt + 1 === attempts) {
        sentryTracker.captureException(error);
        sentryTracker.captureMessage('Unable to fetch ETH price after 5 attempts');
      }
    }
  }
  return 0;
};
