import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { formatDateWithTime } from './../utils'
import { api } from './../api';
import { getUserInfo } from './../hooks/sessionContext';

export default function OwnGameListItem({ imageURL, date, title, game, dispatchState, DELETE_GAMES, last_play, onPress }) {
 
  const { userData } = getUserInfo();

  const userId = userData.id;

  const removeEvent = function (game) {
    api.post(`games/user/${game.bgg_id}/delete`)
    .then(() => {
      dispatchState({type: DELETE_GAMES, value: game});
    });
  }
  const playTimeMin = game.play_time_min;
  const playTimeMax = game.play_time_max;

  return (
    <View style={styles.flexParent}> 
      <View style={styles.imageContainer}>
        <Image
          style={ styles.imageStyle }
          source={ {uri: imageURL} }
        />
      </View>

      <View style={styles.textContainer}>
        <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
          <Text style={{marginTop: 10, fontSize: 20}} >{title}</Text>
          <Text>
            Last Played: {date ? formatDateWithTime(date) : 'Never Played'}
          </Text>
          
          { playTimeMin === playTimeMax &&
            <Text>Play time: {playTimeMin} mins</Text>
          }

          { playTimeMin !== playTimeMax &&
            <Text>Play time: {playTimeMin} to {playTimeMax} mins</Text>
          }

        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8}}>
          <Button
            buttonStyle={styles.button}
            title={"More info"}
            type='outline'
            iconRight={true}
           onPress={ onPress }
          />
          <Button
            buttonStyle={styles.button}
            title={"Remove"}
            type='clear'
            iconRight={true}
            onPress={()=> ( removeEvent(game) )}
          />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  flexParent: {
    margin: 10,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
    height: 150,
    alignItems: 'stretch', // align them to the max width
    borderColor: '#eee',
    borderWidth: 1
  },
  hostFlag: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
    paddingBottom: 0,
    backgroundColor: '#F38989',
    borderTopRightRadius: 10,
    aspectRatio: 1,
    paddingVertical: 5
  },
  imageContainer:{
    flex: 3,
    height: '100%',
    width: '100%',
    // backgroundColor: 'blue'
  },
  imageStyle:{
    flex: 1,
    width: null,
    height: null,
  },
  textContainer:{
    paddingLeft: 16,
    flex: 5,
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  titleStyle: {
    marginTop: 10,
    fontSize: 20,
  }
});