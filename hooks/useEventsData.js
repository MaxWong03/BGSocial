import { useEffect, useReducer } from "react";
import api from './../api';
import reduceState from "../reducers/events";
import Axios from "axios";
import { arrayToObject } from './../utils';


export function useEventsData() {

  const [state, dispatchState] = useReducer(reduceState, {
    events: {},
    openEvents: {}
  });

  //third view
  // const updateOpenEvents() {
  //   Axios.get()
  //     .then(events -> {
  //       dispatchState(events, 'openEvents')
  //     })
  // }

  function confirmEvents(state, userId) {
    return Object.values(state.events).filter(event => (event.chosen_event_date.date && userConfirmed(event, userId)))
  };

  function userConfirmed(event, userId) {
    return !!event.event_attendants.find(attendant => (attendant.attendant_id === 1 && attendant.is_confirmed));
  };

  function pendingEvents(state, userId) {
    return Object.values(state.events).filter(event => !event.chosen_event_date.date || !userConfirmed(event, userId))
  };

  async function loadEvents() {
    const response = await api.get("/events");
    const eventsAsObject = arrayToObject(response.data, 'id');
    dispatchState({ value: eventsAsObject, type: "setEvents" });
  };

  function removeEvent(eventId) {
    api.post(`/events/${eventId}/delete`);
    dispatchState({ value: eventId, type: 'removeEvent' });
  }

  function goingToEvent(eventId, userId){
    api.post(`/events/${eventId}/users/${userId}`);
    dispatchState({ value: eventId, type: 'setGoingEvent' });
  }

  function setConfirmEvent(eventId, eventDateId){
    return api
      .post(`/events/${eventId}/dates/${eventDateId}`)
      .then((res) => loadEvents());
  }


  useEffect(() => {
    loadEvents();
  }, []);

  return {
    state,
    dispatchState,
    removeEvent,
    confirmEvents,
    pendingEvents,
    userConfirmed,
    goingToEvent,
    setConfirmEvent
  };

};