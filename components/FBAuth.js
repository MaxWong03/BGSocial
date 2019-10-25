import * as Facebook from 'expo-facebook';
import React from 'react';
import {
  Button,
  Alert,
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { NavigationActions } from 'react-navigation';

async function loginWithFacebook() {
  try {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync('561305434657781', {
      permissions: ['public_profile', 'email'], //permission email doesnt give you email, we have to use token / id to autehnticate ?
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      const { name, id } = await response.json();
      console.log('Token @ Auth:', token);
      // const graph = await fetch(`https://graph.facebook.com/${id}?fields=id,name,email&access_token=${token}`);
      console.log('Name @ Auth:', name, 'ID @ Auth:', id);
      const { url: profilePicture } = await fetch(`https://graph.facebook.com/v4.0/${id}/picture?height=350&width=350`)
      console.log(profilePicture);
      // Alert.alert(`User: ${(await response.json()).name}`);
      return [type, id, profilePicture]
    } else {
      return type;
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}

export default function FBAuth(props) {
  const { navigate, dispatch } = useNavigation();
  const loginAndNavigate = () => {
    loginWithFacebook()
      .then(([type, id, profilePicture]) => {
        if (type === "success") {
          const userInfo = { id, profilePicture };
          navigate('Main', { userInfo }); //navigate to home screen passing userInfo as params
          // const setParmasAction = NavigationActions.setParams({
          //   parmas: { userInfo },
          //   key: 'LinksStack'
          // });
          // dispatch(setParmasAction);
        }//else do nothing
      });
  }
  return (
    <Button
      onPress={() => loginAndNavigate()}
      title={props.title}
    />
  );
}