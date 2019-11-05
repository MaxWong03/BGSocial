import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
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
    <ImageBackground source={{ uri: 'http://yesofcorsa.com/wp-content/uploads/2018/01/Board-Games-Wallpaper-Download.jpg' }} style={{ width: '100%', height: '100%' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="BG Social"
          buttonStyle={styles.logoContainer}
        />
        <FBAuth title={"Sign In With Facebook"} />
        <SocialIcon
          onPress={() => continueNotLogged(navigation)}
          title={"Continue without Facebook"}
          button
          type='codepen'
          style={{ padding: 20 }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    padding: 5,
    height: 100,
    width: 100,
    borderRadius: 400,
    marginBottom: 30
  }
})