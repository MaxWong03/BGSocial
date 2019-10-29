import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import {  Header, Icon, Button } from 'react-native-elements';
import FriendSearchBar from '../components/FriendSearchBar';
import FriendListItem from './FriendListItem';

export default function InviteFriendsModal({ goBack, onSelect, inviteAction, friendInviteList }) {
  const [search, setSearch] = useState('');

  //Changes the search bar value
  const updateSearch = (userInput) => setSearch(userInput);

  return (
    <>
      <View
        style={styles.headerContainer}
      >
        <Icon
          name="arrow-left"
          color="black"
          type='font-awesome'
          onPress={goBack}
          style={styles.backIcon}
        />
        <Text style={styles.headerText}>Invite Friends</Text>
      </View>

      <FriendSearchBar
        search={search}
        updateSearch={updateSearch}
      />
      <ScrollView style={styles.friendListContainer}>
        {
          friendInviteList.map((friend, index) => (
            friend['friend_name'].includes(search) &&
            <FriendListItem
              key={index}
              friend={friend}
              onSelect={onSelect}
            />
          ))
        }
      </ScrollView>
      <Button
        onPress={inviteAction}
        title={"Invite"}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height:'6%',
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
  friendListContainer: {
    height: '75%'
  }
});

