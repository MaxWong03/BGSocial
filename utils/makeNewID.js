
const makeID = () => {
  let id = 100;
  return function () {
    return id++;
  }
}
const id = makeID();

id();

export { id }