import React from 'react';
import { ListItem, CheckBox } from 'react-native-elements';

export default function FriendListItem({ friend, onSelect }) {
  return (
    <ListItem
      leftAvatar={{ source: { uri: friend['avatar'] } }}
      title={friend['name']}
      // subtitle={"Skill Level:"}
      bottomDivider
      rightElement={
        <CheckBox
          checked={friend['invited']}
          onPress={() => onSelect(friend['id'])}
        />
      }
    />
  );
}


