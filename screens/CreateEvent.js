import React from 'react';
import AttendanceList from '../components/AttendanceList';

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
      <AttendanceList/>
    </View>
  );
}