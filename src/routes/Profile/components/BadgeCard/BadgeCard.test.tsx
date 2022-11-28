import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import * as stories from './BadgeCard.stories';

const { Default } = composeStories(stories);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('<BadgeCard />', () => {
  test('renders proper UI', () => {
    render(<Default />);

    expect(screen.getByTestId('Badge-leverageCrowbar')).not.toBeNull();
    expect(screen.getByText('LEVERAGE CROWBAR')).not.toBeNull();
    expect(screen.getByText('TRADER: TIER 2')).not.toBeNull();
    expect(
      screen.getByText('There is no degen without 100x leverage, and you are a degen.'),
    ).not.toBeNull();
  });
});
