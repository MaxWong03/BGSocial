import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements';
import DatePicker from './DatePicker';

export default function TimeListItem({ index, title, changeTimeSlot }) {
  const [date, setDate] = useState(new Date());
  const onChangeDate = (newDate) => {
    setDate(newDate);
    changeTimeSlot(index, newDate);
  }
  return (
    <ListItem
      key={index}
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