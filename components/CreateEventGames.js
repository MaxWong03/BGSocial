import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import SelectGames from './SelectGames';
import EmptyList from './EmptyList';

export default function CreatEventGames({ gameSlots, changeGameSlot }) {
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
        gameSlots.length === 0 ?
        <EmptyList title={'Click to Add Games For Event'}/>
        :
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

