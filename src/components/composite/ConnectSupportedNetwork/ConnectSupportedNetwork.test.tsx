import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';

import * as stories from './ConnectSupportedNetwork.stories';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const { Default } = composeStories(stories);

describe('<ConnectSupportedNetwork />', () => {
  it('renders proper UI', () => {
    render(
      <HashRouter>
        <Default />
      </HashRouter>,
    );

    expect(screen.getByText('⚠️ RESTRICTED')).not.toBeNull();
    expect(
      screen.getByText('Your wallet needs to be connected to a supported network.'),
    ).not.toBeNull();
    expect(screen.getByText('CONNECT WITH A SUPPORTED NETWORK')).not.toBeNull();
  });
});
