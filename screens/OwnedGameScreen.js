import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
// import { useEventsData } from './../hooks/useEventsData';
import { Header, Button, Icon, Divider, Text } from 'react-native-elements';
// import { formatDateWithTime } from './../utils'
import OwnGameListItem from '../components/OwnGameListItem';
import { api } from './../api';
import useGameData from '../hooks/useGamesData';
// import { updateLoading, updateList } from './../reducers/user_games_action';
import { initState, initReducer } from './../reducers/user_games_reducer';

export default function OwnedGameScreen({ navigation }) {

  const userID = 1;

  // const [count, setCount] = useState(0);

  // const [state, dispatch] = useReducer(initReducer, initState);
  
    // const [date, setDate] = useState("");
    // const {list = [], loading} = state
    
    // const {list, dispatchState} = useGameData();

  const [allGames, setAllGames] = useState([]);

  const {state: list, dispatchState, ADD_GAMES, DELETE_GAMES} = useGameData();

  const goToGameLibrary = function () {
    navigation.navigate('GameLibrary', {
      games: allGames,
      ownedGames: list,
      dispatchState,
      ADD_GAMES,
    })
  };

  useEffect(() => {
    api.get("/games/library").then((res) => {
      setAllGames(res.data.games);
    });
  }, []);

  useEffect(() => {
    navigation.setParams({ numberOfGames: list.length, goToGameLibrary });
  }, [list.length, allGames.length]);



  return (
    <>
      <ScrollView style={styles.gameListContainer}>
        {
          list.length !== 0 ?
            list.map((event, index) => {
              return (
                <OwnGameListItem
                  key={ index }
                  imageURL = { event.image }
                  date = { event.last_play }
                  title = { event.name }
                  game = { event }
                  dispatchState = {dispatchState}
                  DELETE_GAMES = {DELETE_GAMES}
                  last_play = { event.last_play }
                  onPress={() => navigation.navigate('GameMoreInfo', {
                    game: event,
                    // userGames
                  })}
                />
              );
            })
          : <Text>No game in your library</Text>
        }
      </ScrollView>
    </>
  );
}

OwnedGameScreen.navigationOptions = ({navigation}) => { // title at the top
  const numberOfGames = navigation.getParam('numberOfGames') || 0;

  const options = {
    title: `My Games (${numberOfGames})`
  }

  if (navigation.getParam('goToGameLibrary')) {
    options.headerRight = (
      <Button
        onPress={navigation.getParam('goToGameLibrary')}
        title="+ Add Game"
        color="#fff"
      />
    );
  }
  return options;
};


const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});