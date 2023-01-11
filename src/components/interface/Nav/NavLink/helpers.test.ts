import { isActiveLink } from './helpers';

describe('isActiveLink', () => {
  it('returns true if the pathname contains the link', () => {
    expect(isActiveLink('/some-link', [], '/some-link')).toBe(true);
    expect(isActiveLink('/some-link', [], '/some-link/sub-link')).toBe(true);
    expect(isActiveLink('/some-link', [], '/some-link?query=param')).toBe(true);
  });

  it('returns true if the pathname contains any of the subLinks', () => {
    expect(isActiveLink('/some-link', ['/sub-link-1', '/sub-link-2'], '/sub-link-1')).toBe(true);
    expect(isActiveLink('/some-link', ['/sub-link-1', '/sub-link-2'], '/sub-link-2')).toBe(true);
  });

  it('returns false if the pathname does not contain the link or any of the subLinks', () => {
    expect(isActiveLink('/some-link', ['/sub-link-1', '/sub-link-2'], '/other-link')).toBe(false);
    expect(isActiveLink('/some-link', [], '/other-link')).toBe(false);
  });
});
