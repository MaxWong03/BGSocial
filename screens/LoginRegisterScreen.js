import * as Facebook from 'expo-facebook';
import React from 'react';
import {
  View,
  Button,
  Alert
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

async function loginWithFacebook() {
  try {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync('561305434657781', {
      permissions: ['public_profile'], //permission email doesnt give you email, we have to use token / id to autehnticate ?
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(`User: ${(await response.json()).name}`);
      return type;
    } else {
      return type;
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}

export default function LoginRegisterScreen() {
  const { navigate } = useNavigation();
  const loginAndNavigate = () => {
    loginWithFacebook()
      .then((type) => type === "success" ? navigate('Main') : 'Do Nothing' );
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        onPress={() => loginAndNavigate()}
        title="Login with facebook"
      >
      </Button>
    </View>
  );
}

