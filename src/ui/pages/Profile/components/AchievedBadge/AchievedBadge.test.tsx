import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import * as stories from './AchievedBadge.stories';

const { Default, NotAchieved, Loading } = composeStories(stories);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('<AchievedBadge />', () => {
  it('renders proper UI when achieved', () => {
    render(<Default />);

    expect(screen.getByTestId('AchievedBadge-leverageCrowbar')).not.toBeNull();
    expect(screen.getByText('LEVERAGE CROWBAR')).not.toBeNull();
    expect(screen.getByText('Achieved: 02/02/22')).not.toBeNull();
    expect(screen.getByText('Trader: Tier 2')).not.toBeNull();
  });

  it('renders proper UI when not achieved', () => {
    render(<NotAchieved />);

    expect(screen.getByTestId('AchievedBadge-beWaterMyFriend')).not.toBeNull();
    expect(screen.getByText('BE WATER MY FRIEND')).not.toBeNull();
    expect(screen.getByText('Keep trading...')).not.toBeNull();
    expect(screen.getByText('Legendary')).not.toBeNull();
  });

  it('renders proper UI when loading', () => {
    render(<Loading />);
    expect(screen.getByTestId('AchievedBadge-Skeleton')).not.toBeNull();
  });
});
