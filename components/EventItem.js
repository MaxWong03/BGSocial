
import React from 'react';
import { StyleSheet, View } from 'react-native';
import EventItemDescription from './EventItemDescription';
import { ListItem } from 'react-native-elements';

export default function EventItem({ eventTitle, imageUrl, chosenDate, attendants, isOwner, confirmedAssistance, onPress, isOpen, spots }) {
  return (
    <ListItem
      leftAvatar={{ size: 140, rounded: false, source: { uri: imageUrl } }}
      containerStyle={styles.itemStyle}
      pad={0}
      title={
        <View style={{ alignSelf: 'stretch', flex: 1 }}>
          <EventItemDescription
            chosenDate={chosenDate}
            isOwner={isOwner}
            confirmedAssistance={confirmedAssistance}
            attendants={attendants}
            onPress={onPress}
            eventTitle={eventTitle}
            isOpen={isOpen}
            spots={spots}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'white',
    padding: 0,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden'
  },
});