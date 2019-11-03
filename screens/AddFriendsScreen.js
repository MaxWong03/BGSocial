import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';
// import useList from '../hooks/useList';
// import { api } from './../api';
import FriendSearchBar from './../components/FriendSearchBar';
import { getUserInfo } from './../hooks/sessionContext';

export default function AddFriendsScreen({navigation}) {

  // get the userID to avoid seeing this in the DB
  const { userData } = getUserInfo();
  const userId = userData.id;

  // get all the User and then filter it from all the friends
  const allUsers = navigation.getParam("allUsersInDB");
  const allFriends = navigation.getParam("allFriends").map(user => user['id']);


  console.log(allUsers);

  // automatically update the search list
  const [search, setSearch] = useState('');
  const updateSearch = (userInput) => setSearch(userInput);

  return (
    <View>
      <FriendSearchBar
        updateSearch={updateSearch} // keeping update for the text in the search bar
        search={search}
      />
      <ScrollView style={styles.gameListContainer}>
        {
          // allUsers.map((user, index) => (
          //   user['name'].includes(search) && !allFriends.includes(game['id']) &&
          //   <GameListItem
          //     key={index}
          //     game={game}
          //     onSelect={onSelect}
          //   />
          // ))










        }
      </ScrollView>
      <Button
        onPress={()=> ( chooseGameAction() )}
        title={"Add Game"}
      />
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