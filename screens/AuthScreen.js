import React from 'react';
import {
  View,
} from 'react-native';
import FBAuth from '../components/FBAuth'

export default function AuthScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FBAuth title={"Register With Facebook"}/>
      <FBAuth title={"Login With Facebook"}/>
    </View>
  );
}

 