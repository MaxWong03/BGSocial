import React from 'react';
import { ListItem, Icon } from 'react-native-elements';
import DatePicker from './DatePicker';

export default function TimeListItem({index, title}) {
  return (
    <ListItem
      key={index}
      title={title}
      leftIcon={
        <Icon
          name='date-range'
          type='material-icons'
        />
      }
      rightElement={<DatePicker />}
      bottomDivider
    />
  );
}