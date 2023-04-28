import { hasExistingPosition } from './index';

describe('hasExistingPosition', () => {
  it('should return false when position is not fetched successfully', () => {
    const result = hasExistingPosition({
      position: {
        status: 'notSuccess',
      },
    } as never);
    expect(result).toEqual(false);
  });

  it('should return false when position is fetched but value is null', () => {
    const result = hasExistingPosition({
      position: {
        status: 'success',
        value: null,
      },
    } as never);
    expect(result).toEqual(false);
  });

  it('should return true if position fetch is successfull and value is not null', () => {
    const result = hasExistingPosition({
      position: {
        status: 'success',
        value: {},
      },
    } as never);
    expect(result).toEqual(true);
  });
});
