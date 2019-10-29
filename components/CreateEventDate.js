import React from 'react';
import { ScrollView } from 'react-native';
import { Button, ListItem, Icon } from 'react-native-elements';
import DatePicker from './DatePicker';
export default function CreateEventDate({ timeSlots, addTimeSlot }) {
  return (
    <>
      <Button
        title={'Add Date'}
        icon={
          <Icon
            name='calendar-plus-o'
            type='font-awesome'
            color='white'
          />
        }
        onPress={addTimeSlot}
      />
      <ScrollView>
        {
          timeSlots.map((time, index) => (
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
      </ScrollView>
    </>
  )
}