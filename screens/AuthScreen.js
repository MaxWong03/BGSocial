import React from 'react';
import {
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import FBAuth from '../components/FBAuth'
import { fakeLogin } from './../api';

import { getUserInfoContext } from './../hooks/sessionContext';

export default function AuthScreen({ navigation }) {
  const { setUserInfo } = getUserInfoContext();

  async function continueNotLogged(navigation) {
    const userData = await fakeLogin(1);
    const fakeUserInfo = {
      fbID: userData.fb_id,
      profilePicture: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=921623601546635&height=350&width=350&ext=1574626882&hash=AeSZ-ILZTTrn2hrH',
      name: 'Miax Wiong',
      userData: userData
    }

    setUserInfo(fakeUserInfo);
    navigation.navigate('Main');
  }


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