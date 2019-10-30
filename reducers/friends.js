const SET_FRIENDS = "SET_FRIENDS"

const stateLookup = {
  [SET_FRIENDS]: (state, value) => {
    return value;
  }
}

export default function reducer(state, action) {
  if (stateLookup[action.type]) {
    return stateLookup[action.type](state, action.value);
  } else {
    throw new Error("tried to reduce with unsupported action type");
  }
};

export { SET_FRIENDS, stateLookup }