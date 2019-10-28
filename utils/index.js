import moment from 'moment';


const formatDateWithTime = function (date) {
  return moment(date).format('ddd, MMM DD [at] hh:mm A');
}

export {
  formatDateWithTime
};