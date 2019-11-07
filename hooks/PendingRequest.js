import { useEffect, useReducer } from 'react';
import { api } from '../api';
import reducer, { SET_PENDING_REQ, ADD_PENDING_REQ, DELETE_PENDING_REQ } from '../reducers/pendingSent';

export default function useGamesData() {
  const [state, dispatchRequest] = useReducer(reducer, [])
  
  async function loadPendings() {
    const requests = await api.get(`/users/request/sent`);
    dispatchRequest({ type: SET_PENDING_REQ, value: requests.data.sentRequest })
  };

  useEffect(() => {
    loadPendings()
  }, [])
  return {
    state,
    dispatchRequest,
    SET_PENDING_REQ,
    ADD_PENDING_REQ,
    DELETE_PENDING_REQ,
    loadPendings
  }
}