import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, ListItem, Icon } from 'react-native-elements';
import TimeListItem from './TimeListItem';
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
        buttonStyle={styles.buttonContainer}
      />
      {
        timeSlots.map((time, index) => (
          <TimeListItem
            key={index}
            title={time.title}
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