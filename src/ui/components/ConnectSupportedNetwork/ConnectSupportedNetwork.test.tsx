import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import * as stories from './ConnectSupportedNetwork.stories';

const { Default } = composeStories(stories);

describe('<ConnectSupportedNetwork />', () => {
  it('renders proper UI', () => {
    render(<Default />);

    expect(screen.getByText('⚠️ RESTRICTED')).not.toBeNull();
    expect(
      screen.getByText('Your wallet needs to be connected to a supported network.'),
    ).not.toBeNull();
  });
});
