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

  expect(screen.getByText('WELCOME')).not.toBeNull();
  expect(screen.getByText('0XB01F1...378C970')).not.toBeNull();
  expect(
    screen.getAllByText(
      'Compete against other traders for rewards by trading or bringing people to the platform.',
    ),
  ).toHaveLength(2);
  expect(
    screen.getByText('AT THE END OF THE SEASON YOU WILL BE ABLE TO CLAIM YOUR EARNED BADGES'),
  ).not.toBeNull();
  expect(screen.getByText('YOUR BADGE ACHIEVEMENTS COLLECTION')).not.toBeNull();

  expect(screen.getAllByTestId('BadgeCard')).toHaveLength(16);
});

test('renders proper UI when NO claimed badges present', () => {
  render(<NoClaimedBadges />);

  expect(screen.getByText('WELCOME')).not.toBeNull();
  expect(screen.getByText('0XB01F1...378C970')).not.toBeNull();
  expect(
    screen.getAllByText(
      'Compete against other traders for rewards by trading or bringing people to the platform.',
    ),
  ).toHaveLength(2);
  expect(
    screen.getByText('AT THE END OF THE SEASON YOU WILL BE ABLE TO CLAIM YOUR EARNED BADGES'),
  ).not.toBeNull();

  const badgeCards = screen.queryAllByTestId('BadgeCard');
  expect(badgeCards).toHaveLength(0);
});
