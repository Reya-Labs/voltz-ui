import { render, screen } from '../../../../../test-helpers';
import { GasCost } from './GasCost';

describe('<GasCost />', () => {
  it('displays loading text when gasCost prop is -1', () => {
    render(<GasCost gasCost={-1} />);
    const gasCostLoading = screen.getByTestId('GasCost-GasCostLoading');
    expect(gasCostLoading).toHaveTextContent('---');
  });

  it('displays the gas cost in USD when gasCost prop is positive', () => {
    render(<GasCost gasCost={10.7} />);
    const gasCostUSD = screen.getByTestId('GasCost-GasCostUSD');
    expect(gasCostUSD).toHaveTextContent('$10.7');
  });
});
