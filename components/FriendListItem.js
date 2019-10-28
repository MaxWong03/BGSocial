import React from 'react';
import { ListItem, CheckBox } from 'react-native-elements';



export default function FriendListItem(props) {
  return (
        <ListItem
          leftAvatar={{ source: { uri: props.friend['friend_avatar'] } }}
          title={props.friend['friend_name']}
          subtitle={"Skill Level:"}
          bottomDivider
          rightElement={
            <CheckBox
              checked={true}
            />
          }
        />
  );
}


