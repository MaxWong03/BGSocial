import React from 'react';
import { ListItem, Icon, Button } from 'react-native-elements';
import DatePicker from './DatePicker';


export default function RecordTime(recordDate, setRecordTime) {
  console.log(recordDate);
  return (
    <ListItem
    title={recordDate.toString()}
    leftIcon={
        <Icon
          name='date-range'
          type='material-icons'
        />
      }
      rightElement={
          <DatePicker
            date={recordDate}
            onChangeDate={setRecordTime}
          />
      }
      bottomDivider
    />
  )
}