import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';

import * as stories from './ConnectWallet.stories';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const { Default } = composeStories(stories);

test('renders proper UI', () => {
  render(
    <HashRouter>
      <Default />
    </HashRouter>,
  );

  expect(screen.getByText('🚫 RESTRICTED')).not.toBeNull();
  expect(screen.getByText('Your wallet needs to be connected before proceeding.')).not.toBeNull();
  expect(screen.getByText('CONNECT YOUR WALLET')).not.toBeNull();
});
