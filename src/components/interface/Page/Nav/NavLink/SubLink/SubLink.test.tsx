import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';

import { SubLink } from './SubLink';

describe('<SubLink />', () => {
  it('renders the correct link text', () => {
    render(
      <HashRouter>
        <SubLink
          isActive={false}
          isNew={false}
          link="/some-link"
          text="Some Link"
          onClick={() => {}}
        />
      </HashRouter>,
    );
    expect(screen.getByText('Some Link')).toBeInTheDocument();
  });

  it('renders the new link indicator when isNew is true', () => {
    render(
      <HashRouter>
        <SubLink
          isActive={false}
          isNew={true}
          link="/some-link"
          text="Some Link"
          onClick={() => {}}
        />
      </HashRouter>,
    );
    expect(screen.getByTestId('NewLinkIndicator')).toBeInTheDocument();
  });

  it('renders the ActiveSubLinkButton when isActive is true', () => {
    render(
      <HashRouter>
        <SubLink
          isActive={true}
          isNew={false}
          link="/some-link"
          text="Some Link"
          onClick={() => {}}
        />
      </HashRouter>,
    );
    expect(screen.getByTestId('ActiveSubLinkButton')).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const onClick = jest.fn();
    render(
      <HashRouter>
        <SubLink
          isActive={false}
          isNew={false}
          link="/some-link"
          text="Some Link"
          onClick={onClick}
        />
      </HashRouter>,
    );
    fireEvent.click(screen.getByText('Some Link'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
