import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { formatDateWithTime } from './../utils'
import api from './../api';

export default function OwnGameListItem({ imageURL, date, title, game, dispatchState, DELETE_GAMES, last_play, onPress }) {

  const userID = 1;

  const removeEvent = function (game) {
    api.post(`games/user/${game.bgg_id}/delete`)
    .then(() => {
      dispatchState({type: DELETE_GAMES, value: game});
    });
  }

  return (
    <View style={styles.flexParent}> 
      <View style={styles.imamgContainer}>
        <Image
          style={{flex: 1,
            width: null,
            height: null,
            // resizeMode: 'contain'
          }}
          source={{uri: imageURL}}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={{marginTop: 10, fontSize: 20}} >{title}</Text>

        { !last_play &&
          <View style={styles.hostFlag}>
            <Text style={{ color: 'white', paddingBottom: 6 }}>New Game</Text>
          </View>
        
        }

        { last_play &&
          <Text>
            {formatDateWithTime(date)}
          </Text>
        }

        <Button
          buttonStyle={styles.button}
          title={"more info"}
          type='outline'
          iconRight={true}
          onPress={ onPress }
          icon={
            <Icon
              size={20}
              name={'info-circle'}
              type='font-awesome'
              color='#bdbdbd'
            />
          }
        />
        <Button
          buttonStyle={styles.button}
          title={"Delete"}
          type='outline'
          iconRight={true}
          onPress={()=> ( removeEvent(game) )}
          icon={
            <Icon
              name="minus-circle"
              type="font-awesome"
              size={20}
              color='#bdbdbd'
            />
          }
        />
      </View>

      {/* <View style={styles.iconContainer}>


        <Button
          icon={
            <Icon
              name="arrow-right-thick"
              type="material-community"
              size={30}
              color="white"
            />
          }
        />

      </View> */}
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
  imamgContainer:{
    flex: 3,
    height: '100%',
    width: '100%',
    // backgroundColor: 'blue'
  },
  textContainer:{
    flex: 3,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  // iconContainer: {
  //   backgroundColor: 'yellow',
  //   flex: 1,
  //   padding: 'auto',
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // }
});