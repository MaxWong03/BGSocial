import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import useList from '../hooks/useList';
import GameSearchBar from './../components/GameSearchBar';
import GameListItem from '../components/GameListItem';
import api from './../api';

export default function GamesLibraryScreen({navigation}) {

  const allGames = navigation.getParam("games");
  const ownedGamesID = navigation.getParam("ownedGames").map(game => game['id']);
  const dispatchState = navigation.getParam("dispatchState")
  const ADD_GAMES = navigation.getParam("ADD_GAMES")
  const {list: gameSelectList, onSelectGame: onSelect} = useList(allGames);

  const filterSelectedGames = () => {
    return gameSelectList.filter((game) => game['selected'])
  };

  const userID = 1;

  const [search, setSearch] = useState('');

  const updateSearch = (userInput) => setSearch(userInput);

  // this should be saved in the previous function
  // since the list should be updated in the front page
  const chooseGameAction = () => {
    const selectedList = filterSelectedGames()
    selectedList.map( game => {
      api.post(`/games/user/${game['id']}`)
      .then(() => {
        dispatchState({type: ADD_GAMES, value: game});
      }).catch((err) => {
        console.log(err);
      })
    });
    navigation.goBack();
  }

  return (
    <View>
      <GameSearchBar
        updateSearch={updateSearch} // keeping update for the text in the search bar
        search={search}
      />
      <ScrollView style={styles.gameListContainer}>
        {
          gameSelectList.map((game, index) => (
            game['name'].includes(search) && !ownedGamesID.includes(game['id']) &&
            <GameListItem
              key={index}
              game={game}
              onSelect={onSelect}
            />
          ))
        }
      </ScrollView>
      <Button
        onPress={()=> ( chooseGameAction() )}
        title={"Add Game"}
      />
      <Button
        onPress={()=> navigation.goBack()}
        title={"back"}
      />
    </View>
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