import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
// import { useEventsData } from './../hooks/useEventsData';
import { Header, Button, Icon, Divider } from 'react-native-elements';
// import { formatDateWithTime } from './../utils'
import EventItem from '../components/EventItem';

export default function EventsScreen() {

  // const {
  //   state,
  //   dispatchState,
  //   confirmEvents,
  //   pendingEvents
  // } = useEventsData();

  const exampleData = [
    {
      name: 'Die Macher',
      img: 'https://cf.geekdo-images.com/original/img/uqlrq_bQJqHpcaN7_7qocV5XfbU=/0x0/pic4718279.jpg',
      last_played: '2019-11-01'
    },
    {
      name: 'Dragonmaster',
      img: 'https://cf.geekdo-images.com/original/img/o07K8ZVh0PkOpOnSZs1TuABb7I4=/0x0/pic4001505.jpg',
      last_played: '2019-11-07'
    }
  ]

  return (
    <View>
      <Header
        leftComponent={<Button
          icon={
            <Icon
              name="sort"
              size={30}
              color="white"
            />
          }
        />}
        centerComponent={{ text: 'My Games', style: { color: '#fff', fontSize: 25 } }}
        rightComponent={<Button
          icon={
            <Icon
              name="add"
              size={30}
              color="white"
            />
          }
        />}
        containerStyle={{height: 'auto'}}
      />
      <Divider style={{ backgroundColor: 'blue', height: 5 }} />
      <View style={ { justifyContent: 'center',
                      // alignItems: 'center',
                      alignItems: "center"} }>
        <Text style={ { fontSize: 50 } }>4 games</Text>
      </View>

      <Divider style={{ backgroundColor: 'blue', height: 5 }} />
      
      {/* the each game part */}
      {
        exampleData.map((event, i) => {
          return (
            <View key={i} style={styles.flexParent}> 
              <View style={styles.imamgContainer}>
                <Image
                  style={{flex: 1,
                    width: null,
                    height: null,
                    resizeMode: 'contain'}}
                  source={{uri: event.img}}
                />
              </View>
      
              <View style={styles.textContainer}>
                <Text>{event.name}</Text>
                <Text>{event.last_played}</Text>
              </View>
      
              <View style={styles.iconContainer}>
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
              </View>
            </View>
          );
        })
      }
    </View>
  );
}

EventsScreen.navigationOptions = {
  title: 'Events',
};

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
  imamgContainer:{
    flex: 3,
    height: '100%',
    width: '100%',
    backgroundColor: 'blue'
  },
  textContainer:{
    flex: 3,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    backgroundColor: 'yellow',
    flex: 1,
    padding: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
