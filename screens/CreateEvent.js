import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, ListItem, Icon } from 'react-native-elements';
import InviteFriends from '../components/InviteFriends';
import DatePicker from '../components/DatePicker';
import SelectGames from '../components/SelectGames';

export default function createEventScreen() {
  return (
    <>
      <Input
        placeholder={"Enter Event Name..."}
        label={"Event Title"}
        labelStyle={styles.EventTitleLabel}
      />
      <Text style={styles.SectionHeader}> Select Time</Text>
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
      <Text style={styles.SectionHeader}> Select Games</Text>
      <ListItem
        title={'Games:'}
        leftIcon={
          <Icon
            name='videogame-asset'
            type='material-icons'
          />
        }
        rightElement={<SelectGames />}
      />
      <InviteFriends />
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
  SectionHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'grey'
  }
});