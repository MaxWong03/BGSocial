import { formatDateWithTime, formatTime, arrayToObject, getEventChosenEventDate, getEventMainImage, getConfirmedAttendants } from './index';

const mockArray = [{ "id": 1 }, { "id": 3 }, { "id": 8 }];

const mockEvent = {
  "id": 1,
  "title": "So cool games to play",
  "image": null,
  "spots": 4,
  "is_open": false,
  "owner_id": 1,
  "event_dates": [
    {
      "id": 1,
      "is_chosen": true,
      "date": "2019-12-03T13:23:44.000Z",
      "location": "401 W Georgia St #600, Vancouver, BC V6B 5A1",
      "event_id": 1
    },
    {
      "id": 7,
      "is_chosen": false,
      "date": "2019-11-28T13:00:44.000Z",
      "location": "401 W Georgia St #600",
      "event_id": 1
    }
  ],
  "event_attendants": [
    {
      "id": 1,
      "is_confirmed": true,
      "is_invited": true,
      "is_not_assisting": false,
      "attendant_id": 1,
      "event_id": 1,
      "fb_id": "921623601546635",
      "name": "Max Wong",
      "nickname": "Mad Max",
      "email": "maxwong93@gmail.com",
      "avatar": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=921623601546635&height=350&width=350&ext=1574626882&hash=AeSZ-ILZTTrn2hrH"
    },
    {
      "id": 2,
      "is_confirmed": true,
      "is_invited": true,
      "is_not_assisting": false,
      "attendant_id": 2,
      "event_id": 1,
      "fb_id": "2184479695188878",
      "name": "Zongxi Li",
      "nickname": "Jesse",
      "email": "zongxi@gmail.com",
      "avatar": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2184479695188878&height=350&width=350&ext=1574626952&hash=AeS_rrrvqq3FXxd6"
    },
    {
      "id": 3,
      "is_confirmed": false,
      "is_invited": true,
      "is_not_assisting": false,
      "attendant_id": 3,
      "event_id": 1,
      "fb_id": "10162376645685203",
      "name": "Camila Rivera",
      "nickname": "CR",
      "email": "cr@gmail.com",
      "avatar": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10162376645685203&height=350&width=350&ext=1574633091&hash=AeSTH7BvOEhoPQ07"
    }
  ],
  "event_games": [
    {
      "id": 1,
      "game_id": 1,
      "event_id": 1,
      "game": {
        "id": 1,
        "name": "Die Macher",
        "description": "description",
        "year_published": 1986,
        "age": 14,
        "play_time_min": 240,
        "play_time_max": 240,
        "bgg_id": 1,
        "average_bgg_rating": 7.6246,
        "thumbnail": "https://cf.geekdo-images.com/thumb/img/Y2pmp3_tPmiyJ032upHBwqD49xM=/fit-in/200x150/pic4718279.jpg",
        "image": "https://cf.geekdo-images.com/original/img/uqlrq_bQJqHpcaN7_7qocV5XfbU=/0x0/pic4718279.jpg",
        "category": "Economic, Negotiation, Political",
        "mechanic": "Area Majority / Influence, Auction/Bidding, Dice Rolling, Hand Management, Simultaneous Action Selection"
      }
    },
    {
      "id": 2,
      "game_id": 12,
      "event_id": 1,
      "game": {
        "id": 12,
        "name": "Ra",
        "description": "description",
        "year_published": 1999,
        "age": 12,
        "play_time_min": 45,
        "play_time_max": 60,
        "bgg_id": 12,
        "average_bgg_rating": 7.46857,
        "thumbnail": "https://cf.geekdo-images.com/thumb/img/6d0zX3j56NknAus56Wf_WqN7S9s=/fit-in/200x150/pic3013552.jpg",
        "image": "https://cf.geekdo-images.com/original/img/iA_LlRmPfFILGon-zvbWeEzxvX8=/0x0/pic3013552.jpg",
        "category": "Ancient, Mythology",
        "mechanic": "Auction/Bidding, Auction: Once Around, Constrained Bidding, Push Your Luck, Set Collection"
      }
    },
    {
      "id": 3,
      "game_id": 22,
      "event_id": 1,
      "game": {
        "id": 22,
        "name": "Magic Realm",
        "description": "description",
        "year_published": 1979,
        "age": 12,
        "play_time_min": 240,
        "play_time_max": 240,
        "bgg_id": 22,
        "average_bgg_rating": 7.17185,
        "thumbnail": "https://cf.geekdo-images.com/thumb/img/Lz-oN-BoiBvBrbZ9U94f8VrErnE=/fit-in/200x150/pic148345.jpg",
        "image": "https://cf.geekdo-images.com/original/img/CeJiWNodJGwBPse17RA6p4krH6c=/0x0/pic148345.jpg",
        "category": "Adventure, Exploration, Fantasy",
        "mechanic": "Action Queue, Modular Board, Role Playing, Simultaneous Action Selection, Variable Player Powers"
      }
    },
    {
      "id": 4,
      "game_id": 32,
      "event_id": 1,
      "game": {
        "id": 32,
        "name": "Buffalo Chess",
        "description": "description",
        "year_published": 1975,
        "age": 8,
        "play_time_min": 30,
        "play_time_max": 30,
        "bgg_id": 32,
        "average_bgg_rating": 6.12531,
        "thumbnail": "https://cf.geekdo-images.com/thumb/img/GO6xPlP_uu7Mbul9-1uv7CUwCIU=/fit-in/200x150/pic4604213.jpg",
        "image": "https://cf.geekdo-images.com/original/img/HfDcUODgpHiTpcgg-XbaK96T4pg=/0x0/pic4604213.jpg",
        "category": "Abstract Strategy, American West",
        "mechanic": ""
      }
    },
    {
      "id": 9,
      "game_id": 2,
      "event_id": 1,
      "game": {
        "id": 2,
        "name": "Dragonmaster",
        "description": "description",
        "year_published": 1981,
        "age": 12,
        "play_time_min": 30,
        "play_time_max": 30,
        "bgg_id": 2,
        "average_bgg_rating": 6.60149,
        "thumbnail": "https://cf.geekdo-images.com/thumb/img/2tQqL6whiVTSAxR7iG8F1CMMcFY=/fit-in/200x150/pic4001505.jpg",
        "image": "https://cf.geekdo-images.com/original/img/o07K8ZVh0PkOpOnSZs1TuABb7I4=/0x0/pic4001505.jpg",
        "category": "Card Game, Fantasy",
        "mechanic": "Trick-taking"
      }
    }
  ],
  "event_votes": [
    {
      "event_id": 1,
      "event_date_id": 1,
      "location": "401 W Georgia St #600, Vancouver, BC V6B 5A1",
      "date": "2019-12-03T13:23:44.000Z",
      "user_id": 1
    },
    {
      "event_id": 1,
      "event_date_id": 1,
      "location": "401 W Georgia St #600, Vancouver, BC V6B 5A1",
      "date": "2019-12-03T13:23:44.000Z",
      "user_id": 2
    }
  ]
}

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

