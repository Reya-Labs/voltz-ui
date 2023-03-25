import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import * as stories from './ConnectWallet.stories';

const { Default } = composeStories(stories);

describe('<ConnectWallet />', () => {
  it('renders proper UI', () => {
    render(<Default />);

    expect(screen.getByText('🚫 RESTRICTED')).not.toBeNull();
    expect(screen.getByText('Your wallet needs to be connected before proceeding.')).not.toBeNull();
  });
});
