import { useEffect, useReducer } from "react";
// import { getAppointmentsForDay } from "./../helpers/selectors";
import api from './../api';

import reduceState from "../reducers/events";
import Axios from "axios";


export function useEventsData() {

  const [state, dispatchState] = useReducer(reduceState, {
    events: [],
    openEvents: []
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
    return state.events.filter(event => (event.chosen_event_date.date && userConfirmed(event, userId)))
  };

  function userConfirmed(event, userId) {
    return !! event.event_attendants.find(attendant => (attendant.attendant_id === 1 && attendant.is_confirmed));
  };

  function pendingEvents(state, userId) {
    return state.events.filter(event => !event.chosen_event_date.date || !userConfirmed(event, userId))
  };

  function confirmAttendants(event_attendants) {
    const attendants = event_attendants.filter(attendant => attendant.is_confirmed)
    return attendants
  };

  async function loadEvents() {
    const event = await api.get("/events");
    dispatchState({ value: event.data, type: "setEvents" });
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return { state,
     dispatchState,
     confirmEvents,
     pendingEvents,
     userConfirmed,
     confirmAttendants };

};