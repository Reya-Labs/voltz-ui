import { render, screen } from '@testing-library/react';

import { TradingLeagueHeader } from './TradingLeagueHeader';

describe('TradingLeagueHeader', () => {
  it('renders the title and subtitle correctly', () => {
    render(<TradingLeagueHeader />);
    expect(screen.getByTestId('TradingLeagueHeader-TradingLeagueHeaderBox')).toBeInTheDocument();
    expect(screen.getByTestId('TradingLeagueHeader-Typography-Title')).toHaveTextContent(
      'Voltz Trading League',
    );
    expect(screen.getByTestId('TradingLeagueHeader-Typography-Subtitle')).toHaveTextContent(
      'Compete against other traderz in the Voltz Trading League. The more active you are, the more pointz you earn. Pointz reset at the end of each season, with the Top Traderz earning legendary status forever...',
    );
  });
});
