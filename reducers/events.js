const stateLookup = {
  setEvents: (state, value) => {
    // For setting all events together
    return { ...state, events: value };
  },
  updateEvent: (state, value) => {
    // (TODO: Copy deep - immutability)
    const newEvent = { ...(state.events[value.id] || {}), ...value };
    const events = { ...state.events, [value.id]: newEvent };
    return { ...state, events };
  },
  createEvent: (state, value) => {
    const events = { ...state.events, [value.id]: value };
    return { ...state, events };
  }
};

export default function reduceState(state, action) {
  if (stateLookup[action.type]) {
    return stateLookup[action.type](state, action.value);
  } else {
    throw new Error("tried to reduce with unsupported action type");
  }
};