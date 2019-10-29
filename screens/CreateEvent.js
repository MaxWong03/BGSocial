import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import EventTitle from '../components/CreateEventTitle';
import EventDate from '../components/CreateEventDate';
import EventGames from '../components/CreateEventGames';
import EventFriends from '../components/CreateEventFriends';

export default function createEventScreen() {
  const [timeSlots, setTimeSlots] = useState([{ id: 0, time: new Date() }]);


  const addTimeSlot = () => {
    if (timeSlots.length < 3) {
      const newTime = { id: timeSlots.length, time: new Date() }
      setTimeSlots([...timeSlots, newTime])
    }
  };

  const changeTimeSlot = (index, newDate) => {
    const updateTimeSlot = timeSlots.map((time) => {
      if (time.id === index) return { ...time, time: newDate };
      else return time;
    });
    setTimeSlots(updateTimeSlot);
  };

  const createEvent = () => {
    console.log('Selected Times:', timeSlots);
  };

  return (
    <>
      <EventTitle />
      <ScrollView >
        <EventDate
          timeSlots={timeSlots}
          addTimeSlot={addTimeSlot}
          changeTimeSlot={changeTimeSlot}
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