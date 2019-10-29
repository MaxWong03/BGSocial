import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import EventTitle from '../components/CreateEventTitle';
import EventDate from '../components/CreateEventDate';
import EventGames from '../components/CreateEventGames';
import EventFriends from '../components/CreateEventFriends';

export default function createEventScreen() {
  const [timeSlots, setTimeSlots] = useState([{ id: 'time-1', title: 'Time-1' }]);


  const addTimeSlot = () => {
    const newTime = { id: `time-${timeSlots.length + 1}`, title: `Time-${timeSlots.length + 1}` }
    setTimeSlots([...timeSlots, newTime])
  };

  const createEvent = () => {

  };

  return (
    <>
      <EventTitle />
      <ScrollView >
        <EventDate
          timeSlots={timeSlots}
          addTimeSlot={addTimeSlot}
        />
        <EventGames />
        <EventFriends />
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
  EventTitleLabel: {
    fontSize: 30
  },
  SelectTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});