import React, { useState } from 'react';
import { ListItem, Icon } from 'react-native-elements';
import DatePicker from './DatePicker';

export default function TimeListItem({ index, title }) {
  const [date, setDate] = useState(new Date());
  const onChangeDate = (newDate) => {
    setDate(newDate);
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
      <DatePicker 
        date={date}
        onChangeDate={onChangeDate}
      />}
      bottomDivider
    />
  );
}