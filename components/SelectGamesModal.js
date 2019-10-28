import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { Button, Header, Icon } from 'react-native-elements';
import GameSearchBar from './GameSearchBar';

export default function SelectGameModal({ goBack }) {
  const [search, setSearch] = useState('');

  //Changes the search bar value
  const updateSearch = (userInput) => setSearch(userInput);

  return (
    <>
      <View style={styles.headerContainer}>
        <Icon
          name="arrow-left"
          color="black"
          type='font-awesome'
          onPress={goBack}
          style={styles.backIcon}
        />
        <Text style={styles.headerText}>Select Games</Text>
      </View>
      <GameSearchBar
        updateSearch={updateSearch}
        search={search}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height:'6%',
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
  }
})