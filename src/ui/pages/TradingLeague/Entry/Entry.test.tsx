import { render, screen } from '@testing-library/react';

import { Entry, EntryProps } from './Entry';

describe('Entry', () => {
  const setup = (propsOverride?: Partial<EntryProps>) =>
    render(
      <Entry
        address={'0xx'}
        loading={false}
        points={0}
        rank={0}
        variant={'rank1'}
        {...propsOverride}
      />,
    );
  it('renders loading skeleton when loading is true', () => {
    setup({
      loading: true,
    });
    expect(screen.getByTestId('Entry-EntrySkeleton')).toBeTruthy();
  });

  it('renders gold icon when rank is 1', () => {
    setup({
      rank: 1,
    });
    expect(screen.getByTestId('Entry-GoldIcon')).toBeTruthy();
  });

  it('renders silver icon when rank is 2', () => {
    setup({
      rank: 2,
    });
    expect(screen.getByTestId('Entry-SilverIcon')).toBeTruthy();
  });

  it('renders bronze icon when rank is 3', () => {
    setup({
      rank: 3,
    });
    expect(screen.getByTestId('Entry-BronzeIcon')).toBeTruthy();
  });

  it('renders avatar address when address is provided', () => {
    setup({
      address: '0x123',
    });
    expect(screen.getByTestId('AvatarAddress')).toBeTruthy();
  });

  it('renders "---" when address is not provided', () => {
    setup({
      address: '',
    });
    expect(screen.getByTestId('Entry-NoAddressTypography')).toHaveTextContent('---');
  });
});
