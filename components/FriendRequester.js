import React from 'react';
import { View } from 'react-native';
import { Button, ListItem } from "react-native-elements";

export default function FriendRequester({ friend, confirmFriendRequest, rejectFriendRequest }) {

  console.log("in the friend Requester page");

  return (
    <ListItem
      key={friend.id}
      leftAvatar={{ size: 60, rounded: true, source: { uri: friend.avatar } }}
      title={ friend.name }
      subtitle = {
      <View style= { {flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 8} } >
        <Button
          // buttonStyle={styles}
          title={"Confirm"}
          type='outline'
          iconRight={true}
          onPress={ 
            () => confirmFriendRequest(friend.id)
          }
        />
        <Button
          // buttonStyle={ { size: 30 }}
          title={"Reject"}
          type='outline'
          iconRight={true}
          onPress={()=> rejectFriendRequest(friend.id) }
        />
      </View>
      }
      bottomDivider
    />
  );
}
