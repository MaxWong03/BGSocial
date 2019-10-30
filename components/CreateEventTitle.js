import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';

export default function CreateEventTitle({ onChangeText, value }) {
  return (
    <Input
      placeholder={"Enter Event Name..."}
      label={"Event Title"}
      labelStyle={styles.EventTitleLabel}
      onChangeText={onChangeText}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  ImageContainer: {
    marginBottom: 30
  },
  EventTitleLabel: {
    fontSize: 30
  }
})