import { parsePresetDuration } from './parsePresetDuration';

describe('parsePresetDuration', () => {
  test("returns '' when input is '00' ", () => {
    const parsedDuration = parsePresetDuration('00');
    expect(parsedDuration).toEqual('');
  });

  test('returns 1 when input is 01', () => {
    const parsedDuration = parsePresetDuration('01');
    expect(parsedDuration).toEqual('1');
  })

  test('returns 12 when input is 12', () => {
    const parsedDuration = parsePresetDuration('12');
    expect(parsedDuration).toEqual('12');
  })
});