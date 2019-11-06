import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ListItem } from "react-native-elements";

// this is the component in the 
// 'Sent Request' group of 
// 'Friend Navigator' 
export default function SentRequestUser({ user, cancelFriendRequest }) {
  return (
    <ListItem
      key={user.id}
      leftAvatar={{ size: 60, rounded: true, source: { uri: user.avatar } }}
      title={ user.name }
      titleStyle={{fontWeight: '600', color: '#485152'}}
      subtitle = {
        <View style= { styles.subtitleViewStyle } >
          <Button
            buttonStyle = { styles.buttonStyle }
            title={"Cancel Request"}
            titleStyle={{fontWeight: '600'}}
            type='outline'
            onPress={ ()=> {
              cancelFriendRequest(user.id);
            }}
          />
        </View>
      }
      topDivider
      bottomDivider
    />
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 200,
    padding: 10,
    borderWidth: 1
  },
  subtitleViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8
  }
});