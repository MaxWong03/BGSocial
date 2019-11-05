import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar, Button, ListItem } from "react-native-elements";
// import useList from '../hooks/useList';
import { api } from '../api';
import { getUserInfo } from '../hooks/sessionContext';

export default function NotFriendUser({ user, addFriend, cancelFriendRequest, receiverIDs }) {

  const { userData } = getUserInfo();
  const userId = userData.id;

  const [buttonText, setButtonText] = useState('Add friend');

  return (
    <ListItem
      key={user.id}
      leftAvatar={{ size: 60, rounded: true, source: { uri: user.avatar } }}
      title={ user.name }
      subtitle = {
        <View style= { styles.subtitleViewStyle } >
           {
            !receiverIDs.includes(user['id']) &&
            <Button
              buttonStyle = { styles.buttonStyle }
              title={"Add friend "}
              type='outline'
              onPress={ ()=> {
                addFriend(user.id);
              }}
            />
          }

          {
            receiverIDs.includes(user['id']) &&
            <Button
              buttonStyle = { styles.buttonStyle }
              title={"Cancal request"}
              type='outline'
              onPress={ ()=> {
                cancelFriendRequest(user.id);
              }}
            />
          }
        </View>
      }
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