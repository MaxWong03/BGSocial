
import React from 'react';
import { StyleSheet, View } from 'react-native';
import EventItemDescription from './EventItemDescription';
import EventItemImage from './EventItemImage';
import AttendanceList from './AttendanceList';

const attendanceListBackgroundColor = '#fafafa';
// AttendanceList should show up using less space, only enough to show the icons.
export default function EventItem({ imageUrl, chosenDate, attendants, isOwner, confirmedAssistance }) {
  return (
    <View style={styles.flexParent}>
      <View style={styles.attendantsListContainer}>
        <AttendanceList backgroundColor={attendanceListBackgroundColor} />
      </View>
      <EventItemImage imageUrl={imageUrl} />
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
  attendantsListContainer: {
    flex: 0,
    backgroundColor: attendanceListBackgroundColor
  },
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