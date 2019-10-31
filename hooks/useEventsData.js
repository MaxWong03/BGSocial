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

  // function bookInterview(id, interview) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //   return axios.put(`/api/appointments/${id}`, { interview })
  //     .then(response => {
  //       dispatchState({ value: appointments, type: "appointments" })
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       throw error;
  //     });

  // };

  // function cancelInterview(id) {
  //   return axios.delete(`/api/appointments/${id}`)
  //     .then(response => {
  //       const newState = JSON.parse(JSON.stringify(state));
  //       newState.appointments[id].interview = null
  //       const appointments = { ...newState.appointments }
  //       dispatchState({ value: appointments, type: "appointments" })
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       throw error;
  //     });
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
    // console.log('eventsAsObject', eventsAsObject);
    dispatchState({ value: eventsAsObject, type: "setEvents" });
  };

  function removeEvent(eventId) {
    console.log('delete', eventId);
    api.post(`/events/${eventId}/delete`);
    dispatchState({ value: eventId, type: 'removeEvent' });
  }

  function goingToEvent(eventId, userId){
    api.post(`/events/${eventId}/users/${userId}`);
    dispatchState({ value: eventId, type: 'setGoingEvent' });
  }

  function setConfirmEvent(eventId, eventDateId){
    api.post(`/events/${eventId}/dates/${eventDateId}`);
    loadEvents();
  }


  useEffect(() => {
    // console.log("change state")
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