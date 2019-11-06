import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ListItem } from "react-native-elements";

// this is the component in the 
// 'Friend Request' group of 
// 'Friend Navigator'
export default function FriendRequester({ friend, confirmFriendRequest, rejectFriendRequest }) {
  return (
    <ListItem
      key={friend.id}
      leftAvatar={{ size: 60, rounded: true, source: { uri: friend.avatar } }}
      title={ friend.name }
      titleStyle={{fontWeight: '600', color: '#485152'}}
      subtitle = {
      <View style= { styles.subtitleViewStyle } >
        <Button
          buttonStyle = { styles.buttonStyle }
          title={"Confirm"}
          titleStyle={{fontWeight: '600'}}
          type='outline'
          iconRight={true}
          onPress={ 
            () => confirmFriendRequest(friend.id)
          }
        />
        <Button
          buttonStyle = { styles.buttonStyle }
          title={"Reject"}
          titleStyle={{fontWeight: '600'}}
          type='outline'
          iconRight={true}
          onPress={()=> rejectFriendRequest(friend.id) }
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