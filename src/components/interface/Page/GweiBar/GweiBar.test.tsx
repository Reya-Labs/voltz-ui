import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { GweiBar } from './GweiBar';

jest.mock('../../../../hooks/useWallet', () => {
  return {
    useWallet: () => {
      return {
        provider: {
          getBlockNumber: jest.fn(() => Promise.resolve(123)),
          getGasPrice: jest.fn(() => Promise.resolve({ toNumber: () => 200 })),
        },
      };
    },
  };
});

describe('<GweiBar />', () => {
  it('should render the GweiBar with gwei and block number', async () => {
    render(<GweiBar />);

    await waitFor(() => {
      const gweiBarBox = screen.getByTestId('GweiBar-GweiBarBox');
      expect(gweiBarBox).toBeInTheDocument();
    });

    const gweiTypography = screen.getByTestId('GweiBar-GweiTypography');
    expect(gweiTypography).toHaveTextContent('200 gwei |');

    const blockNumberTypography = screen.getByTestId('GweiBar-BlockNumberTypography');
    expect(blockNumberTypography).toHaveTextContent('123');
  });

  it('should not render anything when there is no provider', async () => {
    jest.mock('../../../../hooks/useWallet', () => {
      return {
        useWallet: () => {
          return { provider: null };
        },
      };
    });
    render(<GweiBar />);

    await waitFor(() => {
      const gweiBarBox = screen.queryByTestId('GweiBar-GweiBarBox');
      expect(gweiBarBox).toBeNull();
    });
  });
});
