import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import * as stories from './Icon.stories';
import { iconMap } from './types';

const { Icons } = composeStories(stories);

describe('<Icon />', () => {
  it('should render proper UI for all icons', () => {
    render(<Icons />);
    for (const iconName of Object.keys(iconMap)) {
      const icon = screen.getByTestId(`Icon-${iconName}`);
      expect(icon).not.toBeNull();
      expect(['svg', 'IMG']).toContain(icon.tagName);
    }
  });
});
