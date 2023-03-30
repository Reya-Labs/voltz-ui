import { render, screen } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';

import { NoAMMFound } from './index';

describe('<NoAMMFound />', () => {
  const mockTo = '/pools';

  it('should render the title and subtitle correctly', () => {
    render(
      <HashRouter>
        <NoAMMFound to={mockTo} />
      </HashRouter>,
    );

    const title = screen.getByTestId('NoAMMFound-Title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Gas is cheap but... Pool not found');

    const subtitle = screen.getByTestId('NoAMMFound-Subtitle');
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent(
      "Unfortunately we couldn't fetch any existing pool matching this criteria. However we have several other markets currently operating, visit our pool page to discover those.",
    );
  });

  it('should render the app link correctly', () => {
    render(
      <HashRouter>
        <NoAMMFound to={mockTo} />
      </HashRouter>,
    );

    const appLink = screen.getByTestId('NoAMMFound-AppLink');
    expect(appLink).toBeInTheDocument();
    expect(appLink).toHaveTextContent('visit our pool page');
    expect(appLink).toHaveAttribute('href', `#${mockTo}`);
  });
});
