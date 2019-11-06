import { useState, useEffect } from 'react';
import { api } from '../api';


export default function useGamesLib() {
  const [gameLib, setGameLib] = useState([]);
  async function loadGameLib() {
    const games = await api.get(`/games/library`);
    setGameLib(games.data.games);
  };

  useEffect(() => {
    loadGameLib();
  }, [])

  return {
    gameLib
  }
}