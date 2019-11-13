import { deformatDuration } from './deformatDuration';

describe('deformatDuration', () => {
  test('returns hour = 03, minute = 00, second = 00 when input is 03:00:00', () => {
    const { hour, minute, second } = deformatDuration('03:00:00');
    expect(hour).toEqual('03');
    expect(minute).toEqual('00');
    expect(second).toEqual('00');
  });

  test('returns hour = 03, minute = 05, second = 09 when input is 03:05:09', () => {
    const { hour, minute, second } = deformatDuration('03:05:09');
    expect(hour).toEqual('03');
    expect(minute).toEqual('05');
    expect(second).toEqual('09');
  });

  test('returns hour = 13, minute = 05, second = 09 when input is 13:05:09', () => {
    const { hour, minute, second } = deformatDuration('13:05:09');
    expect(hour).toEqual('13');
    expect(minute).toEqual('05');
    expect(second).toEqual('09');
  });

  test('returns hour = 13, minute = 15, second = 09 when input is 13:15:09', () => {
    const { hour, minute, second } = deformatDuration('13:15:09');
    expect(hour).toEqual('13');
    expect(minute).toEqual('15');
    expect(second).toEqual('09');
  });
  
  test('returns hour = 13, minute = 15, second = 19 when input is 13:15:19', () => {
    const { hour, minute, second } = deformatDuration('13:15:19');
    expect(hour).toEqual('13');
    expect(minute).toEqual('15');
    expect(second).toEqual('19');
  });
});