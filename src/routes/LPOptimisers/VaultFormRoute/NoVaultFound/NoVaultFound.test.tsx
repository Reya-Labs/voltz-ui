import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';

import * as stories from './NoVaultFound.stories';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const { Default } = composeStories(stories);

test('renders proper UI', () => {
  render(
    <HashRouter>
      <Default />
    </HashRouter>,
  );

  expect(screen.getByText('🧐 OOPS!')).not.toBeNull();
  expect(screen.getByText('It seems we cannot find the vault you are after!')).not.toBeNull();
  expect(
    screen.getByText(
      'Double check the page link. Perhaps there is a typo or the vault is not longer supported.',
    ),
  ).not.toBeNull();
});
