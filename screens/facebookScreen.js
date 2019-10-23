import * as Facebook from 'expo-facebook';
import React from 'react';
import {
  View,
  Button
} from 'react-native';

import Firebase from '../Firebase';


// Listen for authentication state to change.
Firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

async function loginWithFacebook() {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    '561305434657781',
    { permissions: ['public_profile'] }
  );

  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = Firebase.auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    Firebase.auth().signInWithCredential(credential).catch((error) => {
      // Handle Errors here.
    });
  }
}

export default function fbScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button 
        onPress={() => loginWithFacebook()}
        title="Login with facebook"
      >
      </Button>
    </View>
  );
}

