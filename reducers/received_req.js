const REJECT_REQUEST = "REJECT_REQUEST";
const GET_REQUEST = "GET_REQUEST";

const stateLookup = {
  GET_REQUEST: (state, value) => {
    return value;
  },
  REJECT_REQUEST: (state, value) =>{
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

export { GET_REQUEST, REJECT_REQUEST, stateLookup }