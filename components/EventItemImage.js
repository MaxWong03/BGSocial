import React from 'react';

import { StyleSheet, View, Image } from 'react-native';


export default function EventItemImage({ imageUrl }) {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{ uri: `${imageUrl}` }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  image: {
    aspectRatio: 1,
    resizeMode: 'cover',
  },
});