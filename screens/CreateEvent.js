import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements';
import DatePicker from '../components/DatePicker';
import EventTitle from '../components/CreateEventTitle';
import EventGames from '../components/CreateEventGames';
import EventFriends from '../components/CreateEventFriends';

export default function createEventScreen() {
  return (
    <>
      <EventTitle />
      <View style={styles.SelectTimeContainer}>
        <Text style={styles.SectionHeader}> Select Time</Text>
        <Button
          icon={
            <Icon
              name='group-add'
              type='material-icons'
              color='white'
            />
          }
        />
      </View>
      {
        times.map((time, index) => (
          <ListItem
            key={index}
            title={time.title}
            leftIcon={
              <Icon
                name='date-range'
                type='material-icons'
              />
            }
            rightElement={<DatePicker />}
            bottomDivider
          />
        ))
      }
      <EventGames />
      <EventFriends />
    </>
  );
}

const times = [
  {
    id: 'time-1',
    title: 'Time-1'
  },
  {
    id: 'time-2',
    title: 'Time-2'
  },
  {
    id: 'time-3',
    title: 'Time-3'
  }
]

const styles = StyleSheet.create({
  EventTitleLabel: {
    fontSize: 30
  },
  SelectTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});