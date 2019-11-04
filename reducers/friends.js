const SET_FRIENDS = "SET_FRIENDS"
const ADD_FRIEND = "ADD_FRIEND"
const REMOVE_FRIEND = "REMOVE_FRIEND"

const stateLookup = {
  [SET_FRIENDS]: (state, value) => {
    return value;
  },
  ADD_FRIEND: (state, value) =>{
    return [...state, value];
  },
  REMOVE_FRIEND: (state, value) =>{
    let filtered = state.filter(function(el) { return el.id != value.id; }); 
    return filtered;
  }
}

export default function reducer(state, action) {
  if (stateLookup[action.type]) {
    return stateLookup[action.type](state, action.value);
  } else {
    throw new Error("tried to reduce with unsupported action type");
  }
};

export { SET_FRIENDS, stateLookup, ADD_FRIEND, REMOVE_FRIEND }