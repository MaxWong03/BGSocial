import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import EventTitle from '../components/CreateEventTitle';
import EventDate from '../components/CreateEventDate';
import EventGames from '../components/CreateEventGames';
import EventFriends from '../components/CreateEventFriends';

export default function createEventScreen() {
  const [timeSlots, setTimeSlots] = useState([{ id: 'time-1', title: 'Time-1' }]);
  const [gamesSlots, setGameSlots] = useState([]);


  const addTimeSlot = () => {
    const newTime = { id: `time-${timeSlots.length + 1}`, title: `Time-${timeSlots.length + 1}` }
    setTimeSlots([...timeSlots, newTime])
  };

  const addGameSlot = () => {

  };

  return (
    <>
      <EventTitle />
      <EventDate
        timeSlots={timeSlots}
        addTimeSlot={addTimeSlot}
      />
      <EventGames 
        gamesSlots={gamesSlots}
        addGameSlot={addGameSlot}
      />
      <EventFriends />
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