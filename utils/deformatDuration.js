const deformatDuration = (duration) => {
  const destructDuration = duration.split(':');
  const [hour, minute, second] = destructDuration;
  return {hour, minute, second}
}
export {deformatDuration};