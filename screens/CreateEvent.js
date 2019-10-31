import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import EventTitle from '../components/CreateEventTitle';
import EventDate from '../components/CreateEventDate';
import EventGames from '../components/CreateEventGames';
import EventFriends from '../components/CreateEventFriends';
import useTimeSlot from '../hooks/useTimeSlot';
import useGameSlot from '../hooks/useGameSlot';
import useFriendSlot from '../hooks/useFriendSlot';
import MapView, { Marker } from 'react-native-maps';
import useLocation from '../hooks/useLocation';
import { API_HOST } from './../settings/app.config';
import axios from 'axios';
import { getUserInfo } from '../hooks/sessionContext';

export default function createEventScreen() {
  const { timeSlots, addTimeSlot, changeTimeSlot, deleteTimeSlot } = useTimeSlot();
  const { gameSlots, changeGameSlot } = useGameSlot();
  const { friendSlots, changeFriendSlot } = useFriendSlot();
  const [eventTitle, setEventTitle] = useState('');
  const { location, latitude, longitude, setLatitude, setLongitude } = useLocation();
  const { userData } = getUserInfo();
  const onChangeText = (newTitle) => {
    setEventTitle(newTitle);
  }

  const createEvent = () => {
    console.log('Event Title:', eventTitle);
    console.log('Selected Times:', timeSlots);
    console.log('Selected Games:', gameSlots);
    console.log('Invited Friends:', friendSlots);
    console.log('Location:', location)


    axios.post(`${API_HOST}/events/`, {
      "owner_id": 1,
      "eventDates": timeSlots.map(time => {
        return {
          "date": time["date"],
          "is_chosen": false,
          "is_open": true,
          "location": location
        }
      }),
      "eventAttendants": [
        {
          "is_confirmed": true,
          "is_not_assisting": false,
          "attendant_id": 2
        }
      ],
      "eventGames": gameSlots.map(game => {
        return {
          "game_id": game
        }
      })
    })
  };


  // {
  //   "owner_id": 1,
  //   "eventDates": timeSlots.map(time => {
  //     return {
  //       "date": time["date"],
  //       "is_chosen": false,
  //       "is_open": true,
  //       "location": location
  //     }
  //   }),
  //   "eventAttendants": friendSlots.map(friend => {
  //     return {
  //       "is_confirmed": false,
  //       "is_not_assisting": false,
  //       "attendant_id": friend
  //     }
  //   }),
  //   "eventGames": gameSlots.map(game => {
  //     return {
  //       "game_id": game
  //     }
  //   })
  // }

  return (
    <>
      <View style={styles.mapContainer}>
        {
          latitude && longitude ?
            <>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onPress={({ nativeEvent }) => {
                  setLatitude(nativeEvent.coordinate.latitude);
                  setLongitude(nativeEvent.coordinate.longitude);
                }}
                children={
                  <Marker draggable coordinate={{ latitude, longitude }} />
                }
              />
              <EventTitle
                onChangeText={onChangeText}
                value={eventTitle}
              />
            </>
            :
            <ActivityIndicator size='large' color="#0000ff" />
        }

      </View>
      <ScrollView >
        <EventDate
          timeSlots={timeSlots}
          addTimeSlot={addTimeSlot}
          changeTimeSlot={changeTimeSlot}
          deleteTimeSlot={deleteTimeSlot}
        />
        <EventGames
          changeGameSlot={changeGameSlot}
        />
        <EventFriends
          friendSlots={friendSlots}
          changeFriendSlot={changeFriendSlot}
        />
      </ScrollView>
      <Button
        title='Create Event!'
        icon={
          <Icon
            name='check-circle'
            type='font-awesome'
            color='white'
          />
        }
        onPress={createEvent}
      />
    </>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    // ...StyleSheet.absoluteFillObject,
    height: 150,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});