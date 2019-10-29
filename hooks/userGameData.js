import { useEffect, useReducer } from "react";
// import { getAppointmentsForDay } from "./../helpers/selectors";
import api from './../api';

import reduceState from "../reducers/events";

export function useEventsData() {

  const [state, dispatchState] = useReducer(reduceState, {
    events: []
  });

  function confirmEvents(state) {
    return state.events.filter(event => event.chosen_event_date.date)
  };

  function pendingEvents(state) {
    return state.events.filter(event => !event.chosen_event_date.date)
  };

  async function loadEvents() {
    const event = await api.get("/events");
    dispatchState({ value: event.data, type: "setEvents" });
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return { state, dispatchState, confirmEvents, pendingEvents };

};
