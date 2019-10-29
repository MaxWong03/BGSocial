import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { useNavigation } from 'react-navigation-hooks';


export default function LinksScreen() {
  const { dangerouslyGetParent } = useNavigation();
  const { fbID, profilePicture, userData } = dangerouslyGetParent().dangerouslyGetParent().getParam('userInfo');

  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <ExpoLinksView/>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
