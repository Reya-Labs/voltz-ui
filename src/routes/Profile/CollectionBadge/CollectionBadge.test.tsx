import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './CollectionBadge.stories';

const { Default, NotAchieved } = composeStories(stories);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

test('renders proper UI when achieved', () => {
  render(<Default />);

  expect(screen.getByTestId('CollectionBadge-leverageCrowbar')).not.toBeNull();
  expect(screen.getByText('LEVERAGE CROWBAR')).not.toBeNull();
  expect(screen.getByText('Achieved: 10/12/22')).not.toBeNull();
  expect(screen.getByText('TIER 2')).not.toBeNull();
});

test('renders proper UI when not achieved', () => {
  render(<NotAchieved />);

  expect(screen.getByTestId('CollectionBadge-beWaterMyFriend')).not.toBeNull();
  expect(screen.getByText('BE WATER MY FRIEND')).not.toBeNull();
  expect(screen.getByText('Keep trading...')).not.toBeNull();
  expect(screen.getByText('LEGENDARY')).not.toBeNull();
});
