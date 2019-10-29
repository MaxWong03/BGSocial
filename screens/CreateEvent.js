import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import EventTitle from '../components/CreateEventTitle';
import EventDate from '../components/CreateEventDate';
import EventGames from '../components/CreateEventGames';
import EventFriends from '../components/CreateEventFriends';
import useTimeSlot from '../hooks/useTimeSlot';
import useGameSlot from '../hooks/useGameSlot';
import useFriendSlot from '../hooks/useFriendSlot';

export default function createEventScreen() {
  const {timeSlots, addTimeSlot, changeTimeSlot} = useTimeSlot();
  const {gameSlots, changeGameSlot} = useGameSlot();
  const {friendSlots, changeFriendSlot} = useFriendSlot();

  const createEvent = () => {
    console.log('Selected Times:', timeSlots);
    console.log('Selected Games:', gameSlots);
    console.log('Invited Friends:', friendSlots);
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
        <EventGames 
          changeGameSlot={changeGameSlot}
        />
        <EventFriends 
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
  EventTitleLabel: {
    fontSize: 30
  },
  SelectTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});