import React from 'react';
import {
  View, Button
} from 'react-native';
import FBAuth from '../components/FBAuth'

function continueNotLogged(navigation) {
  navigation.navigate('Main');
}

export default function AuthScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FBAuth title={"Register With Facebook"} />
      <FBAuth title={"Login With Facebook"} />
      <Button
        onPress={() => continueNotLogged(navigation)}
        title={"Continue without login"}
      />
    </View>
  );
}