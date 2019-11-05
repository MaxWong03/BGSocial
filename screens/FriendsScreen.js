import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Header, Avatar, Button, Icon, ButtonGroup, ListItem } from "react-native-elements";
import { api } from '../api';
import useFriendsData from '../hooks/useFriendsData';
import { getUserInfo } from './../hooks/sessionContext';
// get all pending request sent by this user
import PendingRequest from '../hooks/PendingRequest';
// get all received request
import ReceivedRequest from '../hooks/ReceivedRequest';

export default function FriendsScreen({ navigation, screenProps }) {

  const { userData } = getUserInfo();

  const userId = userData.id;

  const [allUsers, setAllUsers] = useState([]);

  const { state: friendsList, dispatchFriends, ADD_FRIEND, REMOVE_FRIEND } = useFriendsData();

  const { state: receivedRequests, dispatchReceivedRequest, REJECT_REQUEST } = ReceivedRequest();

  const {state: sentRequests, dispatchRequest, ADD_PENDING_REQ, DELETE_PENDING_REQ} = PendingRequest();

  useEffect(() => {
    api.get("/users").then((res) => {
      setAllUsers(res.data.users);
    });
  }, []);

  const goToAddFriends = function (){
    console.log("fasfds", sentRequests);
    navigation.navigate('AddFriends', {
      allUsersInDB: allUsers,
      allFriends: friendsList,
      dispatchFriends,
      sentRequests,
      dispatchRequest,
      ADD_PENDING_REQ,
      DELETE_PENDING_REQ
    })
  };

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


  // button group attempt
  const [screenState, setButtonGroup] = useState(0);

  const slider = function (currentScreen) {
    setButtonGroup(currentScreen);
  };

  const buttons = ['My friend', 'Received Request'];

  return (
    <>
      <Header
        centerComponent={{ text: 'My Friends', style: { color: '#fff', fontSize: 25 } }}
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
      />
      <ScrollView style={styles.gameListContainer}>

        <ButtonGroup
            buttons={buttons}
            containerStyle={styles.buttonGroup}
            selectedIndex={screenState}
            onPress={slider}
          />
         <Text style={ styles.titleStyle }>Friend request</Text>
        {
          screenState === 1 && receivedRequests.length !== 0 ?
          receivedRequests.map((friend, index) => {
            <ListItem
             key={friend.id}
             leftAvatar={{ size: 60, rounded: true, source: { uri: friend.avatar } }}
             title={ friend.name }
             subtitle = {
              <View style= { {flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 8} } >
                <Button
                  // buttonStyle={styles}
                  title={"More info "}
                  type='outline'
                  iconRight={true}
                  onPress={ 
                    () => navigation.navigate('UserMoreInfo', {
                      user: friend
                    })
                  }
                />
                <Button
                  // buttonStyle={ { size: 30 }}
                  title={"Unfriend"}
                  type='outline'
                  iconRight={true}
                  onPress={()=> ( unfriend(friend.id) )}
                />
              </View>
             }
             bottomDivider
           />
          })
        : 
        <Text>No Friend Requests</Text>
      }

       <Text style={ styles.titleStyle }>{friendsList.length} Friends</Text>
      {
        screenState === 0 && friendsList.length !== 0 ?
        friendsList.map((friend) => (
          <ListItem
            key={friend.id}
            leftAvatar={{ size: 60, rounded: true, source: { uri: friend.avatar } }}
            title={ friend.name }
            subtitle = {
             <View style= { {flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 8} } >
               <Button
                 // buttonStyle={styles}
                 title={"More info "}
                 type='outline'
                 iconRight={true}
                 onPress={ 
                   () => navigation.navigate('UserMoreInfo', {
                     user: friend
                   })
                 }
               />
               <Button
                 // buttonStyle={ { size: 30 }}
                 title={"Unfriend"}
                 type='outline'
                 iconRight={true}
                 onPress={()=> ( unfriend(friend.id) )}
               />
             </View>
            }
            bottomDivider
          />
        ))
        : <Text>No friend in your library</Text>
        }

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleStyle:{
    textAlign: 'center', // <-- the magic
    fontSize: 40,
  },
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
  nameStyle: {
    marginTop: 10,
    fontSize: 30,
    fontFamily: 'Cochin',
  },
  imageContainer:{
    flex: 3,
    height: '100%',
    width: '100%',
    // backgroundColor: 'blue'
  },
  textContainer:{
    flex: 3,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },

});