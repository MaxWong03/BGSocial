import React, { useState } from 'react';

export default function useGameSlot () {
  const [gameSlots, setGameSlots] = useState([]);

  const changeGameSlot = (EventGameListID) => {
    setGameSlots(EventGameListID);
  } 

  return {
    gameSlots,
    changeGameSlot
  }
}