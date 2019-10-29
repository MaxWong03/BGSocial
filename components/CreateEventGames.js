import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import SelectGames from './SelectGames';

export default function CreatEventGames({ changeGameSlot }) {
  const [eventGameList, setEventGameList] = useState([]);

  const updateEventGameList = (newEventGameList) => {
    setEventGameList(newEventGameList);
  };

  const getEventGameList = (eventGameListID) => {
    changeGameSlot(eventGameListID)
  };

  return (
    <>
      <SelectGames
        updateEventGameList={updateEventGameList}
        getEventGameList={getEventGameList}
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

