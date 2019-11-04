import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Header, Avatar, Button, Icon } from "react-native-elements";
import { api } from '../api';
import useFriendsData from '../hooks/useFriendsData';
import { getUserInfo } from './../hooks/sessionContext';
// get all pending request sent by this user
import PendingRequest from '../hooks/PendingRequest';

export default function FriendsScreen({ navigation }) {

  const { userData } = getUserInfo();

  const userId = userData.id;

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then((res) => {
      setAllUsers(res.data.users);
    });
  }, []);

  const [requests, setRequests] = useState(["testing"]);

  const { state: friendsList, dispatchState } = useFriendsData();

  const {state: sentRequests, dispatchRequest, ADD_PENDING_REQ, DELETE_PENDING_REQ} = PendingRequest();



  // console.log("the sent request is", sentRequests);

  const goToAddFriends = function (){
    navigation.navigate('AddFriends', {
      allUsersInDB: allUsers,
      allFriends: friendsList,
      dispatchState,
      sentRequests,
      dispatchRequest,
      ADD_PENDING_REQ,
      DELETE_PENDING_REQ
    })
  };

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
        <Text style={ styles.titleStyle }>{friendsList.length} Friends</Text>
        {
          friendsList.length !== 0 ?
            friendsList.map((person, index) => {
              return (
                <View style={styles.flexParent} key= {index}>
                  <View style={styles.imageContainer}>
                    <Avatar
                      rounded
                      size="large"
                      source={{uri: person.avatar}}
                    />
                  </View>

                  <View style={styles.textContainer}>
                    <Text style = {styles.nameStyle}>
                      {person.name}
                    </Text>

                    <Button
                      buttonStyle={styles.button}
                      title={"More info "}
                      type='outline'
                      iconRight={true}
                      onPress={ 
                        () => navigation.navigate('UserMoreInfo', {
                          user: person
                        })
                       }
                      icon={
                        <Icon
                          size={20}
                          name={'info-circle'}
                          type='font-awesome'
                          color='#bdbdbd'
                        />
                      }
                    />
                    <Button
                      buttonStyle={styles.button}
                      title={"Unfriend "}
                      type='outline'
                      iconRight={true}
                      // onPress={()=> ( removeEvent(game) )}
                      icon={
                        <Icon
                          name="minus-circle"
                          type="font-awesome"
                          size={20}
                          color='#bdbdbd'
                        />
                      }
                    />
                  </View>
                </View>
              );
            })
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