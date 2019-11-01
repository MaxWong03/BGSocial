import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, ListItem, Icon } from 'react-native-elements';
import TimeListItem from './TimeListItem';
export default function CreateEventDate({ timeSlots, addTimeSlot, changeTimeSlot, deleteTimeSlot }) {
  console.log(timeSlots);
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
        buttonStyle={styles.buttonContainer}
      />
      {
        timeSlots.map((time, index) => (
          <TimeListItem
            key={time.id}
            index={index}
            id={time.id}
            title={time.title}
            changeTimeSlot={changeTimeSlot}
            deleteTimeSlot={deleteTimeSlot}
          />
        ))
      }
    </>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 5
  }
})