
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useEventsData } from './../hooks/useEventsData';
import { formatDateWithTime } from './../utils'
import EventItemSide from './EventItemSide'
import EventItemImage from './EventItemImage'
import AttendanceList from './AttendanceList';

export default function EventItem({ imageUrl, date, hosted, title }) {
  return (
    <View style={styles.flexParent}>
      <AttendanceList/>
      <EventItemImage 
        imageUrl={imageUrl}
      />
      <EventItemSide
        date={date}
        title={title}
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
    alignItems: 'stretch',
    borderColor: '#eee',
    borderWidth: 1
  },
});