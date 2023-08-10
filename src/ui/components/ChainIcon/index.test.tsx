import { render, screen } from '@testing-library/react';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { ChainIcon } from '.';

describe('<ChainIcon />', () => {
  it('renders null for unsupported chain IDs', () => {
    render(<ChainIcon chainId={999} hideForChains={[]} />);
    expect(screen.queryByTestId('ChainIconSvg-999')).toBeNull();
  });

  it('renders null when hideForChains matches chain ID', () => {
    render(
      <ChainIcon chainId={SupportedChainId.mainnet} hideForChains={[SupportedChainId.mainnet]} />,
    );
    expect(screen.queryByTestId(`ChainIconSvg-${SupportedChainId.mainnet}`)).toBeNull();
  });

  it('renders ArbitrumIcon for Arbitrum chain IDs', () => {
    render(<ChainIcon chainId={SupportedChainId.arbitrum} hideForChains={[]} />);
    expect(screen.getByTestId(`ChainIconSvg-${SupportedChainId.arbitrum}`)).toBeInTheDocument();
  });

  it('renders AvalancheIcon for Avalanche chain IDs', () => {
    render(<ChainIcon chainId={SupportedChainId.avalanche} hideForChains={[]} />);
    expect(screen.getByTestId(`ChainIconSvg-${SupportedChainId.avalanche}`)).toBeInTheDocument();
  });
});
