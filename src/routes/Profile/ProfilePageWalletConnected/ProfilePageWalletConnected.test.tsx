import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './ProfilePageWalletConnected.stories';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const { Default } = composeStories(stories);

test('renders proper UI', () => {
  render(<Default />);

  expect(screen.getByText('WELCOME 0XB01F1...378C970')).not.toBeNull();
  expect(
    screen.getByText(
      'Compete against other traders for rewards by trading or bringing people to the platform.',
    ),
  ).not.toBeNull();
  expect(
    screen.getByText('AT THE END OF THE SEASON YOU WILL BE ABLE TO CLAIM YOUR EARNED BADGES'),
  ).not.toBeNull();
  expect(screen.getByText('YOUR BADGE ACHIEVEMENTS COLLECTION')).not.toBeNull();

  expect(screen.getAllByTestId('BadgeCard')).toHaveLength(6);
});
