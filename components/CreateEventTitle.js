import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';

export default function CreateEventTitle({ onChangeText, value }) {
  return (
    <Input
      inputContainerStyle={styles.inputContainer}
      placeholder={"Enter Event Name..."}
      placeholderTextColor={'#545454'}
      onChangeText={onChangeText}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '50%',
  },
})