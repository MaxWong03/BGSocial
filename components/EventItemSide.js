import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements'

export default function EvenItemSide({ date, title }) {
  return (
    <View style={styles.textContainer}>
      <View>
        <Text style={styles.name}>{date}</Text>
        <Text style={styles.attendanceCount}>Attendants: 4</Text>

      </View>
      <Button
        buttonStyle={styles.button}
        title={`${title}`}
        type='outline'
        iconRight={true}
        icon={
          <Icon
            size={20}
            name='info'
            type='material-icons'
            color='#bdbdbd'
          />
        } />
    </View>
  );
}

const styles = StyleSheet.create({

  textContainer: {
    flex: 3,
    padding: 20,
    justifyContent: 'space-between'
  },
  button: {
    justifyContent: 'space-around'
  },
});