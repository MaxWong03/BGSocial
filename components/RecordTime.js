import React from 'react';
import { ListItem, Icon, Button } from 'react-native-elements';
import DatePicker from './DatePicker';
import { formatDateWithTime } from '../utils'


export default function RecordTime({ date, setDate }) {
  return (
    <>
      <Button
        title={'Set Play Time'}
        icon={
          <Icon
            name='calendar-import'
            type='material-community'
            color='white'
            iconStyle={{ marginRight: 5 }}
          />
        }
      />
      <ListItem
        title={formatDateWithTime(date)}
        leftIcon={
          <Icon
            name='date-range'
            type='material-icons'
          />
        }
        rightElement={
          <DatePicker
            date={date}
            onChangeDate={setDate}
          />
        }
        bottomDivider
      />
    </>
  )
}