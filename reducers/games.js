const SET_GAMES = "SET_GAMES"

const stateLookup = {
  [SET_GAMES]: (state, value) => {
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

export { SET_GAMES, stateLookup }