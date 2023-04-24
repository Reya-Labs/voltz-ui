import { getExistingPositionMode } from './index';

describe('getExistingPositionMode', () => {
  it('should return null when position is not fetched successfully', () => {
    const result = getExistingPositionMode({
      position: {
        status: 'notSuccess',
      },
    } as never);
    expect(result).toBeNull();
  });

  it('should return null when position is fetched but value is null', () => {
    const result = getExistingPositionMode({
      position: {
        status: 'success',
        value: null,
      },
    } as never);
    expect(result).toBeNull();
  });

  it('should return fixed if position type is 1', () => {
    const result = getExistingPositionMode({
      position: {
        status: 'success',
        value: {
          positionType: 1,
        },
      },
    } as never);
    expect(result).toEqual('fixed');
  });

  it('should return variable if position type is 2', () => {
    const result = getExistingPositionMode({
      position: {
        status: 'success',
        value: {
          positionType: 2,
        },
      },
    } as never);
    expect(result).toEqual('variable');
  });
});
