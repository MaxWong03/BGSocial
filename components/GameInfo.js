import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { formatDateWithTime } from '../utils';
import { ListItem } from 'react-native-elements';

export default function GameInfo({ game, playTimes }) {
  const playTimeMin = game.play_time_min;
  const playTimeMax = game.play_time_max;

  return (
    <View>
      <ScrollView>
        <ListItem
          title={game.name}
          titleStyle={{ paddingLeft: 8, paddingBottom: 10, fontSize: 18, color: '#485152' }}
          rightAvatar={{ size: 120, rounded: false, source: { uri: `${game.image}` } }}
          subtitle={
            <View style={{ paddingLeft: 8, paddingBottom: 10, color: '#485152' }}>
              {!!playTimes && <Text style={{ color: '#485152' }}>Times played: {playTimes}</Text>}
              <Text style={{ marginTop: 7, color: '#485152' }}>Last Played: {formatDateWithTime(game.last_play)}</Text>
              {playTimeMin === playTimeMax &&
                <Text style={{ marginTop: 7, color: '#485152' }}>Play time: {playTimeMin} mins</Text>
              }

              {playTimeMin !== playTimeMax &&
                <Text style={{ marginTop: 7, color: '#485152' }}>Play time: {playTimeMin} to {playTimeMax} mins</Text>
              }
              <Text style={{ marginTop: 7, color: '#485152' }}>Average Rating in Bgg: {Math.round(game.average_bgg_rating * 100) / 100}</Text>
              <Text style={{ marginTop: 7, color: '#485152' }}>Category: {game.category}</Text>
            </View>
          }
          bottomDivider
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: 'red',
  },
  image: {
    height: 250,
    width: '100%',
    // resizeMode: 'cover',
  },
  textContainer: {
    fontSize: 30,
    padding: 20
  },
  titleStyle: {
    fontSize: 30,
    textAlign: 'center', // <-- the magic
  }
});