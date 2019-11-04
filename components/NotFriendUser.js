import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Avatar, Button, Icon } from "react-native-elements";
// import useList from '../hooks/useList';
import { api } from '../api';
import { getUserInfo } from '../hooks/sessionContext';

export default function notFriendUser({ dispatchRequest, ADD_PENDING_REQ, DELETE_PENDING_REQ }) {

  const { userData } = getUserInfo();
  const userId = userData.id;


  const [buttonText, setButtonText] = useState('Add friend');

  const buttonAction = function(receiverID) {
    if (buttonText === 'Add friend'){
      api.post(`/users/request/${receiverID}`)
      .then((res) => {
        const user = res.data.user;
        dispatchRequest({type: ADD_PENDING_REQ, value: user});
        setButtonText("Cancel Request");
        console.log("after adding a friend ", buttonText);
      });
    } else {
      api.post(`/users/request/${receiverID}/delete`)
      .then((res) => {
        const user = res.data.user;
        dispatchRequest({type: DELETE_PENDING_REQ, value: user});
        setButtonText('Add friend');
        console.log("after removing a friend ", buttonText);
      });
    }
  };

  return (
    <>
    <View style={styles.flexParent} key= {index}>
      <View style={styles.imageContainer}>
        <Avatar
          rounded
          size="large"
          source={{uri: user.avatar}}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style = {styles.nameStyle}>
          {user.name}
        </Text>

        <Button
          buttonStyle={
            styles.button
            // {backgroundColor: button}
          }
          title={"Add friend "}
          type='outline'
          // iconRight={true}
          onPress={ ()=> {
            buttonAction(user.id);
          }}
        />

      </View>
    </View>
  </>
  );
}