import React, { useState } from 'react';
import { ListItem } from 'react-native-elements';
import { api } from '../api';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { formatDateWithTime } from '../utils';

export default function PlaysScreen() {
  const [state, setPlay] = useState({ plays: [], games: {} });

  async function loadPlays() {
    const plays = await api.get(`/plays/`);
    setPlay({ state, plays: plays.data.plays, games: plays.data.games, users: plays.data.users });
  };

  function onWillFocus() {
    loadPlays();
  }

  function usersLine(play) {
    let string = play.playsUsers.map(playUser => state.users[playUser.user_id].name).join(', ');
    // if (string.length > 20) {
    //   return string.substring(0, 20) + '...';
    // }
    return string;
  }

  return (
    <ScrollView>
      <NavigationEvents onWillFocus={onWillFocus} />
      {
        state.plays.map((play, i) => (
          <ListItem
            key={i}
            rightAvatar={{ size: 120, rounded: false, source: { uri: state.games[play.game_id].image } }}
            title={state.games[play.game_id].name}
            subtitle={
              <View>
                <Text>Date: {formatDateWithTime(play.date)}</Text>
                <Text>Duration: {play.duration}</Text>
                <Text>Players: {usersLine(play)}</Text>
              </View>
            }
            bottomDivider
          />
        ))
      }
    </ScrollView>
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