import * as Facebook from 'expo-facebook';
import React from 'react';
import { SocialIcon } from 'react-native-elements'
import { useNavigation } from 'react-navigation-hooks';
import axios from 'axios';

import { facebookLogin } from './../api';

import { getUserInfoContext } from './../hooks/sessionContext';

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
      const userData = await facebookLogin(fbID);

      return { type, fbID, profilePicture, name, userData }
    } else { //type === 'cancel', user doesn't wanna login
      return { type };
    }
  } catch (err) {
    console.log(`Facebook Login Error: ${err} \n ${err.message}`);
  }
}

export default function FBAuth({ title }) {
  const { navigate, dispatch } = useNavigation();
  // Only interested in the part of the context related to SET the state (userInfo) value.
  const { setUserInfo } = getUserInfoContext();
  const loginAndNavigate = () => {
    loginWithFacebook()
      .then(({ type, fbID, profilePicture, name, userData }) => {
        if (type === "success") {
          const userInfo = {
            fbID,
            name,
            profilePicture,
            userData, //object
          };
          setUserInfo(userInfo);
          navigate('Main');
        }
        else {
          console.log('Failed to login:', type, id, profilePicture);
        }
      }).catch(e => console.log(e));
  }
  return (
    <SocialIcon
      title={title}
      onPress={() => loginAndNavigate()}
      button
      type='facebook'
      style={{padding: 45}}
    />
  );
}