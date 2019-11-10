import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { Header, Avatar, Button, Icon, ButtonGroup, ListItem } from "react-native-elements";
import { api } from '../api';
import useFriendsData from '../hooks/useFriendsData';
// get all pending request sent by this user
import PendingRequest from '../hooks/PendingRequest';
// get all received requests
import ReceivedRequest from '../hooks/ReceivedRequest';
// other components
import FriendPageItem from './../components/FriendPageItem';
import FriendRequester from './../components/FriendRequester';
import NotFriendUser from './../components/NotFriendUser';
import SentRequestUser from './../components/SentRequestUser';


export default function FriendsScreen({ navigation }) {

  const [allUsers, setAllUsers] = useState([]);

  const { state: friendsList, dispatchFriends, ADD_FRIEND, REMOVE_FRIEND, loadAllFriends } = useFriendsData();

  const { state: receivedRequests, dispatchReceivedRequest, REJECT_REQUEST, loadRequest } = ReceivedRequest();

  const {state: sentRequests, dispatchRequest, ADD_PENDING_REQ, DELETE_PENDING_REQ, loadPendings } = PendingRequest();

  useEffect(() => {
    api.get("/users").then((res) => {
      setAllUsers(res.data.users);
    });
  }, []);
  
  let goToAddFriends = (sentRequests,dispatchRequest, ADD_PENDING_REQ,DELETE_PENDING_REQ) => {
    const nav = () => {
      navigation.navigate('AddFriends', {
        allUsersInDB: allUsers,
        allFriends: friendsList,
        dispatchFriends,
        sentRequests,
        dispatchRequest,
        ADD_PENDING_REQ,
        DELETE_PENDING_REQ,
      });
    };
    return nav;
  };

  useEffect(() => {
    navigation.setParams({ numberOfFriends: friendsList.length, goToAddFriends: goToAddFriends(sentRequests,dispatchRequest,ADD_PENDING_REQ,DELETE_PENDING_REQ) });
  }, [friendsList.length, allUsers.length, sentRequests]);

  
  // all actions after pressing buttons are listed below
  const confirmFriendRequest = function (senderID){
    api.post(`/users/request/${senderID}/confirm`)
    .then((res => {
      const newFriend = res.data.user;
      dispatchFriends({type: ADD_FRIEND, value: newFriend});
      dispatchReceivedRequest( {type: REJECT_REQUEST, value: newFriend} );
    }))
  };
  
  const rejectFriendRequest = function (senderID){
    api.post(`/users/request/${senderID}/delete`)
    .then((res => {
      const newFriend = res.data.user;
      dispatchFriends({type: REMOVE_FRIEND, value: newFriend});
      dispatchReceivedRequest( {type: REJECT_REQUEST, value: newFriend} );
    }))
  };

  const unfriend = function (userID){
    api.post(`/users/request/${userID}/delete`)
    .then((res => {
      const user = res.data.user;
      dispatchFriends({type: REMOVE_FRIEND, value: user});
    }))
  };

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

  // button group attempt
  const [screenState, setButtonGroup] = useState(0);

  const slider = function (currentScreen) {
    setButtonGroup(currentScreen);
  };

  const buttons = ['My friend', 'Friend Request', 'Sent Request']; // title for different screens

  // set up the title based on the screen state and number
  let title;

  if (screenState === 0) {
  //   if (friendsList.length === 1) title = <Text style={ styles.titleStyle }>1 Friend</Text>;
  //   else if ( friendsList.length > 1 ) title = <Text style={ styles.titleStyle }>{friendsList.length} Friends</Text>;
    if (friendsList.length === 0) title = <Text style={ styles.titleStyle }>You havent added any friend yet</Text>;
  } else if (screenState === 1) {
    if (receivedRequests.length === 1) title = <Text style={ styles.titleStyle }>1 Friend Request</Text>;
    else if ( receivedRequests.length > 1 ) title = <Text style={ styles.titleStyle }>{receivedRequests.length} Friend Requests</Text>;
    else title = <Text style={ styles.titleStyle }>No Friend Request</Text>
  } else if (screenState === 2) {
    if (sentRequests.length === 1) title = <Text style={ styles.titleStyle }>1 Sent Request</Text>;
    else if ( sentRequests.length > 1 ) title = <Text style={ styles.titleStyle }>{sentRequests.length} Sent Requests</Text>;
    else
      title = <Text style={ styles.titleStyle }>No Sent Request</Text>
  }

  // refreshing attempt
  const fetchData = async() =>{ // get the data again
    loadRequest();
    loadAllFriends();
    loadPendings();
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(()=>{
        setRefreshing(false)
    })
  }, [refreshing]);

  return (
    <>
      {/* <Header
        centerComponent={{ text: 'Friends', style: { color: '#fff', fontSize: 25 } }}
        rightComponent={<Button
          icon={
            <Icon
              name="add"
              size={30}
              color="white"
              onPress={ () => goToAddFriends() }
            />
          }
        />}
        containerStyle={{height: 'auto'}}
      /> */}
      <ScrollView 
        style={styles.gameListContainer}
        // contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } />
        }  
      >

        {/* the top buttons at the top */}
        <ButtonGroup 
          buttons={buttons}
          containerStyle={styles.buttonGroup}
          selectedIndex={screenState}
          onPress={slider}
        />
        
        {/* <Text style={ styles.titleStyle }>{title}</Text> */}
        {
          screenState === 0 &&
          friendsList.map((friend, index) => (
            <FriendPageItem
              key = { index }
              person = { friend }
              unfriend = { unfriend }
              navigation = { navigation }
            />
          ))
        }

        {
          screenState === 1 &&
          receivedRequests.map((friend, index) => (
            <FriendRequester
              key = { index }
              friend = { friend }
              confirmFriendRequest = { confirmFriendRequest }
              rejectFriendRequest = { rejectFriendRequest }
            />
          ))
        }

        {
          screenState === 2 &&
          sentRequests.map((friend, index) => (
            <SentRequestUser
              key = { index }
              dispatchRequest = { dispatchRequest }
              ADD_PENDING_REQ = { ADD_PENDING_REQ }
              DELETE_PENDING_REQ = { DELETE_PENDING_REQ }
              user = { friend }
              cancelFriendRequest = { cancelFriendRequest }
              receiverIDs = { receivedRequests }
            />
          ))
        }
        {
          friendsList.length === 0 &&
          <ActivityIndicator size='large' color="#0000ff" />
        }
      </ScrollView>
    </>
  );
}

FriendsScreen.navigationOptions = ({navigation}) => { // title at the top
  const numberOfFriends = navigation.getParam('numberOfFriends') || 0;
  const options = {
    title: `My Friends (${numberOfFriends})`
  }

  if (navigation.getParam('goToAddFriends')) {
    options.headerRight = (
      <Button
        onPress={ navigation.getParam('goToAddFriends') }
        title="+ Add Friend"
        color="#fff"
      />
    );
  }
  return options;
};

const styles = StyleSheet.create({
  titleStyle:{
    textAlign: 'center', // <-- the magic
    fontSize: 40,
    marginBottom: 10,
  },
});