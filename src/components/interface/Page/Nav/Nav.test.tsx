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
    expect(screen.getAllByTestId('NavLinkButton')[0].textContent).toBe('Pools');
    expect(screen.getAllByTestId('NavLinkButton')[1].textContent).toBe('Portfolio');
    expect(screen.getAllByTestId('NavLinkButton')[2].textContent).toBe('Optimisers');
    expect(screen.getAllByTestId('NavLinkButton')[3].textContent).toBe('Leaderboard');
    expect(screen.getAllByTestId('NavLinkButton')[4].textContent).toBe('Profile');
  });
});
