import { useEffect, userReducer, useReducer } from 'react';
import api from '../api';
import reducer, { SET_GAMES } from '../reducers/games';

export default function useGamesData() {
  const [state, dispatchState] = useReducer(reducer, [])
  async function loadGames() {
    const games = await api.get(`/user/games/1`);
    dispatchState({ type: SET_GAMES, value: games.data.games })
  };

  useEffect(() => {
    loadGames();
  }, [])

  return {
    state,
    dispatchState
  }
}