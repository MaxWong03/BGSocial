import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Avatar, Button, Icon } from "react-native-elements";
// import useList from '../hooks/useList';
import { api } from './../api';
import FriendSearchBar from './../components/FriendSearchBar';
// import component
import NotFriendUser from '../components/NotFriendUser';
import { getUserInfo } from '../hooks/sessionContext';


import useFriendsData from '../hooks/useFriendsData';
// get all pending request sent by this user
import PendingRequest from '../hooks/PendingRequest';

export default function AddFriendsScreen({navigation}) {

  // get the userID to avoid seeing this in the DB

  const { userData } = getUserInfo();
  const userId = userData.id;

  const [allUsers, setAllUsers] = useState([]);

  const { state: friendsList } = useFriendsData();

  const {state: sentRequests, dispatchRequest, ADD_PENDING_REQ, DELETE_PENDING_REQ, loadPendings } = PendingRequest();

  const allFriendsID = friendsList.map(user => user['id']);

  useEffect(() => {
    api.get("/users").then((res) => {
      setAllUsers(res.data.users);
    });
  }, []);

  // allUsersInDB: allUsers,
  //     allFriends: friendsList,
  //     dispatchFriends,
  //     sentRequests,
  //     dispatchRequest,
  //     ADD_PENDING_REQ,
  //     DELETE_PENDING_REQ,

  // get all the User and then filter it from all the friends
  // const allUsers = navigation.getParam("allUsersInDB");
  // const allFriendsID = navigation.getParam("allFriends").map(user => user['id']);

  // const dispatchFriends = navigation.getParam("dispatchFriends");
  // const ADD_FRIEND = navigation.getParam("ADD_FRIEND");

  // let sentRequests = navigation.getParam("sentRequests");
  // const dispatchRequest = navigation.getParam("dispatchRequest");
  // const ADD_PENDING_REQ = navigation.getParam("ADD_PENDING_REQ");
  // const DELETE_PENDING_REQ = navigation.getParam("DELETE_PENDING_REQ");

  // get all the id from the receivers
  const receiverIDs = sentRequests.map(user => user['id']);

  // automatically update the search list
  const [search, setSearch] = useState('');
  const updateSearch = (userInput) => setSearch(userInput);

  const addFriend = function(receiverID) {
    api.post(`/users/request/${receiverID}`)
    .then((res) => {
      // const user = res.data.user;
      // dispatchRequest({type: ADD_PENDING_REQ, value: user});
      navigation.goBack();
    });
  };

  const cancelFriendRequest = function(receiverID) {
    api.post(`/users/request/${receiverID}/delete`)
    .then((res) => {
      // const user = res.data.user;
      // dispatchRequest({type: DELETE_PENDING_REQ, value: user});
      navigation.goBack();
    });
  };

  // const addFriend = navigation.getParam("addFriend");
  // const cancelFriendRequest = navigation.getParam("cancelFriendRequest");
  
  return (
      <ScrollView style={styles.gameListContainer}>
        <FriendSearchBar
          updateSearch={updateSearch} // keeping update for the text in the search bar
          search={search}
        />
        {
          allUsers.map((user, index) => (
            user['name'].includes(search) && !allFriendsID.includes(user['id']) && (userId !== user['id']) &&
            <NotFriendUser
              key = { index }
              // dispatchRequest = { dispatchRequest }
              // ADD_PENDING_REQ = { ADD_PENDING_REQ }
              // DELETE_PENDING_REQ = { DELETE_PENDING_REQ }
              user = { user }
              addFriend = { addFriend }
              cancelFriendRequest = { cancelFriendRequest }
              receiverIDs= { receiverIDs }
            />
          ))
        }
      </ScrollView>
  );
}

AddFriendsScreen.navigationOptions = {
  title: 'All Other users',
};


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
  },
})

