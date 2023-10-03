import { render, screen } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';

import { NoPoolFound } from '.';

describe('<NoPoolFound />', () => {
  const mockTo = '/pools';

  it('should render the title and subtitle correctly', () => {
    render(
      <HashRouter>
        <NoPoolFound to={mockTo} />
      </HashRouter>,
    );

    const title = screen.getByTestId('NoPoolFound-Title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Gas is cheap but... Pool not found');

    const subtitle = screen.getByTestId('NoPoolFound-Subtitle');
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent(
      "Unfortunately we couldn't fetch any existing pool matching this criteria. However we have several other markets currently operating, visit our pool page to discover those.",
    );
  });

  it('should render the app link correctly', () => {
    render(
      <HashRouter>
        <NoPoolFound to={mockTo} />
      </HashRouter>,
    );

    const appLink = screen.getByTestId('NoPoolFound-AppLink');
    expect(appLink).toBeInTheDocument();
    expect(appLink).toHaveTextContent('visit our pool page');
    expect(appLink).toHaveAttribute('href', `#${mockTo}`);
  });
});
