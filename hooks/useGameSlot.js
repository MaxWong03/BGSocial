import React, { useState } from 'react';

export default function useGameSlot (presetGames) {
  const [gameSlots, setGameSlots] = useState( presetGames || []);

  const changeGameSlot = (EventGameListID) => {
    setGameSlots(EventGameListID);
  } 

  return {
    gameSlots,
    changeGameSlot
  }
}