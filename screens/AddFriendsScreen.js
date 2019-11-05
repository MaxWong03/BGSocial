import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Avatar, Button, Icon } from "react-native-elements";
// import useList from '../hooks/useList';
import { api } from './../api';
import FriendSearchBar from './../components/FriendSearchBar';
import { getUserInfo } from './../hooks/sessionContext';

import NotFriendUser from '../components/NotFriendUser';

export default function AddFriendsScreen({navigation}) {

  // get the userID to avoid seeing this in the DB
  const { userData } = getUserInfo();
  const userId = userData.id;

  // get all the User and then filter it from all the friends
  const allUsers = navigation.getParam("allUsersInDB");
  const allFriendsID = navigation.getParam("allFriends").map(user => user['id']);

  const dispatchFriends = navigation.getParam("dispatchFriends");
  const ADD_FRIEND = navigation.getParam("ADD_FRIEND");

  let sentRequests = navigation.getParam("sentRequests");
  const dispatchRequest = navigation.getParam("dispatchRequest");
  const ADD_PENDING_REQ = navigation.getParam("ADD_PENDING_REQ");
  const DELETE_PENDING_REQ = navigation.getParam("DELETE_PENDING_REQ");

  // get all the id from the receivers
  const receiverIDs = sentRequests.map(user => user['id']);

  // automatically update the search list
  const [search, setSearch] = useState('');
  const updateSearch = (userInput) => setSearch(userInput);

  // const [buttonText, setButtonText] = useState('Add friend');
  // // const [testingText, setText] = useState('beginning');

  const addFriend = function(receiverID) {
    api.post(`/users/request/${receiverID}`)
    .then((res) => {
      const user = res.data.user;
      dispatchRequest({type: ADD_PENDING_REQ, value: user});
    });
  };

  const cancelFriendRequest = function(receiverID) {
    api.post(`/users/request/${receiverID}/delete`)
    .then((res) => {
      const user = res.data.user;
      dispatchRequest({type: DELETE_PENDING_REQ, value: user});
    });
  };

  return (
    <View>
      <FriendSearchBar
        updateSearch={updateSearch} // keeping update for the text in the search bar
        search={search}
      />

      {/* <Text>{testingText}</Text> */}
      <ScrollView style={styles.gameListContainer}>
        {
          allUsers.map((user, index) => (
            user['name'].includes(search) && !allFriendsID.includes(user['id']) && (userId !== user['id']) &&
            // <NotFriendUser
            //   dispatchRequest = { dispatchRequest }
            //   ADD_PENDING_REQ = { ADD_PENDING_REQ }
            //   DELETE_PENDING_REQ = { DELETE_PENDING_REQ }
            // />
            

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

                {
                  !receiverIDs.includes(user['id']) &&
                  <Button
                    buttonStyle={
                      styles.button
                      // {backgroundColor: button}
                    }
                    title={"Add friend "}
                    type='outline'
                    // iconRight={true}
                    onPress={ ()=> {
                      addFriend(user.id);
                    }}
                  />
                }

                {
                  receiverIDs.includes(user['id']) &&
                  <Button
                    buttonStyle={styles.button}
                    title={"Cancal request"}
                    type='outline'
                    // iconRight={true}
                    onPress={ ()=> {
                      cancelFriendRequest(user.id);
                    }}
                  />
                }

              </View>
            </View>
          ))

        }
      </ScrollView>
      <Button
        onPress={()=> navigation.goBack()}
        title={"back"}
      />
    </View>
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