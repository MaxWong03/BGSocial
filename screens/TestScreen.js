import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function authScreen() {
  return(
    <View style={styles.container}>
      <Text> Replace This Text Container To Test Out Components</Text>
  </View>
  );
};