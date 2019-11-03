import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
// import { useEventsData } from './../hooks/useEventsData';
import { Header, Button, Icon, Divider } from 'react-native-elements';
// import { formatDateWithTime } from './../utils'
import OwnGameListItem from '../components/OwnGameListItem';
import { api } from './../api';
import useGameData from '../hooks/useGamesData';
import { getUserInfo } from './../hooks/sessionContext';
// import { updateLoading, updateList } from './../reducers/user_games_action';
// import { initState, initReducer } from './../reducers/user_games_reducer';

export default function OwnedGameScreen({ navigation }) {
  // const [count, setCount] = useState(0);
  // const [state, dispatch] = useReducer(initReducer, initState);
  // const [date, setDate] = useState("");
  // const {list = [], loading} = state
  // const {list, dispatchState} = useGameData();

  const { userData } = getUserInfo();

  const userId = userData.id;

  const {state: list, dispatchState, ADD_GAMES, DELETE_GAMES} = useGameData();

  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    api.get("/games/library").then((res) => {
      setAllGames(res.data.games);
    });
  }, [])

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
      <Header
        centerComponent={{ text: 'My Games', style: { color: '#fff', fontSize: 25 } }}
        rightComponent={<Button
          icon={
            <Icon
              name="add"
              size={30}
              color="white"
              onPress={ () => goToGameLibrary() }
            />
          }
        />}
        containerStyle={{height: 'auto'}}
      />
      <Divider style={{ backgroundColor: 'blue', height: 5 }} />
      <View style={ { justifyContent: 'center',
                      alignItems: "center"} }>
      </View>

      <Divider style={{ backgroundColor: 'blue', height: 5 }} />
      <ScrollView style={styles.gameListContainer}>
        <Text style={ { fontSize: 50 } }>{list.length} games</Text>
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

// OwnedGameScreen.navigationOptions = { // title at the top
//   title: 'Test',
// };

const styles = StyleSheet.create({
});