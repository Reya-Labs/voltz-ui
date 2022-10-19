import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './ProfilePageWalletConnected.stories';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const { Default, NoClaimedBadges } = composeStories(stories);

test('renders proper UI when claimed badges present', () => {
  render(<Default />);

  expect(screen.getByText('WELCOME TO YOUR PROFILE')).not.toBeNull();
  expect(screen.getByText('0XB01F1...378C970')).not.toBeNull();
  expect(
    screen.getByText(
      'Earn badges through your contribution to the community and activity on the protocol. Badges are earnt throughout each Season, with minting available at the end of each Season. The more you collect the greater your contribution. Season 1 will run until the 31st December 2022.',
    ),
  ).not.toBeNull();
  expect(screen.getByText('YOUR BADGE COLLECTION')).not.toBeNull();

  expect(screen.getAllByTestId('BadgeCard')).toHaveLength(16);
});

test('renders proper UI when NO claimed badges present', () => {
  render(<NoClaimedBadges />);

  expect(screen.getByText('WELCOME TO YOUR PROFILE')).not.toBeNull();
  expect(screen.getByText('0XB01F1...378C970')).not.toBeNull();
  expect(
    screen.getByText(
      'Earn badges through your contribution to the community and activity on the protocol. Badges are earnt throughout each Season, with minting available at the end of each Season. The more you collect the greater your contribution. Season 1 will run until the 31st December 2022.',
    ),
  ).not.toBeNull();

  const badgeCards = screen.queryAllByTestId('BadgeCard');
  expect(badgeCards).toHaveLength(0);
});
