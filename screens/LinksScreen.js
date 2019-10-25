import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { useNavigationParam } from 'react-navigation-hooks';

export default function LinksScreen() {
  console.log('@LinksScreen:', useNavigationParam('userInfo'));
  // const {id, profilePicture} = useNavigationParam('userInfo');
  // console.log('@LinksScreen:', id, profilePicture);
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <ExpoLinksView />
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
