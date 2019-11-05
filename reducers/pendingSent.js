const SET_PENDING_REQ = "SET_PENDING_REQ"
const ADD_PENDING_REQ = "ADD_PENDING_REQ"
const DELETE_PENDING_REQ = "DELETE_PENDING_REQ"

const stateLookup = {
  SET_PENDING_REQ: (state, value) => {
    return value;
  },
  ADD_PENDING_REQ: (state, value) =>{
    return [...state, value];
  },
  DELETE_PENDING_REQ: (state, value) =>{
    // console.log("state is ", state);
    console.log("value is ", value);
    let filtered = state.filter(function(el) { return el.id != value.id; });
    // console.log("fileter is ", filtered); 
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

export { SET_PENDING_REQ, ADD_PENDING_REQ, DELETE_PENDING_REQ, stateLookup }