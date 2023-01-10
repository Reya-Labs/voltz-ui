import { screen } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';

import { useWallet } from '../../hooks/useWallet';
import { renderWithProviders } from '../../test-helpers/renderWithProviders';
import { LPPortfolio } from './LPPortfolio';

jest.mock('../../hooks/useWallet', () => ({
  useWallet: jest.fn(() => ({
    status: 'connected',
  })),
}));

describe('LPPortfolio', () => {
  it('renders the ConnectWallet component when the wallet is not connected', () => {
    (useWallet as jest.Mock).mockReturnValueOnce({
      status: 'notConnected',
    });

    renderWithProviders(
      <HashRouter>
        <LPPortfolio />
      </HashRouter>,
      {
        preloadedState: {
          // @ts-ignore
          transactions: [],
        },
      },
    );

    const walletNotConnected = screen.getByTestId('LPPortfolio-WalletNotConnected');
    expect(walletNotConnected).toBeInTheDocument();
  });

  it('renders the LPPositions and Optimisers components when the wallet is connected', () => {
    renderWithProviders(
      <HashRouter>
        <LPPortfolio />
      </HashRouter>,
      {
        preloadedState: {
          // @ts-ignore
          transactions: [],
        },
      },
    );

    const walletConnected = screen.getByTestId('LPPortfolio-WalletConnected');
    expect(walletConnected).toBeInTheDocument();

    const lpPositionsContentBox = screen.getByTestId('LPPortfolio-LPPositions-ContentBox');
    expect(lpPositionsContentBox).toBeInTheDocument();

    const optimisersContentBox = screen.getByTestId('LPPortfolio-Optimisers-ContentBox');
    expect(optimisersContentBox).toBeInTheDocument();
  });

  it('renders the LPPositions components only when the wallet is connected and processing transactions', () => {
    renderWithProviders(
      <HashRouter>
        <LPPortfolio />
      </HashRouter>,
      {
        preloadedState: {
          // @ts-ignore
          transactions: [
            {
              id: 1,
            },
          ],
        },
      },
    );

    const walletConnected = screen.getByTestId('LPPortfolio-WalletConnected');
    expect(walletConnected).toBeInTheDocument();

    const lpPositionsContentBox = screen.getByTestId('LPPortfolio-LPPositions-ContentBox');
    expect(lpPositionsContentBox).toBeInTheDocument();

    const optimisersContentBox = screen.getByTestId('LPPortfolio-Optimisers-ContentBox');
    expect(optimisersContentBox).not.toBeVisible();
  });
});
