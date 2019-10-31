import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';

export default function CreateEventTitle({ onChangeText, value }) {
  return (
    <Input
      inputContainerStyle={styles.inputContainer}
      placeholder={"Event Name:"}
      placeholderTextColor={'#545454'}
      onChangeText={onChangeText}
      inputStyle={styles.inputStyle}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '50%',
    backgroundColor: 'rgba(168, 165, 163, 0.3)',
    position: 'absolute',
    top: -100,
    left: 0
  },
  inputStyle:{
    fontSize: 20,
    fontWeight: 'bold'
  }
})