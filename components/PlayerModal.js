import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Icon, Button, ListItem, CheckBox } from 'react-native-elements';
import FriendSearchBar from './FriendSearchBar';

export default function PlayerScoreModal({ closeModal, changeFriendSlot, friendSelectList, onSelect, addScoreList }) {

  const [search, setSearch] = useState('');
  const updateSearch = (userInput) => setSearch(userInput);

  const selectAction = () => {
    const selectList = [];
    friendSelectList.forEach((friend) => {
      friend.selected && selectList.push(friend.id) && addScoreList(friend.id)
    });
    changeFriendSlot(selectList);
    closeModal();
  };

  return (
    <>
      <View
        style={styles.headerContainer}
      >
        <Icon
          name="arrow-left"
          color="black"
          type='font-awesome'
          onPress={closeModal}
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
          friendSelectList.map((friend, index) => (
            friend['name'].includes(search) &&
            <ListItem
              key={index}
              leftAvatar={{ source: { uri: friend['avatar'] } }}
              title={friend['name']}
              subtitle={"Skill Level:"}
              bottomDivider
              rightElement={
                <CheckBox
                  checked={friend['selected']}
                  onPress={() => onSelect(friend['id'])}
                />
              }
            />
          ))
        }
      </ScrollView>
      <Button
        onPress={selectAction}
        title={"Select"}
      />
    </>
  )
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
  friendListContainer: {
    height: '75%'
  }
});
