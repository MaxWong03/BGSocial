import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import InviteFriends from './InviteFriends';

export default function CreateEventFriends() {
  const [eventFriendList, setEventFriendList] = useState([]);

  const updateEventFriendList = (newEventFriendList) => {
    setEventFriendList(newEventFriendList);
  };
  return (
    <>
      <InviteFriends
        updateEventFriendList={updateEventFriendList}
      />
      {
        eventFriendList.map((friend, index) => (
          <ListItem
            key={index}
            leftAvatar={{ source: { uri: friend['friend_avatar'] } }}
            title={friend['friend_name']}
            bottomDivider
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
})