import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import EventTitle from '../components/CreateEventTitle';
import EventDate from '../components/CreateEventDate';
import EventGames from '../components/CreateEventGames';
import EventFriends from '../components/CreateEventFriends';
import useTimeSlot from '../hooks/useTimeSlot';
import useGameSlot from '../hooks/useGameSlot';
import useFriendSlot from '../hooks/useFriendSlot';
import MapView, { Marker } from 'react-native-maps';

export default function createEventScreen() {
  const { timeSlots, addTimeSlot, changeTimeSlot, deleteTimeSlot } = useTimeSlot();
  const { gameSlots, changeGameSlot } = useGameSlot();
  const { friendSlots, changeFriendSlot } = useFriendSlot();
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [eventTitle, setEventTitle] = useState('');

  const onChangeText = (newTitle) => {
    setEventTitle(newTitle);
  }

  const createEvent = () => {
    console.log('Event Title:', eventTitle);
    console.log('Selected Times:', timeSlots);
    console.log('Selected Games:', gameSlots);
    console.log('Invited Friends:', friendSlots);
    console.log('Location:', location)
  };

  return (
    <>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={({ nativeEvent }) => setLocation(nativeEvent.coordinate)}
        >
          <Marker draggable coordinate={location} />
          <EventTitle
          onChangeText={onChangeText}
          value={eventTitle}
        />
        </MapView>
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
    height: 200,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});