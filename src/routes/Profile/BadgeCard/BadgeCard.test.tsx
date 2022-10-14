import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './BadgeCard.stories';

const { Default } = composeStories(stories);

test('renders proper UI', () => {
  render(<Default />);

  expect(screen.getByTestId('Badge-badge1')).not.toBeNull();
  expect(screen.getByText('OPEN A VT POSITION')).not.toBeNull();
  expect(screen.getByText('TIER 2')).not.toBeNull();
  expect(
    screen.getByText('Looking to collectat that juicy delta. Opening your first VT position'),
  ).not.toBeNull();
});
