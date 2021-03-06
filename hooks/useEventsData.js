import { useReducer } from "react";
import { api } from './../api';
import reduceState from "../reducers/events";
import { arrayToObject } from './../utils';
export function useEventsData() {
  const [state, dispatchState] = useReducer(reduceState, {
    events: {},
    openEvents: {}
  });
  async function updateOpenEvents() {
    try {
      const response = await api.get('events/open-events');
      const eventsAsObject = arrayToObject(response.data, 'id');
      dispatchState({ value: eventsAsObject, type: 'setOpenEvents' });
    } catch (e) {
      console.log(e);
    }
  };
  function confirmEvents(state, userId) {
    return Object.values(state.events).filter(event => (event.chosen_event_date.date && userConfirmed(event, userId) && isUserGoing(event, userId)))
  };
  function userConfirmed(event, userId) {
    return !!event.event_attendants.find(attendant => (attendant.attendant_id === userId && attendant.is_confirmed));
  };
  function isUserGoing(event, userId) {
    return !!event.event_attendants.find(attendant => (attendant.attendant_id === userId && !attendant.is_not_assisting));
  };
  function pendingEvents(state, userId) {
    return Object
      .values(state.events)
      .filter(event => (!event.chosen_event_date.date && isUserGoing(event, userId))
        || (!userConfirmed(event, userId) && isUserGoing(event, userId)))
  };
  function openEvents(state, userId) {
    return Object.values(state.openEvents);
  };
  async function loadEvents() {
    try {
      const response = await api.get("/events");
      const eventsAsObject = arrayToObject(response.data, 'id');
      dispatchState({ value: eventsAsObject, type: "setEvents" });
    } catch (e) {
      console.log(e);
    }
  };
  function removeEvent(eventId) {
    api.post(`/events/${eventId}/delete`);
    dispatchState({ value: eventId, type: 'removeEvent' });
  }
  async function notGoingToEvent(eventId) {
    try {
      await api.post(`/events/${eventId}/not-going`);
      loadEvents();
    } catch (e) {
      console.log(e);
    }
  }
  function goingToEvent(eventId, userId) {
    // Assistance confirmation
    refreshEventScreen()
  }
  function setConfirmEvent(eventId, eventDateId) {
    // This is when the owner chooses a date (NOT FOR ASSISTANCE CONFIRMATION)
    return api
      .post(`/events/${eventId}/dates/${eventDateId}`)
      .then((res) => refreshEventScreen());
  }
  function refreshEventScreen() {
    updateOpenEvents();
    loadEvents();
  }
  // useEffect(() => {
  //   loadEvents()
  //     .then(() => {
  //       updateOpenEvents();
  //     })
  // }, []);
  return {
    state,
    dispatchState,
    removeEvent,
    confirmEvents,
    pendingEvents,
    userConfirmed,
    goingToEvent,
    setConfirmEvent,
    refreshEventScreen,
    notGoingToEvent,
    updateOpenEvents,
    openEvents,
    loadEvents
  };
};