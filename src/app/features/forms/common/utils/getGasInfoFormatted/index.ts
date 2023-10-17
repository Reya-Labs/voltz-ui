import { formatNumber } from '../../../../../../utilities/number';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

export const getGasInfoFormatted = ({
  gasDetails,
  status,
}: {
  gasDetails: {
    value: number;
    token: 'ETH' | 'AVAX' | 'USDCf';
  } | null;
  status: ThunkStatus;
}): {
  gasFeeFormatted: string;
  gasTokenFormatted: string;
} => {
  if (status === 'success' && gasDetails) {
    return {
      gasFeeFormatted: formatNumber(gasDetails.value, 2, 4),
      gasTokenFormatted: ` ${gasDetails.token}`,
    };
  }

  return {
    gasFeeFormatted: '--',
    gasTokenFormatted: '--',
  };
};
