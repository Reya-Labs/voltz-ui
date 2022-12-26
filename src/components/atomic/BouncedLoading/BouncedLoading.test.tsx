import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import * as stories from './BouncedLoading.stories';

const { Default } = composeStories(stories);

describe('<BouncedLoading />', () => {
  it('should render proper UI', () => {
    render(<Default />);

    expect(screen.getByTestId('BouncedLoading-Container')).not.toBeNull();
    expect(screen.getByTestId('BouncedLoading-Item-0')).not.toBeNull();
    expect(screen.getByTestId('BouncedLoading-Item-1')).not.toBeNull();
    expect(screen.getByTestId('BouncedLoading-Item-2')).not.toBeNull();
  });
});
