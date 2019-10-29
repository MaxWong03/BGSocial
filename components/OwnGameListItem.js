import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { formatDateWithTime } from './../utils'

export default function OwnGameListItem({ imageURL, date, title }) {
  return (
    <View style={styles.flexParent}> 
      <View style={styles.imamgContainer}>
        <Image
          style={{flex: 1,
            width: null,
            height: null,
            resizeMode: 'contain'}}
          source={{uri: imageURL}}
        />
      </View>

      <View style={styles.textContainer}>
        <Text>{title}</Text>
        <Text>{formatDateWithTime(date)}</Text>
      </View>

      <View style={styles.iconContainer}>
        <Button
          icon={
            <Icon
              name="arrow-right-thick"
              type="material-community"
              size={30}
              color="white"
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexParent: {
    margin: 10,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
    height: 150,
    alignItems: 'stretch', // align them to the max width
    borderColor: '#eee',
    borderWidth: 1
  },
  imamgContainer:{
    flex: 3,
    height: '100%',
    width: '100%',
    backgroundColor: 'blue'
  },
  textContainer:{
    flex: 3,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    backgroundColor: 'yellow',
    flex: 1,
    padding: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  }
});