import moment from 'moment';

// const formatDateWithTime = function (date) {
//   return moment(date).format('ddd, MMM DD [at] hh:mm A');
// }

const formatDateWithTime = function (date) {
  // const formatDate = moment(date).format('ddd, MMM DD [at] hh:mm A');
  if (date === null) return "New game"
  else{
    return moment(date).format('ddd, MMM DD [at] hh:mm A');
  }
}

const arrayToObject = function (objectsArray, key) { // key === 'id'
  const object = {};
  objectsArray.forEach(item => {
    object[item[key]] = item;
  });
  return object;
}

const getEventMainImage = function (event) {
  return event.event_games[0].game.image;
}

const getEventChosenEventDate = function (event) {
  return event.event_dates.find(eventDate => eventDate.is_chosen === true);
}

function getConfirmedAttendants(event) {
  return event.event_attendants.filter(attendant => attendant.is_confirmed)
};


export {
  formatDateWithTime,
  arrayToObject,
  getEventChosenEventDate,
  getEventMainImage,
  getConfirmedAttendants
};