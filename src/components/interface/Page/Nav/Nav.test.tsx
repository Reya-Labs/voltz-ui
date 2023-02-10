import { screen } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';

import { renderWithProviders } from '../../../../test-helpers/renderWithProviders';
import { Nav } from './Nav';

describe('<Nav />', () => {
  it('renders the correct number of NavLinks', () => {
    renderWithProviders(
      <HashRouter>
        <Nav />
      </HashRouter>,
    );
    expect(screen.getAllByTestId('NavLinkButton').length).toBe(5);
  });

  it('renders the correct text for each NavLink', () => {
    renderWithProviders(
      <HashRouter>
        <Nav />
      </HashRouter>,
    );
    expect(screen.getAllByTestId('NavLinkButton')[0].textContent).toBe('Traders');
    expect(screen.getAllByTestId('NavLinkButton')[1].textContent).toBe('Liquidity Providers');
    expect(screen.getAllByTestId('NavLinkButton')[2].textContent).toBe('Fixed Borrow');
    expect(screen.getAllByTestId('NavLinkButton')[3].textContent).toBe('Leaderboard');
    expect(screen.getAllByTestId('NavLinkButton')[4].textContent).toBe('Profile');
  });

  it('renders the new link indicator for NavLinks with isNew prop', () => {
    renderWithProviders(
      <HashRouter>
        <Nav />
      </HashRouter>,
    );
    expect(
      screen.getAllByTestId('NavLinkButton')[1].querySelector('[data-testid="NewLinkIndicator"]'),
    ).toBeInTheDocument();
    expect(
      screen.getAllByTestId('NavLinkButton')[3].querySelector('[data-testid="NewLinkIndicator"]'),
    ).toBeInTheDocument();
    expect(
      screen.getAllByTestId('NavLinkButton')[4].querySelector('[data-testid="NewLinkIndicator"]'),
    ).toBeInTheDocument();
  });
});
