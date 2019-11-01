import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import EventDates from '../components/CreateEventDate';
import EventGames from '../components/CreateEventGames';
import EventFriends from '../components/CreateEventFriends';
import { useNavigationParam } from 'react-navigation-hooks';
import useTimeSlot from '../hooks/useTimeSlot';
import useGameSlot from '../hooks/useGameSlot';
import useFriendSlot from '../hooks/useFriendSlot';
import { id } from '../utils/makeNewID';
import useLocation from '../hooks/useLocation';

export default function EditEventScreen() {
  const event = useNavigationParam('event');
  const userGames = useNavigationParam('userGames');
  const userFriends = useNavigationParam('userFriends');
  const { event_dates, event_attendants, event_games } = event;
  const { location: presetLocation } = event_dates[0];

  const timeArray = event_dates.map((date) => {
    return {
      id: id(),
      date: date.date
    }
  });
  const { gameSlots, changeGameSlot } = useGameSlot(event_games);
  const { friendSlots, changeFriendSlot } = useFriendSlot(event_attendants);
  const { timeSlots, addTimeSlot, changeTimeSlot, deleteTimeSlot } = useTimeSlot(timeArray);
  const { location, latitude, longitude, setLatitude, setLongitude } = useLocation(presetLocation);


  const editEventAction = () => {
    console.log('timeSlots:', timeSlots);
    console.log('gamesSlot', gameSlots);
    console.log('friendSlots', friendSlots);
    console.log('location', location);
  }
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
              {/* <EventTitle
                onChangeText={setEventTitle}
                value={eventTitle}
              /> */}
            </>
            :
            <ActivityIndicator size='large' color="#0000ff" />
        }

      </View>
      <ScrollView>
        <EventDates
          timeSlots={timeSlots}
          addTimeSlot={addTimeSlot}
          changeTimeSlot={changeTimeSlot}
          deleteTimeSlot={deleteTimeSlot}
          buttonText={'Edit Date'}
        />
        <EventGames
          userGames={userGames}
          changeGameSlot={changeGameSlot}
          eventGameList={event_games.map(game => {
            return {
              ...game['game'],
              selected: true
            }
          })}
          buttonText={'Edit Games'}
        />
        <EventFriends
          userFriends={userFriends}
          changeFriendSlot={changeFriendSlot}
          eventFriendList={event_attendants.map(friend => {
            return {
              ...friend,
              invited: true
            }
          })}
          buttonText={'Edit Attendance'}
        />
        <Button
          title='Edit Event!'
          icon={
            <Icon
              name='check-circle'
              type='font-awesome'
              color='white'
            />
          }
          onPress={editEventAction}
        />
      </ScrollView>
    </>
  )
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