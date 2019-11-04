const stateLookup = {
  setEvents: (state, value) => { // value = { eventId: event }
    // For setting all events together
    return { ...state, events: value };
  },
  updateEvent: (state, value) => {
    // (TODO: Copy deep - immutability)
    const newEvent = { ...(state.events[value.id] || {}), ...value };
    const events = { ...state.events, [value.id]: newEvent };
    return { ...state, events };
  },
  createEvent: (state, value) => { // value = event (Object)
    const events = { ...state.events, [value.id]: value };
    return { ...state, events };
  },
  removeEvent: (state, value) => { // value = eventId
    const events = { ...state.events }; // Copy (immutability)
    delete events[value];
    return { ...state, events };
  },
  setGoingEvent: (state, value) => { // value = eventId
    const eventAttendants = { ...state.events[value.event].event_attendants }; // Copy (immutability)
    delete events[value];
    return { ...state, events };
  },
  setOpenEvents: (state, value) => { // value = { eventId: event }
  // For setting all events together
  return { ...state, openEvents: value };
}
};

export default function reduceState(state, action) {
  if (stateLookup[action.type]) {
    return stateLookup[action.type](state, action.value);
  } else {
    throw new Error("tried to reduce with unsupported action type");
  }
};