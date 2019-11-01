import { useEffect, useReducer } from 'react';
import api from '../api';
import reducer, { SET_GAMES, ADD_GAMES, DELETE_GAMES } from '../reducers/games';

export default function useGamesData() {
  const [state, dispatchState] = useReducer(reducer, [])
  
  async function loadGames() {
    const games = await api.get(`/games/user`);
    dispatchState({ type: SET_GAMES, value: games.data.games })
  };

  useEffect(() => {
    loadGames()
  }, [])

  return {
    state,
    dispatchState,
    ADD_GAMES,
    SET_GAMES,
    DELETE_GAMES,
    loadGames
  }
}