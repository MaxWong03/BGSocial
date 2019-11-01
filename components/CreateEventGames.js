import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements';
import SelectGames from './SelectGames';
import EmptyList from './EmptyList';
import useList from '../hooks/useList';

export default function CreatEventGames({ changeGameSlot, userGames }) {
  userGames = userGames.map(game => {
    return {...game, 'selected': false}
  })
  
  const { list: gameSelectList, onSelectGame: onSelect } = useList(userGames);

  const filterSelectedGames = () => {
    return gameSelectList.filter((game) => game['selected'])
  };
  const eventGameList = filterSelectedGames();

  const getEventGameList = (eventGameListID) => {
    changeGameSlot(eventGameListID)
  };

  const deleteEventGame = (gameID) => {
    const gameList = onSelect(gameID)
      .filter(game => game['selected'])
      .map(game => game['id']);

    changeGameSlot(gameList)
  }

  return (
    <>
      <SelectGames
        getEventGameList={getEventGameList}
        gameSelectList={gameSelectList}
        onSelect={onSelect}
      />
      {
        eventGameList.length === 0 ?
          <EmptyList title={'Click to Add Games For Event'} />
          :
          eventGameList.map((game, index) => (
            <ListItem
              key={index}
              leftAvatar={{ source: { uri: game['thumbnail'] } }}
              title={game['name']}
              bottomDivider
              rightElement={
                <Button
                  icon={
                    <Icon
                      name='delete-forever'
                      type='material'
                      color='white'
                    />
                  }
                  buttonStyle={styles.deleteButton}
                  onPress={() => deleteEventGame(game['id'])}
                />
              }
            />
          ))
      }
    </>
  )
}


const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    marginRight: 5
  }
});

