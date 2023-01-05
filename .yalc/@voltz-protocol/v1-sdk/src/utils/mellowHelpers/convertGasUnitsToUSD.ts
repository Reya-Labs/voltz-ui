import { BigNumber } from 'ethers';
import { geckoEthToUsd } from '../priceFetch';
import { getGasPriceGwei } from './getGasPriceGwei';

export async function convertGasUnitsToUSD(gasUnits: BigNumber): Promise<number> {
  const gasPriceGweiRaw = await getGasPriceGwei();
  const gasPriceGwei = gasPriceGweiRaw.toFixed();

  const ethToUSDPrice = await geckoEthToUsd(process.env.REACT_APP_COINGECKO_API_KEY || '');
  const ethToUSDPriceScaled = ethToUSDPrice * 100;

  const gasPriceUSDScaledBN = gasUnits
    .mul(BigNumber.from(gasPriceGwei))
    .mul(BigNumber.from(ethToUSDPriceScaled));

  const gasPriceUSDScaled = parseFloat(gasPriceUSDScaledBN.toString());
  const gasPriceUSD = gasPriceUSDScaled / 1000000000000;
  return gasPriceUSD;
}
