import { formatDuration } from './formatDuration';

describe('formatDuration', () => {
  test('returns 05:00:00 when input is (5,0,0)', () => {
    const duration = formatDuration(5, 0, 0);
    expect(duration).toEqual('05:00:00');
  });

  test('returns 10:00:00 when input is (10,0,0)', () => {
    const duration = formatDuration(10, 0, 0);
    expect(duration).toEqual('10:00:00');
  });

  test('returns 00:00:00 when input is (0,0,0)', () => {
    const duration = formatDuration(0, 0, 0);
    expect(duration).toEqual('00:00:00');
  });

  test('returns 00:09:00 when input is (0,9,0)', () => {
    const duration = formatDuration(0, 9, 0);
    expect(duration).toEqual('00:09:00');
  });

  test('returns 00:00:03 when input is (0,0,3)', () => {
    const duration = formatDuration(0, 0, 3);
    expect(duration).toEqual('00:00:03');
  });

  test('returns 12:03:09 when input is (12, 3, 9)', () => {
    const duration = formatDuration(12, 3, 9);
    expect(duration).toEqual('12:03:09');
  });

  test('returns 12:12:09 when input is (12, 12, 9)', () => {
    const duration = formatDuration(12, 12, 9);
    expect(duration).toEqual('12:12:09');
  });

  test('returns 12:12:19 when input is (12, 12, 19)', () => {
    const duration = formatDuration(12, 12, 19);
    expect(duration).toEqual('12:12:19');
  });
});