import React from 'react';
import {
  View,
} from 'react-native';
import FBAuth from '../components/FBAuth'

export default function LoginRegisterScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FBAuth title={"Login With Facebook"}/>
    </View>
  );
}

 