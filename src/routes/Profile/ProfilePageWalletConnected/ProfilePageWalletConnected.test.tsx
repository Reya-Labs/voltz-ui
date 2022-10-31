import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './ProfilePageWalletConnected.stories';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const { Season01 } = composeStories(stories);

describe('<ProfilePageWalletConnected />', () => {
  it('should render proper UI when claimed badges present', () => {
    render(<Season01 />);

    expect(screen.getByText('WELCOME TO YOUR PROFILE')).not.toBeNull();
    expect(screen.getByText('0XB01F...C970')).not.toBeNull();
    expect(screen.getByTestId('Profile-BadgesExplained').textContent).toBe(
      'Earn badges through your contribution to the community and activity on the protocol. Badges are earned throughout each Season, with minting available at the end of each Season. The more you collect the greater your contribution. Season 01 runs between 1st October 2022 and 31st December 2022.',
    );
    expect(screen.getByText('YOUR BADGE COLLECTION')).not.toBeNull();
    expect(screen.getByText('1st October 2022')).not.toBeNull();
    expect(screen.getByText('31st December 2022')).not.toBeNull();

    expect(screen.getAllByTestId('BadgeCard')).toHaveLength(5);
  });
});
