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

export {
  formatDateWithTime
};