import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar, Button, ListItem } from "react-native-elements";
// import useList from '../hooks/useList';
import { api } from '../api';
import { getUserInfo } from '../hooks/sessionContext';

export default function SentRequestUser({ dispatchRequest, ADD_PENDING_REQ, DELETE_PENDING_REQ, user, addFriend, cancelFriendRequest, receiverIDs }) {

  const { userData } = getUserInfo();
  const userId = userData.id;

  const [buttonText, setButtonText] = useState('Add friend');

  return (
    <ListItem
      key={user.id}
      leftAvatar={{ size: 60, rounded: true, source: { uri: user.avatar } }}
      title={ user.name }
      subtitle = {
        <View style= { {flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 8} } >

          <Button
            buttonStyle={
              styles.button
            }
            title={"Cancel Request"}
            type='outline'
            onPress={ ()=> {
              cancelFriendRequest(user.id);
            }}
          />

        </View>
      }
      bottomDivider
    />
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: '6%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backIcon: {
    width: '30%',
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    width: '70%'
  },
  gameListContainer: {
    height: '75%'
  }
})