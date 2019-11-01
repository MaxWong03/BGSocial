import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements';
import DatePicker from './DatePicker';

export default function TimeListItem({ id, changeTimeSlot, deleteTimeSlot, presetDate }) {
  const [date, setDate] = useState(presetDate ? new Date(presetDate) : new Date());
  const onChangeDate = (newDate) => {
    setDate(newDate);
    changeTimeSlot(id, newDate);
  }
  return (
    <ListItem
      title={date.toString()}
      leftIcon={
        <Icon
          name='date-range'
          type='material-icons'
        />
      }
      rightElement={
        <>
          <Button
            icon={
              <Icon
                name='calendar-remove'
                type='material-community'
                color='white'
              />
            }
            buttonStyle={styles.deleteButton}
            onPress={() => deleteTimeSlot(id)}
          />
          <DatePicker
            date={date}
            onChangeDate={onChangeDate}
          />
        </>
      }
      bottomDivider
    />
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
    padding: 9,
    marginRight: 5
  }
});