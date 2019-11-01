//view 
// the whole game and the info


import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { Icon, Header, Button, Divider  } from 'react-native-elements';
import useList from '../hooks/useList';
import GameSearchBar from './../components/GameSearchBar';
import GameListItem from '../components/GameListItem';
import api from './../api';
import { PieChart } from 'react-native-svg-charts'


export default function GameMoreInfoScreen({navigation}) {

  const game = navigation.getParam("game");
  const userID = 1;

  console.log("in the more info");
  console.log(game);

  const play_time_min = game.play_time_min;
  const play_time_max = game.play_time_max;

  // const win_percentage = game.win_percentage


  const data = [ 50, (100 -50) ]
 
  const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

  const pieData = data
  .filter(value => value > 0)
  .map((value, index) => ({
      value,
      svg: {
          fill: randomColor(),
          onPress: () => console.log('press', index),
      },
      key: `pie-${index}`,
  }))

  return (
    <View>
      <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: `${game.image}` }}
            />
          </View>

          <View style={styles.textContainer}>
            <Text>{game.name}</Text>
            <View style={{ paddingVertical: 15 }}>

              { play_time_min === play_time_max &&
                <Text>{play_time_max} mins</Text>
              }

              { play_time_min !== play_time_max &&
                <Text>{play_time_min} to {play_time_max} mins</Text>
              }

              <Text>{game.average_bgg_rating}</Text>

              <Text>{game.category}</Text>
              <Text>{game.play_time_min}</Text>
              <Text>{game.description}</Text>


              <Text>{game.year_published}</Text>
              <Text>{game.mechanic}</Text>
              <Text>{game.last_paly}</Text>
              
            </View>




            <PieChart
              style={ { height: 200 } }
              data={ pieData }
            />



            <Button
              buttonStyle={styles.button}
              // title={title}
              type='outline'
              iconRight={true}
              onPress={ () => navigation.goBack() }
              icon={
                <Icon
                  size={20}
                  name='arrow-circle-left'
                  type='font-awesome'
                  color='#bdbdbd'
                  title='Go back previous page'
                />
              } />
          </View>
      </ScrollView>
      
    </View>
  );
}


const styles = StyleSheet.create({
  flexParent: {
    // margin: 10,
    // flexDirection: "row",
    // borderRadius: 10,
    // backgroundColor: '#fafafa',
    // overflow: 'hidden',
    // height: 150,
    // alignItems: 'flex-start',
    // borderColor: '#eee',
    // borderWidth: 1
    
  },
  imageContainer: {
    // flex: 1,
    backgroundColor: 'red',
  },
  image: {
    aspectRatio: 1,
    // resizeMode: 'cover',
    margin: 10,
    width: '100%',
    // flexDirection: "row",
    borderRadius: 10,
    backgroundColor: '#fafafa',
    // overflow: 'hidden',
    height: 250,
    // alignItems: 'flex-start',
    borderColor: '#eee',
    borderWidth: 1
  },
  textContainer: {
    // flex: 1,
    // padding: 20,
    // justifyContent: 'space-between'
  },
  button: {
    justifyContent: 'space-around',
  },
})