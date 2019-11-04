import { useEffect, useReducer } from 'react';
import { api } from '../api';
import reducer, { GET_REQUEST, REJECT_REQUEST } from '../reducers/received_req';

export default function ReceivedRequest() {
  const [state, dispatchReceivedRequest] = useReducer(reducer, [])
  
  async function loadRequest() {
    const games = await api.get(`/users/request/received`);
    dispatchReceivedRequest({ type: GET_REQUEST, value: games.data.users })
  };

  useEffect(() => {
    loadRequest()
  }, [])

  return {
    state,
    dispatchReceivedRequest,
    GET_REQUEST,
    REJECT_REQUEST,
    loadRequest
  }
}