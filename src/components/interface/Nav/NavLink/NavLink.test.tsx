import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { NavLink } from './NavLink';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

describe('NavLink', () => {
  it('renders the correct link text', () => {
    (useLocation as jest.Mock).mockReturnValueOnce({ pathname: '/some-link' });
    render(
      <NavLink isNew={false} link="/some-link">
        Some Link
      </NavLink>,
    );
    expect(screen.getByText('Some Link')).toBeInTheDocument();
  });

  it('renders the new link indicator when isNew is true', () => {
    (useLocation as jest.Mock).mockReturnValueOnce({ pathname: '/some-link' });
    render(
      <NavLink isNew={true} link="/some-link">
        Some Link
      </NavLink>,
    );
    expect(screen.getByTestId('NewLinkIndicator')).toBeInTheDocument();
  });

  it('renders the ActiveNavLinkButton when the link is active', () => {
    (useLocation as jest.Mock).mockReturnValueOnce({ pathname: '/some-link' });
    render(
      <NavLink isNew={false} link="/some-link">
        Some Link
      </NavLink>,
    );
    expect(screen.getByTestId('ActiveNavLinkButton')).toBeInTheDocument();
  });

  it('renders the NavLinkPopover when it has subLinks', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/some-link' });
    render(
      <NavLink
        isNew={false}
        link="/some-link"
        subLinks={[{ text: 'SubLink 1', link: '/sub-link-1' }]}
      >
        Some Link
      </NavLink>,
    );
    fireEvent.click(screen.getByText('Some Link'));
    expect(screen.getByTestId('NavLinkPopover')).toBeInTheDocument();
  });
});
