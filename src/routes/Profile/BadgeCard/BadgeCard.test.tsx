import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './BadgeCard.stories';

const { Default } = composeStories(stories);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

test('renders proper UI', () => {
  render(<Default />);

  expect(screen.getByTestId('Badge-leverageCrowbar')).not.toBeNull();
  expect(screen.getByText('LEVERAGE CROWBAR')).not.toBeNull();
  expect(screen.getByText('TIER 2')).not.toBeNull();
  expect(screen.getByText('Woah you like the leverage.')).not.toBeNull();
});
