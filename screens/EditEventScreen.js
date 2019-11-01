import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import EventDates from '../components/CreateEventDate';
import EventGames from '../components/CreateEventGames';
import { useNavigationParam } from 'react-navigation-hooks';
import useTimeSlot from '../hooks/useTimeSlot';
import useGameSlot from '../hooks/useGameSlot';
import { id } from '../utils/makeNewID';

export default function EditEventScreen() {
  const event = useNavigationParam('event');
  const userGames = useNavigationParam('userGames');
  const userFriends = useNavigationParam('userFriends');
  const { event_dates, event_attendants, event_games } = event;
  const { location } = event_dates[0];

  const timeArray = event_dates.map((date) => {
    return {
      id: id(),
      date: date.date
    }
  });
  const { gameSlots, changeGameSlot } = useGameSlot(event_games);
  const { timeSlots, addTimeSlot, changeTimeSlot, deleteTimeSlot } = useTimeSlot(timeArray);

  const editEventAction = () => {
    console.log('timeSlots:', timeSlots);
    console.log('gamesSlot', gameSlots);
  }
  return (
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

  )
}