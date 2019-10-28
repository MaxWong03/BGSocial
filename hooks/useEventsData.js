import { useEffect, useReducer } from "react";
// import { getAppointmentsForDay } from "./../helpers/selectors";
import api from './../api';

import reduceState from "../reducers/events";


export function useEventsData() {

  const [state, dispatchState] = useReducer(reduceState, {
    events: []
  });

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

  function doSomething() {

  }

  async function loadEvents() {
    const event  = await api.get("/events");
    dispatchState({ value: event.data, type: "setEvents" });
  }

  useEffect(() => {
    loadEvents();
  }, []);

  return { state, dispatchState, doSomething };

};
