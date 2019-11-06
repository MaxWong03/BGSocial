import React, { useState } from 'react';
import { ListItem, Icon } from 'react-native-elements';
import { api } from '../api';
import { StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { formatDateWithTime, formatTime } from '../utils';
import { useNavigation } from 'react-navigation-hooks';
import useFriendsData from '../hooks/useFriendsData';
import useGamesLib from '../hooks/useGamesLib';
import useGamesData from '../hooks/useGamesData';

export default function PlaysScreen({ navigation }) {

    // Refreshing attempt
    const fetchData = async() =>{ // get the data again
      loadPlays();
      loadAllFriends();
      loadGames();
    }
  
    const [refreshing, setRefreshing] = React.useState(false);
  
    const onRefresh = React.useCallback(() => {
      // console.log("in the onrefresh function");
      setRefreshing(true);
      fetchData().then(()=>{
          setRefreshing(false)
      })
    }, [refreshing]);
  
    // end of reffreshign attempt code

  const [state, setPlay] = useState({ plays: [], games: {} });
  const { navigate } = useNavigation();
  const { state: userFriends, loadAllFriends } = useFriendsData();
  const { loadGames } = useGamesData();
  const { gameLib: userGames } = useGamesLib();

  async function loadPlays() {
    const plays = await api.get(`/plays/`);
    setPlay({ state, plays: plays.data.plays, games: plays.data.games, users: plays.data.users });
  };


  function onWillFocus() {
    loadPlays();
  }

  function usersLine(play) {
    let string = play.playsUsers.map(playUser => state.users[playUser.user_id].name).join(', ');
    return string;
  }

  return (
    <View style={{ height: "100%" }}>
      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } />
        }
      >
        <NavigationEvents onWillFocus={onWillFocus} />
        {
          state.plays.map((play) => (
            <ListItem
              key={play.id}
              rightAvatar={{ size: 120, rounded: false, source: { uri: state.games[play.game_id].image } }}
              title={state.games[play.game_id].name}
              subtitle={
                <View>
                  <Text>Date: {formatDateWithTime(play.date)}</Text>
                  <Text>Duration: {formatTime(play.duration)}</Text>
                  <Text>Players: {usersLine(play)}</Text>
                </View>
              }
              onPress={() => navigation.navigate('SinglePlay', {
                play: play,
                game: state.games[play.game_id],
                users: state.users,
                userGames,
                userFriends
              })}
              bottomDivider
            />
          ))
        }
      </ScrollView>
      <View style={styles.iconBox}>
        <Icon
          size={20}
          name='plus-square'
          type='font-awesome'
          color='white'
          onPress={() => navigate('CreatePlay', {
            userFriends,
            userGames
          })}
          iconStyle={styles.icon}
        />
      </View>
    </View>
  )
}

PlaysScreen.navigationOptions = {
  title: 'Plays',
};


const styles = StyleSheet.create({
  buttonGroup: {
    backgroundColor: '#fafafa',
    height: 50
  },
  icon: {
    color: 'white'
  },
  iconBox: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#0e92cf',
    borderRadius: 1000,
    // opacity: 0.8,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignContent: 'center'

  }

});