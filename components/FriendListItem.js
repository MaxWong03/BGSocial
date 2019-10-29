import React from 'react';
import { ListItem, CheckBox } from 'react-native-elements';

export default function FriendListItem({ friend, onSelect }) {
  return (
    <ListItem
      leftAvatar={{ source: { uri: friend['friend_avatar'] } }}
      title={friend['friend_name']}
      subtitle={"Skill Level:"}
      bottomDivider
      rightElement={
        <CheckBox
          checked={friend['invited']}
          onPress={() => onSelect(friend['friend_id'])}
        />
      }
    />
  );
}


