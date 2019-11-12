import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
import FBAuth from '../components/FBAuth'
import { fakeLogin } from './../api';

import { getUserInfoContext } from './../hooks/sessionContext';

export default function AuthScreen({ navigation }) {
  const { setUserInfo } = getUserInfoContext();

  async function continueNotLogged(navigation) {
    const userData = await fakeLogin(2);
    const fakeUserInfo = {
      fbID: userData.fb_id,
      profilePicture: userData.avatar,
      name: userData.name,
      userData: userData
    }

    setUserInfo(fakeUserInfo);
    navigation.navigate('Main');
  }


  return (
    <ImageBackground source={{ uri: 'https://images.squarespace-cdn.com/content/v1/5a3fb191cd39c31f96b9b371/1550461524147-P22HG427FJBXT843PEQ3/ke17ZwdGBToddI8pDm48kPTrHXgsMrSIMwe6YW3w1AZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0k5fwC0WRNFJBIXiBeNI5fKTrY37saURwPBw8fO2esROAxn-RKSrlQamlL27g22X2A/633A6964-Edit.jpg' }} style={{ width: '100%', height: '100%' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 300 }}>
        <Button
          title="BG Social"
          buttonStyle={styles.logoContainer}
          titleStyle={styles.logoTitle}
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
    height: 150,
    width: 150,
    borderRadius: 400,
    marginBottom: 15,
    marginTop: 5,
    backgroundColor: '#8CC2FF'
  },
  logoTitle:{
    fontWeight: 'bold',
    fontSize: 30
  }
})