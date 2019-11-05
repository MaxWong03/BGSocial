const formatDuration = (hour, minute, second) => {
  if (hour < 10) hour = '0' + hour;
  if (minute < 10) minute = '0' + minute;
  if (second < 10) second = '0' + second;
  if (hour == 0) hour = '00';
  if (minute == 0) minute = '00';
  if (second == 0) second = '00';
  return `${hour}:${minute}:${second}`
};

export { formatDuration };