import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import * as stories from './Loading.stories';

const { Default } = composeStories(stories);

describe('<Loading />', () => {
  it('should render proper UI', () => {
    render(<Default />);

    expect(screen.getByTestId('Loading-Box')).not.toBeNull();
  });
});
