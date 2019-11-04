
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { formatDateWithTime } from './../utils'


export default function EventItem({eventTitle,  chosenDate, attendants, isOwner, confirmedAssistance, onPress }) {
  let title = 'More info!';
  let icon = 'info-circle';
  if (chosenDate) {
    if (!isOwner && !confirmedAssistance) {
      title = 'Confirm';
      icon = 'check';
    }
  }
  else {
    if (isOwner) {
      title = 'Check votes!';
      icon = 'archive';
    }
    else {
      title = 'Vote!';
      icon = 'calendar';
    }
  }

  return (
    <View style={styles.textContainer}>
      {isOwner &&
        <View style={styles.hostFlag}>
          <Text style={{ color: 'white', paddingBottom: 6 }}>Hosting</Text>
        </View>
      }
      <View style={{ paddingVertical: 15 }}>
        <Text>{eventTitle ? eventTitle : ""}</Text>
        <Text>{chosenDate ? formatDateWithTime(chosenDate) : ""}</Text>
        <Text>{attendants ? `Attendants: ${attendants}` : (isOwner ? 'Choose a date for your event' : 'Friends going: 5')}</Text>
      </View>
      <Button
        buttonStyle={styles.button}
        title={title}
        type='outline'
        iconRight={true}
        onPress={onPress}
        icon={
          <Icon
            size={20}
            name={icon}
            type='font-awesome'
            color='#bdbdbd'
          />
        } />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between'
  },
  button: {
    justifyContent: 'space-around',
  },
  hostFlag: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
    paddingBottom: 0,
    backgroundColor: '#F38989',
    borderTopRightRadius: 10,
    aspectRatio: 1,
    paddingVertical: 5
  }
});