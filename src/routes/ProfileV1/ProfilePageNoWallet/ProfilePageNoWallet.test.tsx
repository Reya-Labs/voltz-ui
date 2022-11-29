import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';

import * as stories from './ProfilePageNoWallet.stories';

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

  expect(screen.getByText('WELCOME TO VOLTZ COMMUNITY')).not.toBeNull();
  expect(screen.getByText('Please connect your wallet')).not.toBeNull();
  expect(screen.getByText('CONNECT YOUR WALLET TO SEE YOUR BADGE COLLECTION')).not.toBeNull();
});
