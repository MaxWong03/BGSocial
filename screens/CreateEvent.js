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
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { NavigationEvents } from 'react-navigation';

import { api } from './../api';

export default function createEventScreen() {
  const { timeSlots, addTimeSlot, changeTimeSlot, deleteTimeSlot } = useTimeSlot();
  const { gameSlots, changeGameSlot } = useGameSlot();
  const { friendSlots, changeFriendSlot } = useFriendSlot();
  const [eventTitle, setEventTitle] = useState('');
  const { location, latitude, longitude, setLatitude, setLongitude } = useLocation();
  const refreshEventScreen = useNavigationParam('refreshEventScreen');
  const loadGames = useNavigationParam('loadGames');
  const { navigate } = useNavigation();
  const userGames = useNavigationParam('userGames')
  const userFriends = useNavigationParam('userFriends')
  // console.log("userGames:", userGames.length);
  const createEventAction = () => {

    const eventDates = timeSlots.map(time => {
      return {
        "date": JSON.stringify(time["date"]),
        "is_chosen": false,
        "is_open": true,
        "location": location
      }
    });

    const eventAttendants = friendSlots.map(friend => {
      return {
        "is_confirmed": true,
        "is_not_assisting": false,
        "attendant_id": friend
      }
    });

    eventAttendants.push({
      "is_confirmed": true,
      "is_not_assisting": false,
      "attendant_id": 1
    })

    const eventGames = gameSlots.map(game => {
      return {
        "game_id": game
      }
    })


    const newEvent = {
      "owner_id": 1,
      eventDates,
      eventAttendants,
      eventGames
    };

    api.post(`/events/`, newEvent).then((res) => {
      const { data: createdEvent } = res;
      createdEvent['chosen_event_date'] = {
        date: null,
        location: null
      };
      refreshEventScreen();
      navigate('Events');
    })
  };

  return (
    <>
      <NavigationEvents
      onWillFocus={payload => {
        console.log('will focus')
        loadGames();
      }}
      onDidFocus={payload => {
        console.log('did focus')
        loadGames();
      }}
      onWillBlur={payload => console.log('will blur')}
      onDidBlur={payload => console.log('did blur')}
      />
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
                onChangeText={setEventTitle}
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
          userGames={userGames}
          changeGameSlot={changeGameSlot}
        />
        <EventFriends
          userFriends={userFriends}
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
        onPress={createEventAction}
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