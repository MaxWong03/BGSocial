
import React from 'react';
import { StyleSheet, View } from 'react-native';
import EventItemDescription from './EventItemDescription';
import EventItemImage from './EventItemImage';
import AttendanceList from './AttendanceList';

// AttendanceList should show up using less space, only enough to show the icons.
export default function EventItem({ imageUrl, chosenDate, attendants, isOwner, confirmedAssistance }) {
  return (
    <View style={styles.flexParent}>
      <View style={{flex: 0}}>
        <AttendanceList/> 
      </View>
      <EventItemImage imageUrl={imageUrl}/>
      <EventItemDescription
        chosenDate={chosenDate}
        isOwner={isOwner}
        confirmedAssistance={confirmedAssistance}
        attendants={attendants}
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