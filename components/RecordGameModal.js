import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { Button, Icon } from 'react-native-elements';
import GameSearchBar from './GameSearchBar';
import GameListItem from '../components/GameListItem';


export default function RecordGameModal({ gameSelectList, closeModal, onSelect }) {
  const [search, setSearch] = useState('');
  const updateSearch = (userInput) => setSearch(userInput);
  return (
    <>
      <View style={styles.headerContainer}>
        <Icon
          name="arrow-left"
          color="black"
          type='font-awesome'
          onPress={closeModal}
          style={styles.backIcon}
        />
        <Text style={styles.headerText}>Select Games</Text>
      </View>
      <GameSearchBar
        updateSearch={updateSearch}
        search={search}
      />
      <ScrollView >
        {
          gameSelectList.map((game, index) => (
            game['name'].includes(search) &&
            <GameListItem
              key={index}
              game={game}
              onSelect={onSelect}
            />
          ))
        }
      </ScrollView>
      {/* <Button
        onPress={chooseGameAction}
        title={"Select"}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: '6%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backIcon: {
    width: '30%',
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    width: '70%'
  },
  gameListContainer: {
    height: '75%'
  }
})
