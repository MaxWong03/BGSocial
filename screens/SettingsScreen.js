import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { useNavigation } from 'react-navigation-hooks';

export default function SettingsScreen() {
  const {dangerouslyGetParent} = useNavigation();
  const { id, profilePicture } = dangerouslyGetParent().dangerouslyGetParent().getParam('userInfo');
  console.log('@SettingsScreen:', id, profilePicture);
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return <ExpoConfigView />;
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};
