import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

export default function CreateEventTitle() {
  return (
    <Input
      placeholder={"Enter Event Name..."}
      label={"Event Title"}
      labelStyle={styles.EventTitleLabel}
    />
  );
}

const styles = StyleSheet.create({
  EventTitleLabel: {
    fontSize: 30
  }
})