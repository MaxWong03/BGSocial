import React from 'react';
import GameInfo from './../components/GameInfo';
// the whole game and the info

export default function GameMoreInfoScreen({navigation}) {
  const individualGame = navigation.getParam("game");
  
  return (
    <GameInfo
      game = {individualGame}
    />
  );
}