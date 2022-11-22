import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './ProfilePageWalletConnected.stories';
import { HashRouter } from 'react-router-dom';

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

    expect(screen.getByText('WELCOME TO YOUR PROFILE')).not.toBeNull();
    expect(screen.getByText('0XB01F...C970')).not.toBeNull();
    expect(screen.getByTestId('Profile-BadgesExplained').textContent).toBe(
      'Earn badges through your contribution to the community and activity on the protocol. Badges are earned throughout each Season, with minting available at the end of each Season. The more you collect the greater your contribution. Season 01 runs between October 1st 2022 and December 31st 2022.',
    );
    expect(screen.getByText('YOUR BADGE COLLECTION')).not.toBeNull();
    expect(screen.getByText('October 1st 2022')).not.toBeNull();
    expect(screen.getByText('December 31st 2022')).not.toBeNull();

    expect(screen.getAllByTestId('BadgeCard')).toHaveLength(5);
  });
});
