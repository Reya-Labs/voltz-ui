import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import * as stories from './Ellipsis.stories';

const { Default } = composeStories(stories);

describe('<BouncedLoading />', () => {
  it('should render proper UI', () => {
    render(<Default />);

    expect(screen.getByTestId('EllipsisTypography')).not.toBeNull();
  });
});
