import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
// import { useEventsData } from './../hooks/useEventsData';
import { Header, Button, Icon, Divider, Text } from 'react-native-elements';
// import { formatDateWithTime } from './../utils'
import OwnGameListItem from '../components/OwnGameListItem';
import { api } from './../api';
import useGameData from '../hooks/useGamesData';
import { getUserInfo } from './../hooks/sessionContext';


export default function OwnedGameScreen({ navigation }) {

  // Refreshing attempt

  const fetchData = async() =>{ // get the data again
    loadGames();
    // loadAllFriends();
    // loadEvents();
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(()=>{
        setRefreshing(false)
    })
  }, [refreshing]);

  // end of reffreshign attempt code

  const { userData } = getUserInfo();

  const userId = userData.id;

  const {state: list, dispatchState, ADD_GAMES, DELETE_GAMES, loadGames} = useGameData();

  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    api.get("/games/library").then((res) => {
      setAllGames(res.data.games);
    });
  }, []);

  useEffect(() => {
    navigation.setParams({ numberOfGames: list.length, goToGameLibrary });
  }, [list.length, allGames.length]);



  const goToGameLibrary = function (){
    navigation.navigate('GameLibrary', {
      games: allGames, // all the games from DB
      ownedGames: list, // all the games from user_games
      dispatchState, // the dispatcher for list
      ADD_GAMES, // action for list
    })
  };

  return (
    <>
      <ScrollView 
        style={styles.gameListContainer}
        refreshControl={
          <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } />
        }
      >
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