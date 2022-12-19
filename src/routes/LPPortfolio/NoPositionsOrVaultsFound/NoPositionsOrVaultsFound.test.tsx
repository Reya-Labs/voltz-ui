import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';

import * as stories from './NoPositionsOrVaultsFound.stories';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const { Default, NoNavigation } = composeStories(stories);

describe('<NoPositionsOrVaultsFound />', () => {
  it('should render proper UI with Navigation', () => {
    render(
      <HashRouter>
        <Default />
      </HashRouter>,
    );

    expect(screen.getByText('You haven’t provided liquidity to any Optimiser yet.')).not.toBeNull();
    expect(screen.getByText('Open your first position here:')).not.toBeNull();
    expect(screen.getByTestId('NoPositionsOrVaultsFound-NavigateButton')).not.toBeNull();
  });

  it('should render proper UI without Navigation', () => {
    render(
      <HashRouter>
        <NoNavigation />
      </HashRouter>,
    );

    expect(screen.getByText('You haven’t provided liquidity to any Optimiser yet.')).not.toBeNull();
    expect(screen.getByText('Open your first position here:')).not.toBeNull();
    expect(screen.queryByTestId('NoPositionsOrVaultsFound-NavigateButton')).toBeNull();
  });
});
