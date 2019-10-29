import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import SelectGames from './SelectGames';

export default function CreatEventGames({ gameSlot, addGameSlot }) {
  const [eventGameList, setEventGameList] = useState([]);

  const updateEventGameList = (newEventGameList) => {
    setEventGameList(newEventGameList);
  };

  return (
    <>
      <SelectGames
        updateEventGameList={updateEventGameList}
      />
      {
        eventGameList.map((game, index) => (
          <ListItem
            key={index}
            leftAvatar={{ source: { uri: game['thumbnail'] } }}
            title={game['name']}
            bottomDivider
          />
        ))
      }
    </>
  )
}

const styles = StyleSheet.create({
  SectionHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'grey'
  },
})