import React from 'react';
import AttendenceList from '../components/AttendenceList';

import {
  // StyleSheet,
  Text,
  View,
  // Dimensions
} from 'react-native';

import { ListItem } from 'react-native-elements'


export default function createEventScreen() {
  return (
    <View> 
      <AttendenceList/>
    </View>
  );
}