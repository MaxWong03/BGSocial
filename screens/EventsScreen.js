import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import axios from 'axios';
import { useEventsData } from './../hooks/useEventsData'
// import events from '../api/events';


export default function EventsScreen() {

  const {
    state,
    dispatchState
  } = useEventsData();


  // useNavigation();

  return (
    <View><Text>{JSON.stringify(state.events)}</Text></View>
  );
}

EventsScreen.navigationOptions = {
  title: 'Events',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
