import * as Facebook from 'expo-facebook';
import React from 'react';
import {
  Button,
  Alert,
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';

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
      const basicInfo = await axios.get(`https://graph.facebook.com/me?access_token=${token}`);
      const { name, id: fbID } = basicInfo.data;
      const profileResponse = await axios.get(`https://graph.facebook.com/v4.0/${fbID}/picture?height=350&width=350`)
      const { responseURL: profilePicture } = profileResponse.request;
      const { data: userData } = await axios.get(`http://192.168.88.78:8080/api/users/facebook/${fbID}`);

      return [type, fbID, profilePicture, name, userData]
    } else { //type === 'cancel', user doesn't wanna login
      return type;
    }
  } catch (err) {
    console.log(`Facebook Login Error: ${err} \n ${err.message}`);
  }
}

export default function FBAuth(props) {
  const { navigate } = useNavigation();
  const loginAndNavigate = () => {
    loginWithFacebook()
      .then(([type, fbID, profilePicture, name, userData]) => {
        if (type === "success") {
          const userInfo = {
            fbID,
            profilePicture,
            userData //object
          };
          navigate('Main', { userInfo });
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