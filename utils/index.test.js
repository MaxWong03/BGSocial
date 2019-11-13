import { formatDateWithTime, formatTime, arrayToObject, getEventChosenEventDate, getEventMainImage, getConfirmedAttendants } from './index';

const mockArray = [{ "id": 1 }, { "id": 3 }, { "id": 8 }];

describe('formatDateWithTime', () => {
  test('format date object to day, month, date, at hour:minute AM/PM format', () => {
    const date = new Date('December 17, 1995 03:24:00');
    const formatDate = formatDateWithTime(date);
    expect(formatDate).toEqual('Sun, Dec 17 at 03:24 AM');
  });
});

describe('formatTime', () => {
  test('returns 3h 20m when input is 03:20', () => {
    const formattedTime = formatTime('03:20');
    expect(formattedTime).toEqual('3h 20m');
  });

  test('returns 3h 9m when input is 03:09', () => {
    const formattedTime = formatTime('03:09');
    expect(formattedTime).toEqual('3h 9m');
  });

  test('returns 10m when input is 00:10', () => {
    const formattedTime = formatTime('00:10');
    expect(formattedTime).toEqual('10m');
  });

  test('returns 3h when input is 03:00', () => {
    const formattedTime = formatTime('03:00');
    expect(formattedTime).toEqual('3h');
  });
});

describe('arrayToObject', () => {

  const obj = arrayToObject(mockArray, 'id');
  const objKeysArr = Object.keys(obj);

  test('returns an object of length 3', () => {
    expect(objKeysArr.length).toEqual(3);
  });

  test('returns an object with the inner object id as key', () => {
    expect(objKeysArr[0]).toEqual('1');
    expect(objKeysArr[1]).toEqual('3');
    expect(objKeysArr[2]).toEqual('8');
  });
});

