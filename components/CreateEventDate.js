import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, ListItem, Icon } from 'react-native-elements';
import TimeListItem from './TimeListItem';
export default function CreateEventDate({ buttonText,timeSlots, addTimeSlot, changeTimeSlot, deleteTimeSlot }) {
  return (
    <>
      <Button
        title={buttonText}
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
            presetDate={time.date}
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