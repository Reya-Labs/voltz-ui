import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';

import * as stories from './ProfilePageWalletConnected.stories';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const { Default } = composeStories(stories);

describe('<ProfilePageWalletConnected />', () => {
  it('should render proper UI when claimed badges present', () => {
    render(
      <HashRouter>
        <Default />
      </HashRouter>,
    );

    expect(screen.getByText('Welcome to your profile 0xb01F...c970')).not.toBeNull();
    expect(screen.getByTestId('Profile-BadgesExplained').textContent).toBe(
      'Earn badges through your contribution to the community and activity on the protocol. Badges are earned throughout each Season, with minting available at the end of each Season. The more you collect the greater your contribution. Season 01 runs between October 1st 2022 and December 31st 2022.',
    );
    expect(screen.getByText('Your Badge Collection')).not.toBeNull();
    expect(screen.getByText('October 1st 2022')).not.toBeNull();
    expect(screen.getByText('December 31st 2022')).not.toBeNull();
    expect(screen.getAllByTestId('ProfileNotification')[0].textContent).toBe(
      'Earn badges by inviting others',
    );
    expect(screen.getAllByTestId('ProfileNotification')[1].textContent).toBe(
      'Unavailable until the end of the season',
    );

    expect(screen.getAllByTestId('BadgeCard')).toHaveLength(16);
    expect(screen.queryAllByTestId('ClaimButton')).toHaveLength(0);

    // todo: add test for season filter
  });
});
