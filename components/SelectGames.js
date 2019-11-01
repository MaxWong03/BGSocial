import React, { useState } from 'react';
import { Overlay, Button, Icon } from 'react-native-elements';
import useVisibility from '../hooks/useVisibility';
import SelectGamesModal from './SelectGamesModal';

export default function SelectGames({ getEventGameList, gameSelectList, onSelect, buttonText }) {
  const {visible, showModal, closeModal} = useVisibility(false);

  const chooseGameAction = () => {
    const gameList = [];
    gameSelectList.forEach((game) => {
      game['selected'] && gameList.push(game['id'])
    });
    getEventGameList(gameList);
    closeModal();
  }

  return (
    <>
      <Button
        onPress={showModal}
        title={buttonText}
        icon={
          <Icon
            name='videogame-asset'
            type='material-icons'
            color='white'
          />
        }
      />
      <Overlay
        isVisible={visible}
        children={
          <SelectGamesModal
            goBack={closeModal}
            onSelect={onSelect}
            chooseGameAction={chooseGameAction}
            gameSelectList={gameSelectList}
          />
        }
      />
    </>
  )
}
