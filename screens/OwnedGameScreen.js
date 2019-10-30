import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
// import { useEventsData } from './../hooks/useEventsData';
import { Header, Button, Icon, Divider } from 'react-native-elements';
// import { formatDateWithTime } from './../utils'
import OwnGameListItem from '../components/OwnGameListItem';
import api from './../api';

import { updateLoading, updateList } from './../reducers/user_games_action';
import { initState, initReducer } from './../reducers/user_games_reducer';

export default function TestScreen({ navigation }) {

  const userID = 1;

  const [count, setCount] = useState(0);

  const [state, dispatch] = useReducer(initReducer, initState);

  const [allGames, setAllGames] = useState([]);

  const [date, setDate] = useState("");

  const {list = [], loading} = state 

  const goToGameLibrary = function (){
    navigation.navigate('GameLibrary', {
      games: allGames,
      ownedGames: list,
      onGoBack: () => getData()
    })
  };

  useEffect(() => {
    getData();
    api.get("/games/library").then((res) => {
      setAllGames(res.data.games);
    })
  }, [])

  const getData = () => {
    api.get(`/user/games/${userID}`)
    .then(res => {
      setCount(res.data.games.length);
      dispatch(updateList(res.data.games))
      dispatch(updateLoading(false))
    });
  }

  return (
    <>
      <Header
        // leftComponent={}
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
        <Text style={ { fontSize: 50 } }>{count} games</Text>
        {
          loading ? <Text>LOADING</Text> : 
          list.map((event, index) => {
            return (
              <OwnGameListItem
                key={ index }
                imageURL = { event.image }
                date = { event.last_play }
                title = { event.name }
              />
            );
          })
        }
      </ScrollView>
    </>
  );
}

TestScreen.navigationOptions = { // title at the top
  title: 'Test',
};

const styles = StyleSheet.create({
});