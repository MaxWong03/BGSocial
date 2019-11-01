import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements';
import InviteFriends from './InviteFriends';
import EmptyList from './EmptyList';
import useList from '../hooks/useList';

export default function CreateEventFriends({ changeFriendSlot, userFriends, eventFriendList }) {
  userFriends = userFriends.map(friend => {
    return {...friend, 'invited': false}
  })

  if (eventFriendList) {
    userFriends.forEach(friend => {
      eventFriendList.find(eventFriend => {
        if (friend.id === eventFriend.id) friend.invited = true
      })
    })
  }

  const { list: friendInviteList, onSelectFriend: onSelect } = useList(userFriends);

  const filterSelectedFriends = () => {
    return friendInviteList.filter((friend) => friend['invited'])
  };

  eventFriendList = filterSelectedFriends();

  const getEventFriendList = (eventFriendListID) => {
    changeFriendSlot(eventFriendListID)
  };

  const deleteEventFriend = (friendID) => {
    const friendList = onSelect(friendID)
      .filter(friend => friend['invited'])
      .map(friend => friend['id']);

    changeFriendSlot(friendList)
  }

  return (
    <>
      <InviteFriends
        getEventFriendList={getEventFriendList}
        friendInviteList={friendInviteList}
        onSelect={onSelect}
      />
      {
        eventFriendList.length === 0 ?
          <EmptyList title={'Click to Invite Friends to Event'} />
          :
          eventFriendList.map((friend, index) => (
            <ListItem
              key={index}
              leftAvatar={{ source: { uri: friend['avatar'] } }}
              title={friend['name']}
              bottomDivider
              rightElement={
                <Button
                  icon={
                    <Icon
                      name='account-remove'
                      type='material-community'
                      color='white'
                    />
                  }
                  buttonStyle={styles.deleteButton}
                  onPress={() => deleteEventFriend(friend['id'])}
                />
              }
            />
          ))
      }
    </>
  );
}

const styles = StyleSheet.create({
  SectionHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'grey'
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    marginRight: 5
  }
})


