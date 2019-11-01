import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import {
  formatDateWithTime,
  getEventMainImage,
  getEventChosenEventDate,
  getConfirmedAttendants
} from './../utils';
import AttendanceList from '../components/AttendanceList';
import EventItem from '../components/EventItem';



export default function TestScreen() {
  return (
    <Text>Test Screen</Text>
  )
}
