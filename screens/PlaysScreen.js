import React, { useState } from 'react';
import { ListItem, Icon } from 'react-native-elements';
import { api } from '../api';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { formatDateWithTime, formatTime } from '../utils';

export default function PlaysScreen({ navigation }) {
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
    return string;
  }

  return (
    <View style={{ height: "100%" }}>
      <ScrollView >
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
              })}
              bottomDivider
            />
          ))
        }
        <View style={styles.iconBox}>
          <Icon
            size={20}
            name='plus-square'
            type='font-awesome'
            color='white'
            onPress={() => console.log("add play")}
            iconStyle={styles.icon}
          />
        </View>
      </ScrollView>
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