describe('getEventMainImage', () => {
  const imageURL = getEventMainImage(mockEvent);
  test('returns image url of 1st game in the event object', () => {
    expect(imageURL).toEqual('https://cf.geekdo-images.com/original/img/uqlrq_bQJqHpcaN7_7qocV5XfbU=/0x0/pic4718279.jpg');
  });

  test('does not return image url that is not the 1st game in the event object', () => {
    expect(imageURL).not.toEqual('https://cf.geekdo-images.com/original/img/iA_LlRmPfFILGon-zvbWeEzxvX8=/0x0/pic3013552.jpg');
  });
});

describe('getEventChosenEventDate', () => {
  //event owner can only chose one date to finalize, so thats probably why the implementation of getEventChosenEventDate is using .find
  const chosenEventDate = getEventChosenEventDate(mockEvent);
  const isChosenTrue = {
    "id": 1,
    "is_chosen": true,
    "date": "2019-12-03T13:23:44.000Z",
    "location": "401 W Georgia St #600, Vancouver, BC V6B 5A1",
    "event_id": 1
  };
  const isChosenFalse = {
    "id": 7,
    "is_chosen": false,
    "date": "2019-11-28T13:00:44.000Z",
    "location": "401 W Georgia St #600",
    "event_id": 1
  };
  test('returns the 1st event_dates obj that has is_chosen = true', () => {
    expect(chosenEventDate).toEqual(isChosenTrue);
  });

  test('does not return event_dates obj that has is_chosen = false', () => {
    expect(chosenEventDate).not.toEqual(isChosenFalse);
  });
});

describe('getConfirmedAttendants', () => {
  //need to figure out what is_not_assisting really mean
  const confirmedAttendants = getConfirmedAttendants(mockEvent);
  const confirmedArr = [
    {
      "id": 1,
      "is_confirmed": true,
      "is_invited": true,
      "is_not_assisting": false,
      "attendant_id": 1,
      "event_id": 1,
      "fb_id": "921623601546635",
      "name": "Max Wong",
      "nickname": "Mad Max",
      "email": "maxwong93@gmail.com",
      "avatar": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=921623601546635&height=350&width=350&ext=1574626882&hash=AeSZ-ILZTTrn2hrH"
    },
    {
      "id": 2,
      "is_confirmed": true,
      "is_invited": true,
      "is_not_assisting": false,
      "attendant_id": 2,
      "event_id": 1,
      "fb_id": "2184479695188878",
      "name": "Zongxi Li",
      "nickname": "Jesse",
      "email": "zongxi@gmail.com",
      "avatar": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2184479695188878&height=350&width=350&ext=1574626952&hash=AeS_rrrvqq3FXxd6"
    }
  ];
  const unConfirmedArr = [
    {
      "id": 3,
      "is_confirmed": false,
      "is_invited": true,
      "is_not_assisting": false,
      "attendant_id": 3,
      "event_id": 1,
      "fb_id": "10162376645685203",
      "name": "Camila Rivera",
      "nickname": "CR",
      "email": "cr@gmail.com",
      "avatar": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10162376645685203&height=350&width=350&ext=1574633091&hash=AeSTH7BvOEhoPQ07"
    }
  ];

  test('returns array of length 2 given event_attendants have two objs with is_confirmed = true', () => {
    expect(confirmedAttendants.length).toEqual(2);
  });

  test('returns an array with the correct attnendant obj', () => {
    expect(confirmedAttendants).toEqual(confirmedArr);
  });

  test('does not return an array with attendants that have is_confirmed = false', () => {
    expect(confirmedAttendants).not.toEqual(unConfirmedArr);
  })
});