import React from 'react';
import {
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import FBAuth from '../components/FBAuth'

import { getUserInfoContext } from './../hooks/sessionContext';

export default function AuthScreen({ navigation }) {
  const { setUserInfo } = getUserInfoContext();

  function continueNotLogged(navigation) {

    const fakeUserInfo = {
      fbID: 921623601546635,
      profilePicture: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=921623601546635&height=350&width=350&ext=1574626882&hash=AeSZ-ILZTTrn2hrH',
      name: 'Miax Wiong',
      userData: {
        id: 1,
        fb_id: 921623601546635,
        name: 'Miax Wiong',
        nickname: 'Miad Miax',
        email: 'maxwong93@gmail.com',
        avatar: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=921623601546635&height=350&width=350&ext=1574626882&hash=AeSZ-ILZTTrn2hrH'
      }
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