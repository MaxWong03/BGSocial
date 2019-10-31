const SET_GAMES = "SET_GAMES"
const ADD_GAMES = "ADD_GAMES"
const DELETE_GAMES = "DELETE_GAMES"

const stateLookup = {
  SET_GAMES: (state, value) => {
    return value;
  },
  ADD_GAMES: (state, value) =>{
    return [...state, value];
  },
  DELETE_GAMES: (state, value) =>{
    let filtered = state.filter(function(el) { return el.bgg_id != value.bgg_id; }); 
    return filtered;
  }

  // DELETE_GAMES: (state, value) =>{
  //   console.log("in the delete gaeme");
  //   let games = [...state];
  //   delete games[value];
  //   return games;
  // }
}

export default function reducer(state, action) {
  console.log("in the reducer, ", action.type);
  if (stateLookup[action.type]) {
    return stateLookup[action.type](state, action.value);
  } else {
    throw new Error("tried to reduce with unsupported action type");
  }
};

export { SET_GAMES, ADD_GAMES, DELETE_GAMES, stateLookup }