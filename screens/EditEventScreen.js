import React, { useState } from 'react';
import { Text } from 'react-native';
import TimeListItem from '../components/TimeListItem';
import { useNavigationParam } from 'react-navigation-hooks';


export default function EditEventScreen() {
  const event = useNavigationParam('event');
  const { event_dates, event_attendants, event_games } = event;
  const timeArray = event_dates.map(date => date.date);
  console.log(timeArray);
  return (
    // event_dates.map((date, index) => (
    //   <TimeListItem
    //     key={index}
    //     title={date.date}
    //     changeTimeSlot={changeTimeSlot}
    //   />
    // ))
    <Text>HEHE</Text>
  )
}