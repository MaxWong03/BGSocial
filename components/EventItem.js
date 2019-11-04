
import React from 'react';
import { StyleSheet, View } from 'react-native';
import EventItemDescription from './EventItemDescription';
import EventItemImage from './EventItemImage';

export default function EventItem({eventTitle, imageUrl, chosenDate, attendants, isOwner, confirmedAssistance, onPress }) {
  return (
    <View style={styles.flexParent}>
      <EventItemImage imageUrl={imageUrl} />
      <EventItemDescription
        chosenDate={chosenDate}
        isOwner={isOwner}
        confirmedAssistance={confirmedAssistance}
        attendants={attendants}
        onPress={onPress}
        eventTitle={eventTitle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flexParent: {
    margin: 10,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
    height: 150,
    alignItems: 'flex-start',
    borderColor: '#eee',
    borderWidth: 1
  },
});