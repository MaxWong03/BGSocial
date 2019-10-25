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
      const { name, id } = basicInfo.data;
      console.log('Token @ Auth:', token);
      console.log('Name @ Auth:', name, 'ID @ Auth:', id);
      const profileResponse = await axios.get(`https://graph.facebook.com/v4.0/${id}/picture?height=350&width=350`)
      console.log("real stupid");
      const {responseURL: profilePicture} = profileResponse.request;
      console.log("proPic", profilePicture);
      // const userData = await axios.get(`http://localhost:8080/api/users/${id}`);
      const userData = await axios.get(`http://192.168.88.78:8080/api/users/${id}`);
      console.log('userData:', userData);
      return [type, id, profilePicture]
    } else { //type === 'cancel', user doesn't wanna login
      return type;
    }
  } catch (err) {
    console.log(`Facebook Login Error: ${err} \n ${err.message}`);
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